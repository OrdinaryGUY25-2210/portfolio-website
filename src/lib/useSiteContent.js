import { useEffect, useState, useCallback } from 'react'
import { supabase, supabaseConfigured } from './supabaseClient'
import {
  defaultContent,
  defaultPortfolioItems,
  defaultTestimonials,
  defaultAchievements,
  defaultCustomSections,
  defaultCustomPages,
} from './defaultContent'

// Loads every editable table into one place: `site_content` (merged into an
// object keyed by section id), portfolio_items, testimonials, achievements,
// and the developer-added custom_sections / custom_pages. Falls back to
// defaultContent so the public site always renders, even before Supabase
// is configured or before any rows exist yet.
export function useSiteContent() {
  const [content, setContent] = useState(defaultContent)
  const [portfolio, setPortfolio] = useState(defaultPortfolioItems)
  const [testimonials, setTestimonials] = useState(defaultTestimonials)
  const [achievements, setAchievements] = useState(defaultAchievements)
  const [customSections, setCustomSections] = useState(defaultCustomSections)
  const [customPages, setCustomPages] = useState(defaultCustomPages)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    if (!supabaseConfigured) {
      setLoading(false)
      return
    }
    setLoading(true)

    const [contentRes, portfolioRes, testimonialsRes, achievementsRes, sectionsRes, pagesRes] = await Promise.all([
      supabase.from('site_content').select('section, data'),
      supabase.from('portfolio_items').select('*').order('sort_order', { ascending: true }),
      supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
      supabase.from('achievements').select('*').order('sort_order', { ascending: true }),
      supabase.from('custom_sections').select('*').order('sort_order', { ascending: true }),
      supabase.from('custom_pages').select('*').order('sort_order', { ascending: true }),
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
    if (!achievementsRes.error && achievementsRes.data) {
      setAchievements(achievementsRes.data.length ? achievementsRes.data : defaultAchievements)
    }
    if (!sectionsRes.error && sectionsRes.data) {
      setCustomSections(sectionsRes.data)
    }
    if (!pagesRes.error && pagesRes.data) {
      setCustomPages(pagesRes.data)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { content, portfolio, testimonials, achievements, customSections, customPages, loading, reload }
}
