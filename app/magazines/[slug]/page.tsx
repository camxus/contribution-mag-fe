'use client'

import { useParams } from 'next/navigation'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'
import { MotionArticle, MotionImage } from '@/components/motion'
import { ContrastText } from '@/components/contrast-text'
import { imageAlt, magazines, safeSlug } from '@/lib/content'
import { useMagazine } from '@/hooks/use-content-query'

export default function MagazinePage() {
  const { slug } = useParams<{ slug: string }>()
  const query = useMagazine(safeSlug(slug))
  const magazine = query.data || magazines.find((item) => item.slug === safeSlug(slug))
  if (query.isLoading && !magazine) return <main className="contribution-site"><SiteHeader /><p className="detail-page">Loading issue…</p><SiteFooter /></main>
  if (!magazine) return null
  return <main className="contribution-site"><SiteHeader /><MotionArticle className="detail-page magazine-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .85 }}><p className="eyebrow">{magazine.issue} · Print edition</p><div className="magazine-detail-grid"><MotionImage className="detail-image"><img src={magazine.image} alt={imageAlt(magazine.title)} /></MotionImage><div><ContrastText src={magazine.image}><h1>{magazine.title}</h1><p className="detail-dek">{magazine.description}</p><p className="price">{magazine.price}</p></ContrastText>{magazine.soldOut ? <p className="sold-out">Sold Out</p> : <a className="button-link" href={magazine.stripeBuyLinkPrint || magazine.stripeBuyLinkDigital || process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || '#'} target="_blank" rel="noopener noreferrer">Buy now</a>}<p className="detail-note">Mock product page powered by editorial data.</p></div></div></MotionArticle><SiteFooter /></main>
}
