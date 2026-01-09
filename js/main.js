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

//modelo estatico
startButton.addEventListener('click',()=>{
    console.log('Mostrando modelo 3D');
    startScreen.style.display = 'none';
    modelScreen.style.display = 'flex'
})

//regresar al inicio
backBtn.addEventListener('click',()=>{
    modelScreen.style.display = 'none';
    startScreen.style.display = 'flex';
})

//activar modo AR - contenedor AR
activateArBtn.addEventListener('click',()=>{
    console.log('Activando AR');
    
    if(arContainer && modelScreen){
        //ocultar pantalla del modelo
        modelScreen.style.display = 'none';

        //mostrar contenedor AR
        arContainer.style.display = 'flex';
        console.log('Contenedor activado');
        
        //activar cámara AR
        if(modelViewerAr && modelViewerAr.activateAR){
            modelViewerAr.activateAR();
            console.log('Cámara AR activada');
        }
        
    }else{
        console.error('Elemento AR no encontrado');
        
    }
})

//salir de AR
exitArBtn.addEventListener('click',()=>{
    console.log('Saliendo de AR  ');
    //ocultar contenedor AR
    arContainer.style.display = 'none';

    //mostrar pantalla del modelo
    modelScreen.style.display = 'flex';

    if(modelViewerAr && modelViewerAr.exitAR){
        modelViewerAr.exitAR();
    }
})

//configurar modelo AR
if(modelViewerAr){
    //resea cuando salga de AR
    modelViewerAr.addEventListener('ar-status',(event)=>{
        console.log('Estado Ar:',event.detail.status);

        //si sale de AR, vuelve a la pantalla del modelo
        if(event.detail.status === 'not-presenting' || event.detail.status === 'session-ended'){
            console.log('Saliendo de Ar automaticamnete');
            arContainer.style.display = 'none';
            modelScreen.style.display = 'flex';
        }
        
    })
}

//detecta dispositivos
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
const isAndroid = /Android/.test(navigator.userAgent)

console.log(`Dispositivo ${isIOS ? 'ios' : isAndroid ? 'Android' : 'Desktop'}`);

//depurar
console.log('Elementos cargados',{
    startScreen: !!startScreen,
    modelScreen: !!modelScreen,
    arContainer: !!arContainer,
    modelViewer: !!modelViewer,
    modelViewerAr: !!modelViewerAr,
    exitArBtn: !!exitArBtn
});
