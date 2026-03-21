import { useState } from 'react'
import StartScreen from './componentes/StartScreen'
import ModelScreen from './componentes/ModelScreen'
import ARScreen    from './componentes/ARScreen'

// Pantallas posibles
const SCREENS = {
  START: 'start',
  MODELS: 'models',
  AR: 'ar',
}

export default function App() {
  const [screen, setScreen]         = useState(SCREENS.START)
  const [activeModel, setActiveModel] = useState(null)

  const openAR = (model) => {
    setActiveModel(model)
    setScreen(SCREENS.AR)
  }

  return (
    <div className="min-h-screen bg-dark flex justify-center">
      {screen === SCREENS.START && (
        <StartScreen onStart={() => setScreen(SCREENS.MODELS)} />
      )}

      {screen === SCREENS.MODELS && (
        <ModelScreen
          onBack={() => setScreen(SCREENS.START)}
          onOpenAR={openAR}
        />
      )}

      {screen === SCREENS.AR && activeModel && (
        <ARScreen
          model={activeModel}
          onExit={() => setScreen(SCREENS.MODELS)}
        />
      )}
    </div>
  )
}