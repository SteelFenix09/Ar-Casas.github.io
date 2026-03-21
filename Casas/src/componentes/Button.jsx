// Botón reutilizable — acepta variantes: 'primary' | 'ghost' | 'icon'

export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  title,
}) {
  const base =
    'flex items-center justify-center gap-2 font-sans font-semibold transition-all duration-300 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-accent text-dark px-6 py-4 rounded-full text-base shadow-[0_4px_24px_rgba(200,169,110,.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,169,110,.4)]',
    ghost:
      'bg-card border border-white/10 text-white px-5 py-3 rounded-full text-sm hover:bg-white/10',
    icon:
      'bg-card border border-white/10 text-white w-10 h-10 rounded-full hover:bg-white/10',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      title={title}
    >
      {children}
    </button>
  )
}