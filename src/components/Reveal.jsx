import { motion } from 'framer-motion'

// One consistent reveal treatment used everywhere, so motion reads as a
// single deliberate system rather than scattered per-component effects.
// `delay` lets sibling items stagger slightly without each having its own logic.
export default function Reveal({ children, delay = 0, className = '', as = 'div', y = 22 }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}
