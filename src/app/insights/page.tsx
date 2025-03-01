// /src/app/insights/page.tsx

import React from 'react';
import InsightsGrid from '@/components/Insights/InsightsGrid';
import { fetchArticles, fetchEvents, fetchPartnerResources } from '@/lib/contentful';

export default async function InsightsPage() {
  const [articles, events, partnerResources] = await Promise.all([
    fetchArticles(),
    fetchEvents(),
    fetchPartnerResources(),
  ]);

  return (
    <section>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Insights</h1>
        <p className="text-lg text-gray-700 max-w-prose mx-auto">
          Discover our latest articles and events. Review the latest thinking from our partners.
        </p>
      </div>
      <div className="my-16">
        <InsightsGrid
          articles={articles}
          events={events}
          partnerResources={partnerResources}
        />
      </div>
    </section>
  );
}
