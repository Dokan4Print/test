function trackInvoice() {
  const code = document.getElementById('invoiceCodeInput').value.trim();
  const resultDiv = document.getElementById('trackingResult');

  // بيانات وهمية للتجربة (ممكن تتغير بعدين بـ Google Sheets)
  const fakeOrders = {
    "8001": { total: 3, price: "810ج", status: 4 },
    "8002": { total: 1, price: "280ج", status: 2 },
    "8003": { total: 5, price: "1300ج", status: 6 }
  };

  if (fakeOrders[code]) {
    const order = fakeOrders[code];
    resultDiv.innerHTML = `
      <p>عدد المنتجات: ${order.total}</p>
      <p>الإجمالي: ${order.price}</p>
      <div class="timeline">
        ${renderTimeline(order.status)}
      </div>
    `;
  } else {
    resultDiv.innerHTML = `<p style="color:red">لم يتم العثور على هذه الفاتورة.</p>`;
  }
}

function renderTimeline(currentStep) {
  const steps = [
    "تم استلام الطلب",
    "فاتورة جديدة",
    "جاري التصميم",
    "بانتظار تأكيد التصميم",
    "جاري الطباعة",
    "تم تسليمها للشحن",
    "تم التوصيل",
    "اكتب تقييمك ❤️"
  ];

  return steps.map((step, index) => {
    const active = index < currentStep ? '✅' : '⬜';
    return `<span style="margin:5px">${active} ${step}</span>`;
  }).join("<br>");
}
