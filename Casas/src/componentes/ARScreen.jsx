import { useEffect, useRef, useState } from 'react'
import Button from './Button'

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

export default function ARScreen({ model, onExit }) {
  const viewerRef  = useRef(null)
  const [locked, setLocked] = useState(false)

  // Activar AR al montar
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    // Pequeño delay para que model-viewer cargue el src nuevo
    const timer = setTimeout(() => {
      if (viewer.activateAR) viewer.activateAR()
    }, 300)

    // Escuchar cambios de estado AR
    const handleArStatus = (e) => {
      if (e.detail.status === 'session-started') {
        setLocked(false)
        viewer.setAttribute('camera-controls', '')
        viewer.style.pointerEvents = 'auto'
        viewer.classList.remove('model-locked')
      }
      if (e.detail.status === 'not-presenting' || e.detail.status === 'session-ended') {
        onExit()
      }
    }

    viewer.addEventListener('ar-status', handleArStatus)
    return () => {
      clearTimeout(timer)
      viewer.removeEventListener('ar-status', handleArStatus)
    }
  }, [model, onExit])

  // Bloquear modelo al tocar
  const handleViewerClick = () => {
    const viewer = viewerRef.current
    if (!locked && viewer?.hasAttribute('ar')) {
      setLocked(true)
      viewer.removeAttribute('camera-controls')
      viewer.style.pointerEvents = 'none'
      viewer.classList.add('model-locked')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="relative flex-1">
        <model-viewer
          ref={viewerRef}
          src={model.src}
          alt={model.name}
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
          shadow-intensity="1.5"
          exposure="1"
          shadow-softness="0.8"
          onClick={handleViewerClick}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar" />
          </div>
        </model-viewer>
      </div>

      {/* Controles */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Button
          variant="ghost"
          onClick={onExit}
          className="backdrop-blur-md bg-dark/80 border-white/20 text-white"
        >
          <ArrowLeft /> Salir de AR
        </Button>
      </div>
    </div>
  )
}