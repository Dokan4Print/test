const genderInputs = document.querySelectorAll('input[name="gender"]');
const designOptions = document.getElementById('designOptions');
const childNameInput = document.querySelector('input[name="childName"]');
const childBackNameInput = document.querySelector('input[name="childBackName"]');
const photoUpload = document.getElementById('photoUpload');
const imagePreview = document.getElementById('imagePreview');
const notesInput = document.querySelector('textarea[name="notes"]');
const saveBtn = document.getElementById('saveBtn');

let selectedDesign = null;
let uploadedImages = [];

// ✅ تحميل التصميمات
let designImages = [];
let currentStartIndex = 0;

genderInputs.forEach(input => {
  input.addEventListener('change', () => {
    const gender = input.value;
    designImages = [];
    for (let i = 1; i <= 24; i++) {
      const code = gender === 'boy' ? `H-${i.toString().padStart(2, '0')}` : `S-${i.toString().padStart(2, '0')}`;
      designImages.push(code);
    }
    currentStartIndex = 0;
    renderDesigns();
  });
});

function renderDesigns() {
  designOptions.innerHTML = '';
  const visible = designImages.slice(currentStartIndex, currentStartIndex + 4);
  visible.forEach(code => {
    const img = document.createElement('img');
    img.src = `../images/${code}.png`;
    img.dataset.code = code;
    img.onclick = () => selectDesign(code, img);
    if (code === selectedDesign) img.classList.add('selected');
    designOptions.appendChild(img);
  });
}

function selectDesign(code, imgEl) {
  selectedDesign = code;
  document.querySelectorAll('.design-images img').forEach(img => img.classList.remove('selected'));
  imgEl.classList.add('selected');
}

document.getElementById('prevDesign').onclick = () => {
  if (currentStartIndex > 0) {
    currentStartIndex -= 1;
    renderDesigns();
  }
};

document.getElementById('nextDesign').onclick = () => {
  if (currentStartIndex + 4 < designImages.length) {
    currentStartIndex += 1;
    renderDesigns();
  }
};

// ✅ رفع الصور
photoUpload.addEventListener('change', () => {
  uploadedImages = [];
  imagePreview.innerHTML = '';
  const files = Array.from(photoUpload.files).slice(0, 2);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      uploadedImages.push(e.target.result);
      const img = document.createElement('img');
      img.src = e.target.result;
      imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// ✅ حفظ التصميم
saveBtn.onclick = () => {
  if (!selectedDesign || !childNameInput.value) {
    alert("برجاء اختيار التصميم وكتابة اسم الطفل");
    return;
  }

  const list = JSON.parse(localStorage.getItem("designList") || "[]");
  const newId = (list.length + 1).toString().padStart(3, '0');

  const item = {
    id: newId,
    designCode: selectedDesign,
    designImage: `../images/${selectedDesign}.png`,
    childName: childNameInput.value,
    childBackName: childBackNameInput.value,
    images: uploadedImages,
    notes: notesInput.value
  };

  list.push(item);
  localStorage.setItem("designList", JSON.stringify(list));

  // تصفير الحقول
  selectedDesign = null;
  uploadedImages = [];
  document.querySelectorAll('.design-images img').forEach(img => img.classList.remove('selected'));
  childNameInput.value = "";
  childBackNameInput.value = "";
  notesInput.value = "";
  imagePreview.innerHTML = "";
  photoUpload.value = "";

  alert("تم حفظ التصميم، يمكنك إضافة تصميم جديد.");
};
