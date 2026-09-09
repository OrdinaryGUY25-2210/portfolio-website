// Shown in place of the real page while `site.loading` is true — mirrors
// the actual layout (navbar bar, asymmetric hero text, stats row, portfolio
// grid) with shimmering placeholder blocks, so the swap to real content
// once Supabase responds doesn't read as a layout jump or content "pop-in".

function Bar({ className = '' }) {
  return <div className={`skeleton rounded-full ${className}`} />
}

function Block({ className = '' }) {
  return <div className={`skeleton rounded-2xl ${className}`} />
}

// Full home-page skeleton: navbar + hero + a couple of section rows.
export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-ink text-cream" aria-busy="true" aria-live="polite">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b hairline bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Bar className="h-4 w-28" />
          <div className="hidden items-center gap-8 md:flex">
            <Bar className="h-3 w-14" />
            <Bar className="h-3 w-16" />
            <Bar className="h-3 w-14" />
            <Bar className="h-3 w-16" />
            <Bar className="h-9 w-28 !rounded-full" />
          </div>
        </div>
      </header>

      {/* Hero — bottom-anchored like the real one */}
      <section className="relative flex min-h-screen items-end overflow-hidden border-b hairline px-6 pb-16 pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <Bar className="h-3 w-72 max-w-full" />
          <Block className="mt-6 h-24 w-full max-w-xl md:h-32" />
          <Bar className="mt-6 h-12 w-40 !rounded-full" />
        </div>
      </section>

      {/* Stats row */}
      <section className="border-b hairline px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Bar className="h-3 w-32" />
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Bar className="h-9 w-20" />
                <Bar className="mt-3 h-3 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Bar className="h-3 w-20" />
          <Block className="mt-4 h-10 w-64 max-w-full" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Block key={i} className="aspect-[4/3] w-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Smaller skeleton for a single dynamic (custom) page.
export function DynamicPageSkeleton() {
  return (
    <div className="min-h-screen bg-ink text-cream" aria-busy="true" aria-live="polite">
      <header className="fixed inset-x-0 top-0 z-40 border-b hairline bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Bar className="h-4 w-28" />
        </div>
      </header>
      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <Bar className="h-3 w-24" />
          <Block className="mt-4 h-10 w-full max-w-md" />
          <Block className="mt-8 h-56 w-full" />
          <div className="mt-8 space-y-3">
            <Bar className="h-3 w-full" />
            <Bar className="h-3 w-full" />
            <Bar className="h-3 w-2/3" />
          </div>
        </div>
      </main>
    </div>
  )
}
