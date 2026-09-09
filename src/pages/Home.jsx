import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CornerMark from '../components/CornerMark'
import { HomeSkeleton } from '../components/PageSkeleton'
import Hero from '../sections/Hero'
import Achievements from '../sections/Achievements'
import Stats from '../sections/Stats'
import Portfolio from '../sections/Portfolio'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'
import About from '../sections/About'
import Contact from '../sections/Contact'
import CustomSections from '../sections/CustomSections'

// Pure portfolio, no sales funnel: lead with who you are, prove it with
// achievements, then the work itself and the purpose behind each piece.
// No pricing tiers, no "how we work" payment steps, no FAQ about hiring.
//
// While `site.loading` is true (first fetch from Supabase), a skeleton is
// shown instead of the default seed content — avoids a flash of placeholder
// text/images that then gets replaced the moment real data arrives.
export default function Home({ site }) {
  const { content, portfolio, testimonials, achievements, customSections, customPages, loading } = site

  return (
    <AnimatePresence mode="wait" initial={false}>
      {loading ? (
        <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <HomeSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen bg-ink text-cream"
        >
          <Navbar customPages={customPages} drawerSide={content.theme?.drawerSide} />
          <main>
            <Hero data={content.hero} />
            <Achievements items={achievements} />
            <Stats data={content.stats} />
            <Portfolio items={portfolio} />
            <Services data={content.services} />
            <About data={content.about} />
            <Testimonials items={testimonials} />
            <Contact data={content.contact} />
            <CustomSections items={customSections} />
          </main>
          <Footer data={content.footer} />
          <CornerMark />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
