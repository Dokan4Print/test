// ✅ فتح فورم التصميم
function openForm() {
  location.href = `form/form-design.html?product=bottle`;
}

// ✅ تحميل التصميمات من localStorage
function loadDesigns() {
  const list = JSON.parse(localStorage.getItem("designList") || "[]");
  const container = document.getElementById("designListContainer");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>لا توجد تصميمات حتى الآن</p>";
    document.getElementById("confirmBtn").disabled = true;
    return;
  }

  list.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "design-card";
    div.innerHTML = `
      <div>
        <img src="${item.designImage}" alt="تصميم">
        <strong>${item.childName}</strong><br>
        كود: ${item.designCode} | ملاحظات: ${item.notes || 'لا يوجد'}
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById("confirmBtn").disabled = false;
}

// ✅ تأكيد الطلب
function confirmOrder() {
  const designs = JSON.parse(localStorage.getItem("designList") || "[]");
  if (designs.length === 0) return alert("برجاء إضافة تصميم أولاً");

  const invoiceCode = Math.floor(8000 + Math.random() * 1000);
  localStorage.setItem("invoiceCode", invoiceCode);
  localStorage.setItem(`order_${invoiceCode}`, JSON.stringify(designs));
  localStorage.removeItem("designList");

  location.href = `checkout.html?code=${invoiceCode}`;
}

// ✅ عند التحميل
document.addEventListener("DOMContentLoaded", loadDesigns);
