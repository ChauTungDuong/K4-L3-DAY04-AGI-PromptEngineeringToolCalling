const categories = {
  food: { name: "Ăn uống", icon: "◒", color: "#e66a5a", bg: "#fde6e2" },
  transport: { name: "Đi lại", icon: "↗", color: "#4c77d4", bg: "#e5edfc" },
  housing: { name: "Nhà ở", icon: "⌂", color: "#007d73", bg: "#dcf1ec" },
  shopping: { name: "Mua sắm", icon: "✦", color: "#9962bd", bg: "#f0e6f7" },
  entertainment: { name: "Giải trí", icon: "◌", color: "#db9b21", bg: "#fff1cc" },
  other: { name: "Khác", icon: "·", color: "#6d7f7a", bg: "#e6ecea" },
  salary: { name: "Lương", icon: "↑", color: "#007d73", bg: "#dcf1ec" },
  other_income: { name: "Thu nhập khác", icon: "+", color: "#007d73", bg: "#dcf1ec" },
};

let transactions = [
  { id: 1, date: "15 Thg 9", time: "09:15", type: "expense", category: "food", amount: 35000, note: "Cà phê sáng" },
  { id: 2, date: "15 Thg 9", time: "07:30", type: "expense", category: "food", amount: 40000, note: "Bún bò Huế" },
  { id: 3, date: "14 Thg 9", time: "18:30", type: "expense", category: "transport", amount: 80000, note: "Đổ xăng xe máy" },
  { id: 4, date: "14 Thg 9", time: "12:20", type: "expense", category: "food", amount: 50000, note: "Cơm gà xối mỡ" },
  { id: 5, date: "13 Thg 9", time: "15:00", type: "expense", category: "shopping", amount: 280000, note: "Đồ dùng gia đình" },
  { id: 6, date: "13 Thg 9", time: "10:00", type: "income", category: "other_income", amount: 350000, note: "Lãi tiết kiệm" },
  { id: 7, date: "12 Thg 9", time: "11:30", type: "expense", category: "food", amount: 320000, note: "Ăn trưa cuối tuần" },
];

const baseline = { income: 22850000, expense: 7200000 };
const categoryTotals = { housing: 4370000, food: 765000, other: 670000, shopping: 930000, entertainment: 220000, transport: 245000 };
const maxCategory = 4500000;
let activeCategory = null;
let visibleCount = 5;
let draftTransaction = null;
let activePeriod = "this_month";

const money = (amount) => `${new Intl.NumberFormat("vi-VN").format(amount)} ₫`;
const shortMoney = (amount) => amount >= 1000000 ? `${(amount / 1000000).toLocaleString("vi-VN", { maximumFractionDigits: 2 })} tr` : money(amount);

function currentTotals() {
  const additions = transactions.filter((item) => item.id > 7);
  const income = baseline.income + additions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const expense = baseline.expense + additions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
  return { income, expense, balance: income - expense };
}

function updateSummary() {
  const { income, expense, balance } = currentTotals();
  const rate = ((balance / income) * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 });
  document.querySelector("#hero-balance").textContent = money(balance);
  document.querySelector("#receipt-income").textContent = money(income);
  document.querySelector("#receipt-expense").textContent = money(expense);
  document.querySelector("#receipt-balance").textContent = money(balance);
  document.querySelector("#income-total").textContent = money(income);
  document.querySelector("#expense-total").textContent = money(expense);
  document.querySelector("#saved-rate").textContent = `${rate}%`;
  document.querySelector("#expense-note").textContent = `${Math.round((expense / 14000000) * 100)}% ngân sách tháng`;
}

function renderCategories() {
  const list = document.querySelector("#category-list");
  list.innerHTML = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([id, amount]) => {
      const category = categories[id];
      const width = Math.max(8, (amount / maxCategory) * 100);
      return `<button class="category-row" type="button" data-category="${id}" style="--icon-color:${category.color};--icon-bg:${category.bg};--width:${width}%" aria-pressed="${activeCategory === id}">
        <span class="category-icon">${category.icon}</span><span class="category-name">${category.name}</span><span class="category-bar"><i></i></span><span class="category-amount">${shortMoney(amount)}</span>
      </button>`;
    }).join("");
}

function renderTransactions() {
  const list = document.querySelector("#transaction-list");
  const filtered = activeCategory ? transactions.filter((item) => item.category === activeCategory) : transactions;
  const shown = filtered.slice(0, visibleCount);
  const title = activeCategory ? `Khoản ${categories[activeCategory].name.toLowerCase()}` : "Các khoản mới nhất";
  document.querySelector("#transaction-title").textContent = title;
  document.querySelector("#clear-filter").hidden = !activeCategory;
  document.querySelector("#show-all").hidden = filtered.length <= visibleCount;
  list.innerHTML = shown.length ? shown.map((item) => {
    const category = categories[item.category];
    const sign = item.type === "expense" ? "−" : "+";
    return `<div class="transaction-row" style="--icon-color:${category.color};--icon-bg:${category.bg}">
      <span class="transaction-icon">${category.icon}</span><div class="transaction-main"><b>${item.note}</b><small>${category.name} · ${item.time}</small></div>
      <span class="transaction-date">${item.date}</span><span class="transaction-amount ${item.type}">${sign}${money(item.amount)}</span>
    </div>`;
  }).join("") : `<p class="panel-caption">Chưa có giao dịch trong danh mục này.</p>`;
}

