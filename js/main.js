// ── Datos de los modelos ──────────────────────────────────────────────────────
const MODELS = [
    {
        name: 'Casa Moderna',
        description: 'Diseño contemporáneo con grandes ventanales, techos planos y espacios abiertos. Ideal para terrenos amplios.',
        src: './assets/modelos/casa_2.glb',
    },
    {
        name: 'Casa Rústica',
        description: 'Estilo colonial con acabados en madera y piedra natural. Perfecta para entornos campestres o suburbanos.',
        src: './assets/modelos/Casas.glb', // reemplaza con tu modelo
    },
    {
        name: 'Casa Minimalista',
        description: 'Líneas puras, paleta neutra y máximo aprovechamiento de luz natural. Elegancia en cada detalle.',
        src: './assets/modelos/Casas_3.glb', // reemplaza con tu modelo
    },
];

// ── Referencias DOM ───────────────────────────────────────────────────────────
const startScreen = document.getElementById('start-screen');
const modelScreen = document.getElementById('model-screen');
const arContainer = document.getElementById('ar-container');
const startButton = document.getElementById('start-button');
const backBtn = document.getElementById('back-btn');
const arButton = document.getElementById('ar-button');

const arOverlay = document.getElementById('ar-overlay');
const resetArBtn = document.getElementById('reset-ar-btn');

const arModel = document.getElementById('ar-model');
const carouselTrack = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots-container');
const modelNameEl = document.getElementById('model-name');
const modelDescEl = document.getElementById('model-desc');
const currentIndexEl = document.getElementById('current-index');
const totalModelsEl = document.getElementById('total-models');

// ── Estado del carrusel ───────────────────────────────────────────────────────
let currentSlide = 0;
//let camaraStream = null;

// ── Inicializar carrusel ──────────────────────────────────────────────────────
totalModelsEl.textContent = MODELS.length;

// Crear dots
MODELS.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Ir al modelo ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function updateCarouselUI() {
    // Mover track
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Texto
    modelNameEl.textContent = MODELS[currentSlide].name;
    modelDescEl.textContent = MODELS[currentSlide].description;

    // Contador
    currentIndexEl.textContent = currentSlide + 1;

    // Dots
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
    });

    // Botones prev/next
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === MODELS.length - 1;
}

function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, MODELS.length - 1));
    updateCarouselUI();
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

// ── Swipe táctil ─────────────────────────────────────────────────────────────
let touchStartX = 0;
let touchEndX = 0;

carouselTrack.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselTrack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
        diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);
    }
}, { passive: true });

// ── Navegación entre pantallas ────────────────────────────────────────────────
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    modelScreen.style.display = 'flex';
    updateCarouselUI();
});

backBtn.addEventListener('click', () => {
    modelScreen.style.display = 'none';
    startScreen.style.display = 'flex';
});

// ── Activar AR ────────────────────────────────────────────────────────────────
arButton.addEventListener('click', () => {
    const activeModel = MODELS[currentSlide];
    arModel.setAttribute('src', activeModel.src);

    modelScreen.style.display = 'none';
    arContainer.style.display = 'flex';

    setTimeout(() => {
        if (arModel.activateAR) arModel.activateAR();
    }, 300);
});

// Controles del overlay
resetArBtn.addEventListener('click', () => {
    if (arModel.activateAR) arModel.activateAR();
});

// Eventos importantes de model-viewer
arModel.addEventListener('ar-status', e => {
    console.log('AR Status:', e.detail.status);

    if (e.detail.status === 'session-started' || e.detail.status === 'object-placed') {
        arOverlay.classList.add('show');
    } else if (['not-presenting', 'session-ended', 'failed'].includes(e.detail.status)) {
        arOverlay.classList.remove('show');
        arContainer.style.display = 'none';
        modelScreen.style.display = 'flex';
    }
});

if (arModel) {
    arModel.addEventListener('ar-status', e => {
        console.log('Estado AR:', e.detail.status);

        if (e.detail.status === 'not-presenting' || e.detail.status === 'session-ended') {
            arContainer.style.display = 'none';
            modelScreen.style.display = 'flex';
            resetAR();
        }
    });
}

function resetAR() {

   if(camaraStream){
    camaraStream.getTracks().forEach(track => track.stop())
    camaraStream = null
   }
   if(camaraPreview){
    camaraPreview.srcObject = null
   }
}

function downloadBlob(blob){
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ar-foto-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(()=> URL.revokeObjectURL(url),1500)
}

window.addEventListener('beforeunload', () => {
    if (camaraStream){
        camaraStream.getTracks().forEach(track => track.stop())
    }
})

console.log('%c🚀 Innova Archviz AR listo', 'color:#c8a96e;font-weight:bold');

// ── Detección de dispositivo ──────────────────────────────────────────────────
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);
console.log(`Dispositivo: ${isIOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop'}`);