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

//ver modelo estatico
startButton.addEventListener('click',()=>{
    console.log('Mostrando modelo 3d...');
    startScreen.style.display = 'none'
    modelScreen.style.display = 'block'
})

//volver al inicio
backBtn.addEventListener('click',()=>{
    modelScreen.style.display = 'none'
    startScreen.style.display = 'block'
})

//activar ar camara
activateArBtn.addEventListener('click',()=>{
    console.log('Modo AR');
    modelScreen.style.display = 'none'
    arContainer.style.display = 'block'

    // entra en modo ar despues de un retraso

    setTimeout(()=>{
        console.log('Boton ar..');
        if(modelViewerAr.shadowRoot){
            const arButton = modelViewerAr.shadowRoot.querySelector('button[slot="ar-button"]');
            if(arButton){
                console.log('Boton ar encontrado, haciendo click');
                arButton.click()
                //oculta instruciones despues de activar ar
                setTimeout(()=>{
                    if(instructions){
                        instructions.classList.add('hidden');
                    }
                },5000)
            } else{
                console.warn('Boton ar no encontrado');
                
            }
        }
    },500)
})

//salir de Ar
exitArBtn.addEventListener('click',()=>{
    console.log('saliendo de AR..')
    arContainer.style.display = 'none'
    modelScreen.style.display = 'block'

    modelViewerAr.ar = false;
    if(instructions){
        instructions.classList.remove('hidden');
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

        setTimeout(()=>{
            if(modelViewerAr.shadowRoot){
                const arButton = modelViewerAr.shadowRoot.querySelector('button[slot="ar-button"]');
                if(arButton){
                    arButton.click()
                }
            }
        },500)
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