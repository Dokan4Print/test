window.onload = () => {
  const invoiceId = localStorage.getItem("currentInvoice") || "0000";
  document.getElementById("showInvoiceCode").textContent = invoiceId;
};
