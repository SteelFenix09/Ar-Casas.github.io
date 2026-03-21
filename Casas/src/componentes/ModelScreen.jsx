import { useState, useRef } from 'react'
import Button from './Button'
import ModelSlide from './ModelSlite'
import CarouselNav from './CarouselNav'
import MODELS from '../data/models'

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const ArIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
)

export default function ModelScreen({ onBack, onOpenAR }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)

  const goTo = (index) =>
    setCurrent(Math.max(0, Math.min(index, MODELS.length - 1)))

  // Swipe táctil
  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX }
  const handleTouchEnd   = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX
    if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1)
  }

  const model = MODELS[current]

  return (
    <div className="w-full max-w-sm min-h-screen flex flex-col px-4 pt-5 pb-6 mx-auto overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <Button variant="icon" onClick={onBack} title="Volver">
          <ArrowLeft />
        </Button>
        <span className="text-xs font-medium text-muted tracking-wide">
          {current + 1} / {MODELS.length}
        </span>
      </div>

      {/* Carrusel */}
      <div
        className="w-full overflow-hidden rounded-2xl flex-shrink-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track flex"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {MODELS.map((m, i) => (
            <ModelSlide key={m.id} src={m.src} alt={m.name} isActive={i === current} />
          ))}
        </div>
      </div>

      {/* Info del modelo */}
      <div className="flex flex-col gap-4 pt-5 flex-1">
        <div className="min-h-[72px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              {model.badge}
            </span>
          </div>
          <h2 className="font-display text-2xl text-white mb-1 transition-opacity duration-300">
            {model.name}
          </h2>
          <p className="text-sm text-muted leading-relaxed transition-opacity duration-300">
            {model.description}
          </p>
        </div>

        {/* Navegación */}
        <CarouselNav
          total={MODELS.length}
          current={current}
          onPrev={() => goTo(current - 1)}
          onNext={() => goTo(current + 1)}
          onDot={goTo}
        />

        {/* Botón AR */}
        <Button variant="primary" onClick={() => onOpenAR(model)} className="w-full mt-auto">
          <ArIcon /> Ver en AR
        </Button>
      </div>

    </div>
  )
}