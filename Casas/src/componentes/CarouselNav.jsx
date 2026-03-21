import Button from './Button'

// Flechas de navegación + dots indicadores.
// Se reutiliza fácilmente en cualquier carrusel futuro.

const ChevronLeft  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M15 18l-6-6 6-6"/></svg>
const ChevronRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M9 18l6-6-6-6"/></svg>

export default function CarouselNav({ total, current, onPrev, onNext, onDot }) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="icon" onClick={onPrev} disabled={current === 0} title="Anterior">
        <ChevronLeft />
      </Button>

      {/* Dots */}
      <div className="flex gap-2 flex-1 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            aria-label={`Ir al modelo ${i + 1}`}
            style={{ width: i === current ? '20px' : '7px' }}
            className={`h-[7px] rounded-full border-none cursor-pointer transition-all duration-300
              ${i === current ? 'bg-accent' : 'bg-muted'}`}
          />
        ))}
      </div>

      <Button variant="icon" onClick={onNext} disabled={current === total - 1} title="Siguiente">
        <ChevronRight />
      </Button>
    </div>
  )
}