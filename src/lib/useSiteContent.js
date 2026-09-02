import { useEffect, useState, useCallback } from 'react'
import { supabase, supabaseConfigured } from './supabaseClient'
import { defaultContent, defaultPortfolioItems, defaultTestimonials } from './defaultContent'

// Loads every `site_content` row into one object keyed by section id, plus
// `portfolio_items` and `testimonials` tables. Falls back to defaultContent
// so the public site always renders, even before Supabase is configured.
export function useSiteContent() {
  const [content, setContent] = useState(defaultContent)
  const [portfolio, setPortfolio] = useState(defaultPortfolioItems)
  const [testimonials, setTestimonials] = useState(defaultTestimonials)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    if (!supabaseConfigured) {
      setLoading(false)
      return
    }
    setLoading(true)

    const [contentRes, portfolioRes, testimonialsRes] = await Promise.all([
      supabase.from('site_content').select('section, data'),
      supabase.from('portfolio_items').select('*').order('sort_order', { ascending: true }),
      supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
    ])

    if (!contentRes.error && contentRes.data?.length) {
      const merged = { ...defaultContent }
      for (const row of contentRes.data) {
        if (row.section && row.data) merged[row.section] = row.data
      }
      setContent(merged)
    }

    if (!portfolioRes.error && portfolioRes.data) {
      setPortfolio(portfolioRes.data.length ? portfolioRes.data : defaultPortfolioItems)
    }

    if (!testimonialsRes.error && testimonialsRes.data) {
      setTestimonials(testimonialsRes.data.length ? testimonialsRes.data : defaultTestimonials)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { content, portfolio, testimonials, loading, reload }
}
