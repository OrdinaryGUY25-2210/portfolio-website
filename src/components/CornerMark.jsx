// A small editorial device that uses the empty corner of the viewport
// instead of leaving it dead space — a vertical rotated label bottom-left.
// Shrinks to a plain dot + short label on small screens so it never
// crowds mobile thumb zones; scales up to full label from md and above.
export default function CornerMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 left-4 z-30 hidden items-center gap-2 text-mute sm:flex md:bottom-8 md:left-6"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
      <span
        className="font-body text-[10px] tracking-[0.25em] md:[writing-mode:vertical-rl] md:text-[11px]"
      >
        STUDIO&nbsp;D13
      </span>
    </div>
  )
}
