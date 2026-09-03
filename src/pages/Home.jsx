import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CornerMark from '../components/CornerMark'
import Hero from '../sections/Hero'
import Achievements from '../sections/Achievements'
import Stats from '../sections/Stats'
import Portfolio from '../sections/Portfolio'
import Services from '../sections/Services'
import Pricing from '../sections/Pricing'
import Process from '../sections/Process'
import Testimonials from '../sections/Testimonials'
import About from '../sections/About'
import Contact from '../sections/Contact'
import FAQ from '../sections/FAQ'
import CustomSections from '../sections/CustomSections'

// Order reflects how a portfolio should work: lead with who you are, prove
// it with achievements, then the work itself — before anything sales-y.
export default function Home({ site }) {
  const { content, portfolio, testimonials, achievements, customSections, customPages } = site

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Navbar customPages={customPages} drawerSide={content.theme?.drawerSide} />
      <main>
        <Hero data={content.hero} />
        <Achievements items={achievements} />
        <Stats data={content.stats} />
        <Portfolio items={portfolio} />
        <Services data={content.services} />
        <About data={content.about} />
        <Process data={content.process} />
        <Pricing data={content.pricing} />
        <Testimonials items={testimonials} />
        <Contact data={content.contact} />
        <FAQ data={content.faq} />
        <CustomSections items={customSections} />
      </main>
      <Footer data={content.footer} />
      <CornerMark />
    </div>
  )
}
