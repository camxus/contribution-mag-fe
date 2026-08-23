'use client'

import { MagazineList } from '@/components/collection-list'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'
import { magazines } from '@/lib/content'
import { useMagazines } from '@/hooks/use-content-query'

export default function MagazinesPage() {
  const query = useMagazines()
  const items = query.data || magazines
  return <main className="contribution-site"><SiteHeader /><section className="collection-page"><p className="eyebrow">Contribution Magazine · Print editions</p><h1>Magazines</h1><p className="collection-intro">Printed issues for people paying attention, collecting essays, portraits, and field notes.</p>{query.isLoading ? <p>Loading issues…</p> : <MagazineList items={items} />}</section><SiteFooter /></main>
}
