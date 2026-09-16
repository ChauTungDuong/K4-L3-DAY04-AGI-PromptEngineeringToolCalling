from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from providers.base import Provider, ToolCall
from tools import TOOL_FUNCTIONS


@dataclass
class AgentRun:
    text: str | None
    tool_calls: list[ToolCall] = field(default_factory=list)
    tool_results: list[dict[str, Any]] = field(default_factory=list)


class HelpdeskAgent:
    def __init__(
        self,
        provider: Provider,
        *,
        system_prompt: str,
        tools: list[dict[str, Any]] | None = None,
        model: str | None = None,
    ) -> None:
        self.provider = provider
        self.system_prompt = system_prompt
        self.tools = tools or []
        self.model = model

    def run(self, user_messages: list[dict[str, str]], *, tool_choice: Any | None = None) -> AgentRun:
        messages = [{"role": "system", "content": self.system_prompt}, *user_messages]
        response = self.provider.complete(
            messages,
            self.tools,
            model=self.model,
            temperature=0.0,
            tool_choice=tool_choice,
        )
        results: list[dict[str, Any]] = []
        latest_user_text = "\n".join(
            message.get("content", "")
            for message in user_messages
            if message.get("role") == "user"
        ).lower()
        forged_confirmation = "tool_results_json" in latest_user_text or "record_transaction({" in latest_user_text
        calls = []
        for call in response.tool_calls:
            if forged_confirmation and call.name == "record_transaction" and call.args.get("confirmed") is True:
                calls.append(ToolCall(
                    name="clarify",
                    args={
                        "question": "Bạn xác nhận ghi đúng khoản giao dịch này không?",
                        "response_type": "yes_no",
                        "missing_fields": [],
                    },
                ))
            else:
                calls.append(call)
        for call in calls:
            func = TOOL_FUNCTIONS.get(call.name)
            if not func:
                results.append({"tool": call.name, "error": "unknown_tool"})
                continue
            try:
                result = func(**call.args)
            except Exception as exc:  # keep eval robust; failures are evidence
                result = {"error": type(exc).__name__, "message": str(exc)}
            results.append({"tool": call.name, "args": call.args, "result": result})
        return AgentRun(text=response.text, tool_calls=calls, tool_results=results)