function populateCategories(type = "expense") {
  const select = document.querySelector("#category");
  const allowed = Object.entries(categories).filter(([id]) => type === "income" ? ["salary", "other_income"].includes(id) : !["salary", "other_income"].includes(id));
  select.innerHTML = `<option value="" disabled selected>Chọn danh mục</option>${allowed.map(([id, item]) => `<option value="${id}">${item.name}</option>`).join("")}`;
}

function openModal(id) { document.querySelector(id).hidden = false; document.body.style.overflow = "hidden"; }
function closeModal(id) { document.querySelector(id).hidden = true; if (document.querySelectorAll(".modal:not([hidden])").length === 0) document.body.style.overflow = ""; }
function showToast(message) { const toast = document.querySelector("#toast"); toast.innerHTML = message; toast.classList.add("show"); window.setTimeout(() => toast.classList.remove("show"), 3400); }

document.querySelectorAll("[data-period]").forEach((button) => button.addEventListener("click", () => {
  activePeriod = button.dataset.period;
  document.querySelectorAll("[data-period]").forEach((item) => { item.classList.toggle("selected", item === button); item.setAttribute("aria-selected", item === button ? "true" : "false"); });
  const labels = { today: "Hôm nay", this_week: "Tuần này", this_month: "Tháng này" };
  showToast(`<b>${labels[activePeriod]}</b> đang dùng dữ liệu mô phỏng để demo.`);
}));

document.querySelector("#open-transaction").addEventListener("click", () => { openModal("#transaction-modal"); document.querySelector("#amount").focus(); });
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", () => closeModal("#transaction-modal")));
document.querySelector("#scroll-forecast").addEventListener("click", () => document.querySelector("#forecast-panel").scrollIntoView({ behavior: "smooth", block: "center" }));
document.querySelector("#advice-button").addEventListener("click", () => { const card = document.querySelector("#advice-card"); card.hidden = !card.hidden; });
document.querySelector("#rotate-advice").addEventListener("click", (event) => { event.currentTarget.previousElementSibling.querySelector("h2").textContent = "Quỹ dự phòng cần bao nhiêu?"; event.currentTarget.previousElementSibling.querySelector("p:not(.eyebrow)").textContent = "Bắt đầu với 3–6 tháng chi phí thiết yếu, để ở nơi dễ rút khi cần."; event.currentTarget.textContent = "Đã đổi lời khuyên ✓"; });

document.querySelector("#category-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]"); if (!button) return;
  activeCategory = activeCategory === button.dataset.category ? null : button.dataset.category;
  visibleCount = 5; renderCategories(); renderTransactions(); document.querySelector("#giao-dich").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#clear-filter").addEventListener("click", () => { activeCategory = null; renderCategories(); renderTransactions(); });
document.querySelector("#show-all").addEventListener("click", () => { visibleCount = transactions.length; renderTransactions(); });

document.querySelectorAll("input[name='type']").forEach((input) => input.addEventListener("change", () => populateCategories(input.value)));
document.querySelector("#transaction-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const amount = Number(data.get("amount"));
  const type = data.get("type"); const category = data.get("category"); const note = data.get("note").trim();
  const error = document.querySelector("#form-error");
  if (!Number.isInteger(amount) || amount < 1000 || !category) { error.textContent = "Nhập số tiền nguyên từ 1.000 ₫ và chọn danh mục."; return; }
  error.textContent = "";
  draftTransaction = { id: Date.now(), date: "15 Thg 9", time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }), type, amount, category, note: note || "Chưa ghi chú" };
  const categoryInfo = categories[category];
  document.querySelector("#transaction-preview").innerHTML = `<div class="preview-row"><span>Loại</span><b>${type === "expense" ? "Chi tiền" : "Thu tiền"}</b></div><div class="preview-row"><span>Số tiền</span><b>${money(amount)}</b></div><div class="preview-row"><span>Danh mục</span><b>${categoryInfo.name}</b></div><div class="preview-row"><span>Ghi chú</span><b>${draftTransaction.note}</b></div>`;
  closeModal("#transaction-modal"); openModal("#confirm-modal");
});
document.querySelector("#back-to-form").addEventListener("click", () => { closeModal("#confirm-modal"); openModal("#transaction-modal"); });
document.querySelector("#confirm-transaction").addEventListener("click", () => {
  if (!draftTransaction) return;
  transactions.unshift(draftTransaction);
  if (draftTransaction.type === "expense") categoryTotals[draftTransaction.category] = (categoryTotals[draftTransaction.category] || 0) + draftTransaction.amount;
  closeModal("#confirm-modal"); document.querySelector("#transaction-form").reset(); populateCategories(); activeCategory = null; visibleCount = 5;
  renderCategories(); renderTransactions(); updateSummary(); showToast(`<b>Đã ghi giao dịch.</b> ${money(draftTransaction.amount)} đã xuất hiện trong nhật ký.`); draftTransaction = null;
});

populateCategories(); renderCategories(); renderTransactions(); updateSummary();
