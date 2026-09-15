from __future__ import annotations

import os

from providers.openai_provider import OpenAIProvider


class KiraProvider(OpenAIProvider):
    """Kira AI's OpenAI-compatible chat completions provider."""

    def __init__(self) -> None:
        base_url = (os.getenv("KIRA_BASE_URL") or "https://kiraai.vn").rstrip("/")
        if not base_url.endswith("/api/v1"):
            base_url = f"{base_url}/api/v1"

        super().__init__(
            api_key_env="KIRA_API_KEY",
            base_url=base_url,
            default_model=os.getenv("KIRA_MODEL") or "qwen3.8-flash-free",
        )
