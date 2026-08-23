'use client'

import { InterviewList } from '@/components/collection-list'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'
import { interviews } from '@/lib/content'
import { useInterviews } from '@/hooks/use-content-query'

export default function InterviewsPage() {
  const query = useInterviews()
  const items = query.data || interviews
  return <main className="contribution-site"><SiteHeader /><section className="collection-page"><p className="eyebrow">Contribution Magazine · Conversations</p><h1>Interviews</h1><p className="collection-intro">Long-form conversations with artists, makers, and people widening the room.</p>{query.isLoading ? <p>Loading interviews…</p> : <InterviewList items={items} />}</section><SiteFooter /></main>
}
