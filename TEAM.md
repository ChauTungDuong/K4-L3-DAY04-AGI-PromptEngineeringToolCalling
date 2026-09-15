# TEAM — Day04, K4-L3B

**Làm nhóm.** Mỗi người tự viết và commit phần INDIVIDUAL của mình.

## Thông tin bài nộp

- Tên nhóm: AGI
- Người đại diện / MSSV: Châu Tùng Dương / 2A202602822
- Tên repo: `K4-L3-DAY04-AGI-PromptEngineeringToolCalling`
- URL repo, nhánh nộp, commit chốt: https://github.com/ChauTungDuong/K4-L3-DAY04-AGI-PromptEngineeringToolCalling, nhánh : main, commit chốt : 
- Deadline áp dụng và link thông báo đổi hạn nếu có:

## Thành viên

| Họ và tên | MSSV | GitHub | Vai trò và công việc | File/commit/PR |
|---|---|---|---|---|
| Châu Tùng Dương | 2A202602822 |  | Trưởng nhóm |  |
| Nguyễn Đình Tuấn Anh | 2A202602735 |  |  |  |
| Đào Duy Hiếu | 2A202602651 | DuyHieu180144 | thiết kế eval datasets | eval_finance_base.json, eval_group.json |
| Đỗ Mạnh Nghĩa | 2A202602971 |  |  |  |
| Nguyễn Ngọc Tuyền | 2A202603010 |  |  |  |

## Nhận xét chung

- Kết quả và bằng chứng:
- Thay đổi hiệu quả nhất:
- Giới hạn còn lại:
- Cách phân công và tích hợp:

## INDIVIDUAL

### Châu Tùng Dương — 2A202602822

- Phần việc và file/commit/PR: Trưởng nhóm, phân công công việc cho các thành viên, tổng hợp, merge code
- Quyết định, khó khăn và cách xử lý:
- Điều đã học:
- AI/công cụ đã dùng và cách kiểm tra:
- Thời điểm đã tự nộp URL repo chung trên VLearn:

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

- Phần việc và file/commit/PR:
- Quyết định, khó khăn và cách xử lý:
- Điều đã học:
- AI/công cụ đã dùng và cách kiểm tra:
- Thời điểm đã tự nộp URL repo chung trên VLearn:

### Nguyễn Ngọc Tuyền — 2A202603010

- Phần việc và file/commit/PR:
- Quyết định, khó khăn và cách xử lý:
- Điều đã học:
- AI/công cụ đã dùng và cách kiểm tra:
- Thời điểm đã tự nộp URL repo chung trên VLearn: