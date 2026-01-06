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
startButton.addEventListener('click',()=>{
    console.log('Mostrando modelo 3d...');
    startScreen.style.display = 'none'
    modelScreen.style.display = 'block'
    // Asegurar que el model-viewer sea visible (casos donde el CSS pueda ocultarlo)
    if (modelViewer) {
        modelViewer.style.display = '';
        modelViewer.style.visibility = 'visible';
        modelViewer.style.opacity = '1';
    }
})

//volver al inicio
backBtn.addEventListener('click',()=>{
    modelScreen.style.display = 'none'
    startScreen.style.display = 'block'
})

//activar ar camara
activateArBtn.addEventListener('click', ()=>{
    console.log('Modo AR');
    modelScreen.style.display = 'none';
    arContainer.style.display = 'block';

    // Ocultar controles en pantalla estática cuando se activa AR
    if (modelControls) {
        modelControls.style.display = 'none';
    }

    // Intentar activar la cámara simulando click en el botón AR interno del <model-viewer>
    setTimeout(() => {
        try {
            const innerArBtn = modelViewerAr.querySelector('button[slot="ar-button"]');
            if (innerArBtn) {
                innerArBtn.click();
            } else {
                console.warn('Botón AR interno no encontrado');
            }
        } catch (err) {
            console.error('Error al intentar activar AR:', err);
        }
    }, 200);
})

//salir de Ar
exitArBtn.addEventListener('click',()=>{
    console.log('saliendo de AR..')
    arContainer.style.display = 'none'
    modelScreen.style.display = 'block'

    modelViewerAr.ar = false;
    // Restaurar controles e instrucciones al salir
    if(instructions){
        instructions.classList.remove('hidden');
    }
    if (modelControls) {
        modelControls.style.display = '';
    }
    if (arControls) {
        arControls.style.display = '';
    }
})

// reubicar en ar

resetBtn.addEventListener('click',()=>{
    console.log('Reubicando modelo ...');
    modelViewerAr.ar = false

    setTimeout(()=>{
        modelViewerAr.ar = true
        if(instructions){
            instructions.classList.remove('hidden');
        }
    },100)
})

//eventos ar
modelViewerAr.addEventListener('ar-status',(event)=>{
    console.log('Estado Ar: ',event.detail.status);
    
    if(event.detail.status ==='session-started'){
        console.log('Sesion ar inicada - Escaneando terreno..');
        if(instructions){
            setTimeout(()=>{
                instructions.classList.add('hidden');
            },3000)
        }
        // Ocultar botones AR cuando la cámara esté activa
        if (arControls) {
            arControls.style.display = 'none';
        }
    }
    if(event.detail.status ==='failed'){
        console.error('Fallo la sesion',event.detail.statusMessage);
        alert('No se pudo iniciar la cámara AR')
    }
})

// Ocultar instrucciones al tocar para colocar modelo
modelViewerAr.addEventListener('click', () => {
    console.log('Usuario tocó la pantalla para colocar modelo');
    if (instructions && !instructions.classList.contains('hidden')) {
        instructions.classList.add('hidden');
    }
});

// Prevenir scroll en modelo AR
document.addEventListener('touchmove', (e) => {
    if (e.target === modelViewerAr || modelViewerAr.contains(e.target)) {
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