import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import Services from '../sections/Services'
import Pricing from '../sections/Pricing'
import Process from '../sections/Process'
import Portfolio from '../sections/Portfolio'
import Testimonials from '../sections/Testimonials'
import About from '../sections/About'
import Contact from '../sections/Contact'
import FAQ from '../sections/FAQ'
import { useSiteContent } from '../lib/useSiteContent'

export default function Home() {
  const { content, portfolio, testimonials } = useSiteContent()

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Navbar />
      <main>
        <Hero data={content.hero} />
        <Stats data={content.stats} />
        <Services data={content.services} />
        <Pricing data={content.pricing} />
        <Process data={content.process} />
        <Portfolio items={portfolio} />
        <Testimonials items={testimonials} />
        <About data={content.about} />
        <Contact data={content.contact} />
        <FAQ data={content.faq} />
      </main>
      <Footer data={content.footer} />
    </div>
  )
}
