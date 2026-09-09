// Subtle layered blobs + faint grid — dropped behind sections that would
// otherwise be flat bg-ink with little visual weight (Stats, Testimonials,
// Contact). Purely decorative: aria-hidden, pointer-events none, and sits
// behind content via negative z-index inside a `relative` section.
export default function AbstractBackground({ variant = 'a' }) {
  const flipped = variant === 'b'
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[110px] ${
          flipped ? 'right-[-8rem] top-[-6rem]' : 'left-[-8rem] top-[-8rem]'
        }`}
      />
      <div
        className={`absolute h-[22rem] w-[22rem] rounded-full bg-gold-light/[0.06] blur-[100px] ${
          flipped ? 'bottom-[-7rem] left-[-6rem]' : 'bottom-[-8rem] right-[-6rem]'
        }`}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${variant}`} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--color-cream)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
      </svg>
    </div>
  )
}
