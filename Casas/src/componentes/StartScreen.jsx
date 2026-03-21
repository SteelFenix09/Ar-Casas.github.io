import Button from './Button'

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function StartScreen({ onStart }) {
  return (
    <div className="w-full max-w-sm min-h-screen flex flex-col justify-center px-6 py-10 mx-auto">

      <span className="inline-block self-start text-xs font-semibold tracking-widest uppercase
                       text-accent bg-accent/10 px-3 py-1 rounded-full mb-6">
        Innova Archviz
      </span>

      <h1 className="font-display text-5xl leading-[1.1] text-white mb-4">
        Tu hogar,<br />
        <em className="text-accent not-italic">antes de construirlo.</em>
      </h1>

      <p className="text-muted text-sm leading-relaxed mb-8">
        Visualiza tu futura casa en tamaño real sobre cualquier terreno
        con Realidad Aumentada.
      </p>

      {/* Instrucciones */}
      <div className="bg-card border border-white/10 rounded-2xl p-5 mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
          ¿Cómo funciona?
        </p>
        <ol className="flex flex-col gap-3">
          {[
            'Busca una superficie plana',
            'Mueve lentamente tu cámara para escanear',
            'Toca para colocar el modelo',
          ].map((step, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted">
              <span className="font-display text-accent text-lg min-w-[28px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <Button variant="primary" onClick={onStart} className="w-full">
        Explorar modelos <ArrowRight />
      </Button>

      <p className="text-xs text-muted mt-4 text-center">Requiere acceso a la cámara</p>
    </div>
  )
}