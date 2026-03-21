// Un slide del carrusel: solo recibe el src y el alt del modelo.
// Se reutiliza para cada modelo sin repetir código.

export default function ModelSlide({ src, alt, isActive }) {
  return (
    <div className="w-full flex-shrink-0">
      <model-viewer
        src={src}
        alt={alt}
        camera-controls
        auto-rotate={isActive ? '' : undefined}
        environment-image="neutral"
        shadow-intensity="1.5"
        exposure="1"
        shadow-softness="0.8"
        style={{ width: '100%', height: '46vh', minHeight: '260px', borderRadius: '16px' }}
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar" />
        </div>
      </model-viewer>
    </div>
  )
}