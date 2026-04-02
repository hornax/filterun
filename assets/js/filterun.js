const FILTERUN_TEMPLATE = `
    <button type="button" class="fltrn-toggle-btn" id="fltrn-btn-toggle">Adjust Image</button>
    
    <div class="fltrn-panel fltrn-is-hidden" id="fltrn-main-panel">
        <div class="fltrn-presets-list" id="fltrn-presets"></div>

        <div class="fltrn-controls">
            <div class="fltrn-control-group">
                <label>Brightness <span class="val">100%</span></label>
                <input type="range" class="fltrn-range" id="fltrn-brght" min="0" max="200" value="100" data-filter="brightness" data-unit="%">
            </div>
            <div class="fltrn-control-group">
                <label>Contrast <span class="val">100%</span></label>
                <input type="range" class="fltrn-range" id="fltrn-cntrst" min="0" max="200" value="100" data-filter="contrast" data-unit="%">
            </div>
            <div class="fltrn-control-group">
                <label>Saturation <span class="val">100%</span></label>
                <input type="range" class="fltrn-range" id="fltrn-sat" min="0" max="200" value="100" data-filter="saturate" data-unit="%">
            </div>
            <div class="fltrn-control-group">
                <label>Grayscale <span class="val">0%</span></label>
                <input type="range" class="fltrn-range" id="fltrn-gray" min="0" max="100" value="0" data-filter="grayscale" data-unit="%">
            </div>
            <div class="fltrn-control-group">
                <label>Sepia <span class="val">0%</span></label>
                <input type="range" class="fltrn-range" id="fltrn-sepia" min="0" max="100" value="0" data-filter="sepia" data-unit="%">
            </div>
            <div class="fltrn-control-group">
                <label>Invert <span class="val">0%</span></label>
                <input type="range" class="fltrn-range" id="fltrn-inv" min="0" max="100" value="0" data-filter="invert" data-unit="%">
            </div>
            <div class="fltrn-control-group">
                <label>Hue <span class="val">0deg</span></label>
                <input type="range" class="fltrn-range" id="fltrn-hue" min="0" max="360" value="0" data-filter="hue-rotate" data-unit="deg">
            </div>
            <div class="fltrn-control-group">
                <label>Blur <span class="val">0px</span></label>
                <input type="range" class="fltrn-range" id="fltrn-blur" min="0" max="10" value="0" data-filter="blur" data-unit="px">
            </div>
        </div>
    </div>
`;

// Значення для пресетів (тепер у форматі об'єктів для синхронізації)
const PRESETS_DATA = [
    { name: 'Default', vals: { brightness: 100, contrast: 100, saturate: 100, grayscale: 0, sepia: 0, invert: 0, 'hue-rotate': 0, blur: 0 } },
    { name: 'Chrome', vals: { brightness: 110, contrast: 120, saturate: 130 } },
    { name: 'Noir', vals: { grayscale: 100, contrast: 130, brightness: 90 } },
    { name: 'Retro', vals: { sepia: 60, contrast: 90, brightness: 110, saturate: 80 } },
    { name: 'Vivid', vals: { saturate: 180, contrast: 110 } },
    { name: 'Cold', vals: { 'hue-rotate': 180, saturate: 90, brightness: 110 } },
    { name: 'Warm', vals: { sepia: 40, 'hue-rotate': -30, saturate: 120 } },
    { name: 'X-Process', vals: { invert: 10, contrast: 140, saturate: 150, hue: 20 } },
    { name: 'Misty', vals: { blur: 2, brightness: 120, saturate: 80 } },
    { name: 'Night', vals: { brightness: 60, 'hue-rotate': 220, saturate: 140 } }
];

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-filterun').forEach(container => initFilterun(container));
});

function initFilterun(container) {
    const mainImg = container.querySelector('img');
    container.insertAdjacentHTML('beforeend', FILTERUN_TEMPLATE);

    const panel = container.querySelector('#fltrn-main-panel');
    const toggleBtn = container.querySelector('#fltrn-btn-toggle');
    const presetsList = container.querySelector('#fltrn-presets');
    const inputs = container.querySelectorAll('.fltrn-range');

    toggleBtn.addEventListener('click', () => panel.classList.toggle('fltrn-is-hidden'));

    // Функція оновлення зображення
    const update = () => {
        let filterString = '';
        inputs.forEach(input => {
            const val = input.value;
            const unit = input.dataset.unit;
            const type = input.dataset.filter;
            filterString += `${type}(${val}${unit}) `;
            input.parentElement.querySelector('.val').innerText = val + unit;
        });
        mainImg.style.filter = filterString;

        // Знімаємо клас активності з пресетів, якщо користувач крутить повзунки вручну
        container.querySelectorAll('.fltrn-preset-item').forEach(i => i.classList.remove('is-active'));
    };

    // Генеруємо пресети
    PRESETS_DATA.forEach((data, index) => {
        const item = document.createElement('div');
        item.className = `fltrn-preset-item ${index === 0 ? 'is-active' : ''}`;

        // Створюємо рядок фільтру для мініатюри
        const thumbFilter = Object.entries(data.vals).map(([k, v]) => {
            const unit = k === 'hue-rotate' ? 'deg' : (k === 'blur' ? 'px' : '%');
            return `${k}(${v}${unit})`;
        }).join(' ');

        item.innerHTML = `
            <div class="fltrn-preset-preview">
                <img src="${mainImg.src}" style="filter: ${thumbFilter}">
            </div>
            <span class="fltrn-preset-label">${data.name}</span>
        `;

        item.onclick = () => {
            container.querySelectorAll('.fltrn-preset-item').forEach(i => i.classList.remove('is-active'));
            item.classList.add('is-active');
            applyPresetValues(container, data.vals);
            update();
        };
        presetsList.appendChild(item);
    });

    inputs.forEach(input => input.addEventListener('input', update));
}

function applyPresetValues(container, values) {
    // Скидаємо всі інпути до дефолту перед застосуванням пресету
    const defaults = { brightness: 100, contrast: 100, saturate: 100, grayscale: 0, sepia: 0, invert: 0, 'hue-rotate': 0, blur: 0 };
    const finalValues = { ...defaults, ...values };

    Object.entries(finalValues).forEach(([filterName, value]) => {
        const input = container.querySelector(`[data-filter="${filterName}"]`);
        if (input) input.value = value;
    });
}
