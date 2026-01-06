//Elementos del DOM
const startScreen = document.getElementById('start-screen');
const modelScreen = document.getElementById('model-screen');
const arContainer = document.getElementById('ar-container');
const startButton = document.getElementById('start-button');
const activateArBtn = document.getElementById('activate-ar-btn');
const backBtn = document.getElementById('back-btn');
const exitArBtn = document.getElementById('exit-ar-btn');
const instructions = document.getElementById('ar-instructions');
const resetBtn = document.getElementById('reset-btn-ar');
const modelViewer = document.getElementById('house-modal');
const modelViewerAr = document.getElementById('house-modal-ar');
const modelControls = document.querySelector('.model-controls');
const arControls = document.querySelector('#ar-container .ar-controls');

//ver modelo estatico
startButton.addEventListener('click', () => {
    console.log('Mostrando modelo 3d...');
    startScreen.style.display = 'none'
    modelScreen.style.display = 'flex'
    // Asegurar que el model-viewer sea visible (casos donde el CSS pueda ocultarlo)
    if (modelViewer) {
        modelViewer.style.display = '';
        modelViewer.style.visibility = 'visible';
        modelViewer.style.opacity = '1';
    }
})

//volver al inicio
backBtn.addEventListener('click', () => {
    modelScreen.style.display = 'none'
    startScreen.style.display = 'flex'
})

//activar ar camara
activateArBtn.addEventListener('click', () => {
    console.log('Modo AR');
    modelScreen.style.display = 'none';
    if (arContainer) {
        arContainer.style.display = 'block';
    } else {
        console.warn('No se encontró #ar-container en el DOM');
    }

    // Ocultar controles en pantalla estática cuando se activa AR
    if (modelControls) {
        modelControls.style.display = 'none';
    }

    // Intentar activar la cámara simulando click en el botón AR interno del <model-viewer>
    setTimeout(() => {
        try {
            if (modelViewerAr) {
                // Intentar activar el botón AR interno (si está disponible)
                const innerArBtn = modelViewerAr.querySelector('button[slot="ar-button"]');
                if (innerArBtn) {
                    innerArBtn.click();
                } else {
                    console.warn('Botón AR interno no encontrado en #house-modal-ar — el usuario puede tocar el botón AR manualmente.');
                }
            } else {
                console.warn('Elemento #house-modal-ar no encontrado');
            }
        } catch (err) {
            console.error('Error al intentar activar AR:', err);
        }
    }, 200);
})

//salir de Ar
exitArBtn.addEventListener('click', () => {
    console.log('saliendo de AR..')
    if (arContainer) arContainer.style.display = 'none';
    modelScreen.style.display = 'flex'

    // No forzamos propiedades internas del componente; simplemente restauramos la UI.
    // Restaurar controles e instrucciones al salir

    if (modelControls) {
        modelControls.style.display = '';
    }
    if (arControls) {
        arControls.style.display = '';
    }
})



// Prevenir scroll en modelo AR
document.addEventListener('touchmove', (e) => {
    if (modelViewerAr && (e.target === modelViewerAr || modelViewerAr.contains(e.target))) {
        e.preventDefault();
    }
}, { passive: false });

// Detectar dispositivo
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);

console.log(`Dispositivo: ${isIOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop'}`);

if (isIOS) {
    console.log('📱 iOS detectado - Usando Quick Look');
    document.body.classList.add('ios');
} else if (isAndroid) {
    console.log('🤖 Android detectado - Usando Scene Viewer');
    document.body.classList.add('android');
}