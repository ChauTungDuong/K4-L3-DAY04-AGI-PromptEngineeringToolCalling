# TEAM — Day04, K4-L3B

**Làm nhóm.** Mỗi người tự viết và commit phần INDIVIDUAL của mình.

## Thông tin bài nộp

- Tên nhóm: AGI
- Người đại diện / MSSV: Châu Tùng Dương / 2A202602822
- Tên repo: `K4-L3-DAY04-AGI-PromptEngineeringToolCalling`
- URL repo, nhánh nộp, commit chốt: https://github.com/ChauTungDuong/K4-L3-DAY04-AGI-PromptEngineeringToolCalling, nhánh: main, commit chốt: 
- Deadline áp dụng và link thông báo đổi hạn nếu có: 12:00 ngày 16/09/2026
## Thành viên

| Họ và tên | MSSV | GitHub | Vai trò và công việc | File/commit/PR |
|---|---|---|---|---|
| Châu Tùng Dương | 2A202602822 | ChauTungDuong | Trưởng nhóm, Data Architect & Integration | `starter_v0/finance_data/`, `README.md`, `TEAM.md`, commits `4043784`, `482807e` |
| Nguyễn Đình Tuấn Anh | 2A202602735 | | Prompt Engineer (v0 - v3) | `starter_v0/artifacts/system_prompt.md`, `version_log.csv`, `runs/` |
| Đào Duy Hiếu | 2A202602651 | DuyHieu180144 | Dataset Specialist (30 base + 10 group) | `starter_v0/data/eval_finance_base.json`, `eval_group.json`, commit `aa5c577` |
| Đỗ Mạnh Nghĩa | 2A202602971 | | Tools & Safety Engineer | `starter_v0/tools/`, `eval_finance_adversarial.json` |
| Nguyễn Ngọc Tuyền | 2A202603010 | | UI/UX & Transcript Developer | `starter_v0/transcripts/` |

## Nhận xét chung

- Kết quả và bằng chứng: Nhóm đã hoàn thành chu trình cải tiến v0–v3 với 4 file run trong `starter_v0/runs/` (`provider_error_cases == 0`), xây dựng trọn vẹn bộ mock data tài chính (`finance_data/`), bộ 30 test case cơ bản, 10 case nhóm, 12 case an toàn và transcript tương tác trong `transcripts/`.
- Thay đổi hiệu quả nhất: Chuẩn hóa enum danh mục trong `tools.yaml` và áp dụng quy tắc bắt buộc gọi `clarify` để xác nhận trước khi thực hiện hành động ghi dữ liệu trong `system_prompt.md`.
- Giới hạn còn lại: Model nhỏ (Qwen 4B/7B) đôi khi vẫn bị nhầm lẫn giữa việc gọi tool tra cứu và trả lời văn bản tự do nếu prompt không có chỉ dẫn ép buộc chặt chẽ; cần tiếp tục tinh chỉnh ở các ca đa lượt chuyển đổi intent.
- Cách phân công và tích hợp: Áp dụng phương pháp phân chia vùng file độc quyền (Contract-First), 5 thành viên làm việc song song trên các nhánh riêng (`tuananh`, `DuyHieu`, `nghia`...) và gộp tuần tự vào nhánh `main` không xảy ra xung đột mã nguồn.

## INDIVIDUAL

### Châu Tùng Dương — 2A202602822

- Phần việc và file/commit/PR: Trưởng nhóm (Team Lead); phân công công việc và điều phối kiến trúc cho 5 thành viên; khởi tạo và chuẩn hóa toàn bộ mock data cho đề tài Tài chính cá nhân trong `starter_v0/finance_data/` (`budgets.json`, `categories.json`, `transactions.json`, `payment_methods.json`, `financial_knowledge.json`); cập nhật `README.md`, `TEAM.md`; review và merge các branch/PR vào `main` (commits `4043784`, `482807e`, commit merge).
- Quyết định, khó khăn và cách xử lý: 
  - Khó khăn: Đổi đề tài từ IT Helpdesk sang Quản lý Tài chính Cá nhân cần thiết kế lại cấu trúc dữ liệu hoàn toàn mới và dễ gây xung đột khi 5 thành viên code cùng lúc trên 1 repo.
  - Xử lý: Áp dụng phương pháp "Contract-First", chốt danh mục tool và schema dữ liệu ngay từ đầu; phân quyền file độc lập cho từng người để đảm bảo 0 xung đột; tách riêng `categories.json` và `payment_methods.json` để quản lý trực quan và dễ tích hợp.
