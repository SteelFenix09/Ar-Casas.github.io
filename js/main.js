// elementon del DOM

const startScreen = document.getElementById('start-screen');
const modelScreen = document.getElementById('model-screen');
const arContainer = document.getElementById('ar-container');
const startButton = document.getElementById('start-button')
const backBtn = document.getElementById('back-btn');
const activateArBtn = document.getElementById('ar-button')
const exitArBtn = document.getElementById('exit-ar-btn')
const modelViewer = document.getElementById('house-modal');
const modelViewerAr = document.getElementById('ar-model')

//rastrea el modelo colocado
let modelPlaced = false;

//modelo estatico
startButton.addEventListener('click', () => {
    console.log('Mostrando modelo 3D');
    startScreen.style.display = 'none';
    modelScreen.style.display = 'flex'
})

//regresar al inicio
backBtn.addEventListener('click', () => {
    modelScreen.style.display = 'none';
    startScreen.style.display = 'flex';
})

//activar modo AR - contenedor AR
activateArBtn.addEventListener('click', () => {
    console.log('Activando AR');

    modelPlaced = false;

    if (arContainer && modelScreen) {
        //ocultar pantalla del modelo
        modelScreen.style.display = 'none';

        //mostrar contenedor AR
        arContainer.style.display = 'flex';
        console.log('Contenedor activado');

        //mostrar contenedo AR
        arContainer.style.display = 'flex';
        console.log('Contenedor activo');

        //activar cámara AR
        if (modelViewerAr && modelViewerAr.activateAR) {
            modelViewerAr.activateAR();
            console.log('Cámara AR activada');
        }

        if (modelViewerAr) {
            modelViewerAr.setAttribute('camera-controls', '');
            modelViewerAr.style.pointerEvents = 'auto'
        }

    } else {
        console.error('Elemento AR no encontrado');

    }
})

//salir de AR
exitArBtn.addEventListener('click', () => {
    console.log('Saliendo de AR  ');
    //ocultar contenedor AR
    arContainer.style.display = 'none';

    //mostrar pantalla del modelo
    modelScreen.style.display = 'flex';

    modelPlaced = false;

    if (modelViewerAr) {
        modelViewerAr.setAttribute('camera-controls', '');
        modelViewerAr.style.pointerEvents = 'auto'
        modelViewerAr.classList.remove('model-locked');
    }
})

//configurar modelo AR
if (modelViewerAr) {
    //detecta cuando el modelo es colocado
    modelViewerAr.addEventListener('click', () => {
        if (!modelPlaced && modelViewerAr.hasAttribute('ar')) {
            console.log('Modelo colocado - bloqueado');
            modelPlaced = true;

            //quita controles de camara
            modelViewerAr.removeAttribute('camera-controls');

            //deshabilita interacciones
            modelViewerAr.style.pointerEvents = 'none'


            modelViewerAr.classList.add('model-locked');

            console.log('modelo bloqueado');

        }
    })
    //resetea saliedno AR
    modelViewerAr.addEventListener('ar-status', (event) => {
        console.log('Estado ar: ', event.detail.status);

        //salir del AR vuelve al modelo

        if (event.detail.status === 'not-presenting' || event.detail.status === 'session-ended') {
            console.log('Saliendo AR automaticamente');
            arContainer.style.display = 'none'
            modelScreen.style.display = 'flex';

            //resetea estato para la proxima vez
            modelPlaced = false

            //vuelve los controles
            if (modelViewerAr) {
                modelViewerAr.setAttribute('camera-controls', '');
                modelViewerAr.style.pointerEvents = 'auto'
                modelViewerAr.classList.remove('model-locked');
            }
        }
        if(event.detail.status === 'session-started'){
            console.log('Sesion iniciada');
            modelPlaced = false;
            if(modelViewerAr){
                modelViewerAr.setAttribute('camera-controls', '');
                modelViewerAr.style.pointerEvents = 'auto'
                modelViewerAr.classList.remove('model-locked');
            }
        }
    })
}



//detecta dispositivos
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
const isAndroid = /Android/.test(navigator.userAgent)

console.log(`Dispositivo ${isIOS ? 'ios' : isAndroid ? 'Android' : 'Desktop'}`);

//depurar
console.log('Elementos cargados', {
    startScreen: !!startScreen,
    modelScreen: !!modelScreen,
    arContainer: !!arContainer,
    modelViewer: !!modelViewer,
    modelViewerAr: !!modelViewerAr,
    exitArBtn: !!exitArBtn
});
