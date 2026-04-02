const img = document.getElementById('main-image');
const panel = document.getElementById('filter-panel');
const toggleBtn = document.getElementById('filter-toggle');

// Елементи керування
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const saturate = document.getElementById('saturate');
const sepia = document.getElementById('sepia');

toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('hidden');
});

function updateFilters() {
    img.style.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    saturate(${saturate.value}%)
    sepia(${sepia.value}%)
  `;
}

[brightness, contrast, saturate, sepia].forEach(input => {
    input.addEventListener('input', updateFilters);
});

function applyPreset(type) {
    if (type === 'none') {
        brightness.value = 100; contrast.value = 100; saturate.value = 100; sepia.value = 0;
    } else if (type === 'vintage') {
        brightness.value = 90; contrast.value = 120; saturate.value = 80; sepia.value = 50;
    } else if (type === 'bw') {
        brightness.value = 100; contrast.value = 110; saturate.value = 0; sepia.value = 0;
    }
    updateFilters();
}