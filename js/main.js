//Elementos del DOM
const startScreen = document.getElementById('start-screen');
const arContainer = document.getElementById('ar-container');
const startButton = document.getElementById('start-button');
const instructions = document.getElementById('instructions');
const resetBtn = document.getElementById('reset-btn');
const modelViewer = document.getElementById('house-modal');

//Inicia experiencia AR
startButton.addEventListener('click', () => {
    console.log('Iniciando experiencia AR... ');

    // Cambiar pantallas
    startScreen.style.display = 'none';
    arContainer.style.display = 'block';

    // Forzar modo AR despues de un breve retraso
    setTimeout(() => {
        console.log('Buscando boton AR...');
        //Busca en shadowRoot del model-viewer
        if (modelViewer.shadowRoot) {
            const arButton = modelViewer.shadowRoot.querySelector('button[slot="ar-button"]');
            if (arButton) {
                console.log('Boton AR encontrado, haciendo clic...');
                arButton.click()
            } else {
                console.warn('Boton AR no encontado en shadowRoot');
                const fallbackButton = document.querySelector('.ar-button')
                if (fallbackButton) {
                    fallbackButton.click();
                }
            }
        }
        setTimeout(() => {
            if (instructions) {
                instructions.classList.add('hide')
            }
        },8000)
    },1000)
}) 

resetBtn.addEventListener('click',()=>{
    console.log('Reiniciando experiencia...');
    
    if(instructions){
        instructions.classList.remove('hide')
    }

    modelViewer.ar = false
    setTimeout(()=>{
        modelViewer.ar = true

        setTimeout(() => {
           if(modelViewer.shadowRoot){
            const arButton = modelViewer.shadowRoot.querySelector('button[slot="ar-button"]')
            if(arButton){
                arButton.click()
            }
           } 
        },500 );
    },100)
})

modelViewer.addEventListener('ar-status', (event)=>{
    console.log('Estado AR: ', event.detail.status);

    if(event.detail.status === 'session-started'){
        console.log('Sesion AR iniciada - Escaneando terreno...');
        //Ocultar instrucciones cuando la sesion inicie
        if(instructions){
            instructions.classList.add('hidden')
        }
    }
    if (event.detail.status === 'failed'){
        console.error('Fallo la sesion AR:', event.detail.statusMessage);
        alert('No se pudp iniciar la camara AR. Asegurese de dar permisos.')
    }
})

modelViewer.addEventListener('click',()=>{
    console.log('Usuario toco la pantalla para colocar modelo');
    if(instructions && !instructions.classList.contains('hidden')){
        instructions.classList.add('hidden')
    }
})

document.addEventListener('touchmove', (e)=>{
    if(e.target === modelViewer || modelViewer.contains(e.target)){
        e.preventDefault()
    }
}, {passive: false})

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
const isAndroid = /Android/.test(navigator.userAgent)

console.log(`Dispositivo: ${isIOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop'} `);

if (isIOS) {
    console.log('📱 iOS detectado - Usando Quick Look');
    document.body.classList.add('ios');
} else if (isAndroid) {
    console.log('🤖 Android detectado - Usando Scene Viewer');
    document.body.classList.add('android');
}