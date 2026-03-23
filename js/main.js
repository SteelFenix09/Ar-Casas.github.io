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
        src: './assets/modelos/Astronaut.glb', // reemplaza con tu modelo
    },
    {
        name: 'Casa Minimalista',
        description: 'Líneas puras, paleta neutra y máximo aprovechamiento de luz natural. Elegancia en cada detalle.',
        src: './assets/modelos/casa_j.glb', // reemplaza con tu modelo
    },
];

// ── Referencias DOM ───────────────────────────────────────────────────────────
const startScreen   = document.getElementById('start-screen');
const modelScreen   = document.getElementById('model-screen');
const arContainer   = document.getElementById('ar-container');
const startButton   = document.getElementById('start-button');
const backBtn       = document.getElementById('back-btn');
const arButton      = document.getElementById('ar-button');
const exitArBtn     = document.getElementById('exit-ar-btn');
const captureBtn    = document.getElementById('capture-btn');
const arModel       = document.getElementById('ar-model');
const cameraPreview = document.getElementById('camera-preview');
const photoCanvas   = document.getElementById('photo-canvas');

const carouselTrack = document.getElementById('carousel-track');
const prevBtn       = document.getElementById('prev-btn');
const nextBtn       = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots-container');
const modelNameEl   = document.getElementById('model-name');
const modelDescEl   = document.getElementById('model-desc');
const currentIndexEl= document.getElementById('current-index');
const totalModelsEl = document.getElementById('total-models');

// ── Estado del carrusel ───────────────────────────────────────────────────────
let currentSlide = 0;
let cameraStream = null;

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
let touchEndX   = 0;

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
    startCamera();

    if (arModel.activateAR) {
        arModel.activateAR();
    }
});

// ── Salir de AR (botón manual) ────────────────────────────────────────────────
exitArBtn.addEventListener('click', () => {
    arContainer.style.display = 'none';
    modelScreen.style.display = 'flex';
    resetAR();
});

captureBtn.addEventListener('click', async () => {
    if (arModel && arModel.toBlob) {
        try {
            const blob = await arModel.toBlob({ idealAspect: true });
            if (blob) {
                downloadBlob(blob);
                return;
            }
        } catch (error) {
            console.warn('No se pudo capturar desde model-viewer, intentando con cámara:', error);
        }
    }

    if (!cameraPreview || !photoCanvas || !cameraPreview.videoWidth || !cameraPreview.videoHeight) {
        alert('No hay señal de cámara disponible todavía para tomar foto.');
        return;
    }

    const ctx = photoCanvas.getContext('2d');
    photoCanvas.width = cameraPreview.videoWidth;
    photoCanvas.height = cameraPreview.videoHeight;
    ctx.drawImage(cameraPreview, 0, 0, photoCanvas.width, photoCanvas.height);
    photoCanvas.toBlob(blob => {
        if (blob) downloadBlob(blob);
    }, 'image/jpeg', 0.95);
});

// ── Eventos del AR model-viewer ───────────────────────────────────────────────
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
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    if (cameraPreview) {
        cameraPreview.srcObject = null;
    }
}

async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia || !cameraPreview) return;

    try {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false,
        });
        cameraPreview.srcObject = cameraStream;
        await cameraPreview.play();
    } catch (error) {
        console.warn('No se pudo iniciar la cámara automáticamente:', error);
    }
}

function downloadBlob(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ar-foto-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
}

window.addEventListener('beforeunload', () => {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
});

// ── Detección de dispositivo ──────────────────────────────────────────────────
const isIOS     = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);
console.log(`Dispositivo: ${isIOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop'}`);