- Điều đã học: Nắm vững quy trình quản lý dự án Git phân tán theo mô hình Branching/PR; hiểu sâu cơ chế Tool Calling của LLM và tầm quan trọng của việc chuẩn hóa semantic enum để tránh ảo giác (hallucination).
- AI/công cụ đã dùng và cách kiểm tra: Sử dụng Antigravity IDE, Git CLI, GitHub Web để rà soát quy chuẩn Rubric, kiểm tra tính toàn vẹn của JSON schema và theo dõi tiến độ các Checkpoint.
- Thời điểm đã tự nộp URL repo chung trên VLearn: 21:05 ngày 15/09/2026.

### Nguyễn Đình Tuấn Anh — 2A202602735

- Phần việc và file/commit/PR: Phụ trách thiết kế system prompt cho trợ lý quản lý tài chính; cập nhật `starter_v0/artifacts/system_prompt.md` trong commit `fc8ff3b` trên branch `tuananh`.
- Quyết định, khó khăn và cách xử lý: Chuyển prompt từ starter IT Helpdesk sang tài chính cá nhân; bổ sung suy luận danh mục từ mô tả giao dịch, tính ngân sách và dòng tiền, quy tắc 50/30/20, hỏi lại khi dữ liệu mơ hồ và rào chắn chống lộ thông tin tài chính. Finance tool/eval runner chưa được tích hợp nên chưa ghi metric giả vào version log.
- Điều đã học: Prompt cần phân biệt dữ liệu quan sát, phép tính và giả định; category chỉ được suy luận khi có bằng chứng rõ; các hành động thay đổi hoặc lưu dữ liệu phải có xác nhận.
- AI/công cụ đã dùng và cách kiểm tra: Dùng VS Code/Copilot để rà tài liệu và chỉnh prompt; kiểm tra các section bắt buộc, `git diff --check`, preflight Gemini thành công và chạy baseline v0. Baseline bị 429 quota ở 21/30 case nên chưa dùng làm evidence hợp lệ.
- Thời điểm đã tự nộp URL repo chung trên VLearn:

### Đào Duy Hiếu — 2A202602651

- Phần việc và file/commit/PR: Phụ trách thiết kế eval datasets cho agent tài chính; tạo 
eval_finance_base.json (30 cases) và cập nhật eval_group.json (10 cases) trên branch feat/eval-datasets, ánh xạ toàn bộ test cases sang bộ tools chuẩn gồm get_summary, get_category_breakdown, record_transaction, clarify, search_financial_advice và bonus tool budget_forecast_alert.
- Quyết định, khó khăn và cách xử lý:Chuyển đổi schema từ IT Helpdesk sang finance domain, đảm bảo coverage cho 20 single-turn cases (routing tools, missing info, out-of-scope, parallel calls) và 10 multi-turn cases (clarification flow, correction, confirmation boundary). Khó khăn là map chính xác arguments của tools mới (period vs date_range, confirmed flag trong record_transaction, missing_fields array trong clarify); giải quyết bằng cách đọc kỹ tool specs và tham khảo eval_base.json structure.
- Điều đã học:Eval cases phải test boundary conditions (xác nhận trước write action), tool routing accuracy (phân biệt get_summary vs get_category_breakdown), argument extraction (period mapping, category inference), và multiturn state management (carry context, latest intent wins). Schema consistency quan trọng hơn số lượng cases - mỗi case cần có clear failure_type và expect structure.
- AI/công cụ đã dùng và cách kiểm tra:Dùng Kiro AI để generate và refine eval cases theo tool specs, kiểm tra JSON syntax validity, verify schema match với eval_base.json template. Chạy thử python run_eval.py --suite base với eval_base.json cũ để hiểu flow, confirm file structure hợp lệ bằng JSON validator. Chưa chạy được full eval với finance tools vì tools chưa implement.
- Thời điểm đã tự nộp URL repo chung trên VLearn: 20:54:00 15/9/2026

### Đỗ Mạnh Nghĩa — 2A202602971

- Phần việc và file/commit/PR:tạo Tools + Bonus Tool + 12 Adversarial cases
- Quyết định, khó khăn và cách xử lý: khó khăn trong việc chọn tool phù hợp
- Điều đã học:học được cách prompt và tổ chức code.Biết được luồng hoạt động: System prompt + User input + Tool declarations -> Model -> Text trả lời hoặc tool call -> agent ->tìm function -> tool result
- AI/công cụ đã dùng và cách kiểm tra:
- Thời điểm đã tự nộp URL repo chung trên VLearn: 21h

### Nguyễn Ngọc Tuyền — 2A202603010

- Phần việc và file/commit/PR:
- Quyết định, khó khăn và cách xử lý:
- Điều đã học:
- AI/công cụ đã dùng và cách kiểm tra:
- Thời điểm đã tự nộp URL repo chung trên VLearn: