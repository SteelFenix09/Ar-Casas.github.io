//Elementos del DOM
const startScreen = document.getElementById('start-screen');
const arContainer = document.getElementById('ar-container');
const startButton = document.getElementById('start-button');
const instructions = document.getElementById('instructions');
const resetBtn = document.getElementById('reset-btn');
const modelViewer = document.getElementById('house-modal');

//Inicia experiencia AR
startButton.addEventListener('click',() =>{
    startScreen.style.display = 'none';
    arContainer.style.display = 'block';
    //Forzar modo AR despues de 1 segundo
    setTimeout(()=>{
        const arButton = modelViewer.querySelector('[slot="ar-button"]');
        if(arButton){
            arButton.click()
        }
    },1000)

    setTimeout(() => {
        instructions.classList.add('hidden')
    },10000);
})

resetBtn.addEventListener('click', () =>{
    instructions.classList.remove('hidden');

    const arButton = modelViewer.shadowRoot.querySelector('[slot="ar-button"]');
    if(arButton){
        arButton.click()

        setTimeout(()=>{
            arButton.click()
        },500)
    }
})

modelViewer.addEventListener('ar-status',(event)=>{
    if (event.detail.status === 'session-started'){
        console.log('Sesion AR iniciada - Escaneando Terreno...');
    }
})

modelViewer.addEventListener('click',(event) =>{
    console.log('Usuario toco la pantala para colocar modelo');
    instructions.classList.add('hidden');
})

document.addEventListener('touchmove', (e) =>{
    if(e.target === modelViewer){
        e.preventDefault()
    }
},{passive:false})