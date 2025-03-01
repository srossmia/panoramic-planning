// src/components/Insights/InsightsGrid.tsx

'use client';

import React, { useState } from 'react';
import {
  SimplifiedEvent,
  SimplifiedArticle,
  SimplifiedPartnerResources,
} from '@/lib/contentful';
import SearchBar from '@/components/ui/SearchBar';
import { getDescriptionAsString } from '@/lib/textHelpers';
import InsightCard from '@/components/Insights/InsightsCard';

type Category = 'all' | 'articles' | 'events' | 'partner-resources';

interface InsightsGridProps {
  events: SimplifiedEvent[];
  partnerResources: SimplifiedPartnerResources[];
  articles: SimplifiedArticle[];
}

export default function InsightsGrid({
  events,
  partnerResources,
  articles,
}: InsightsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const categories: Category[] = ['all', 'articles', 'events', 'partner-resources'];

  const allContent = [...articles, ...events, ...partnerResources];

  const filteredContent = allContent.filter((item) => {
    if (activeCategory === 'articles') return item.type === 'article';
    if (activeCategory === 'events') return item.type === 'event';
    if (activeCategory === 'partner-resources') return item.type === 'partnerResources';
    return true;
  });

  const searchFilteredContent = filteredContent.filter((item) => {
    const descStr =
      'description' in item && item.description
        ? getDescriptionAsString(item.description)
        : '';
    const partnerNameStr =
      'partnerName' in item && item.partnerName
        ? item.partnerName.toLowerCase()
        : '';
    const searchLower = searchQuery.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchLower) ||
      descStr.toLowerCase().includes(searchLower) ||
      partnerNameStr.includes(searchLower)
    );
  });

  const sortedContent = searchFilteredContent.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalPages = Math.ceil(sortedContent.length / itemsPerPage);
  const currentItems = sortedContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Insights..."
          />
        </div>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
            >
              {category
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <InsightCard key={item.id} item={item} />
          ))
        ) : (
          <p className="col-span-full text-center">No content available at this time.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </section>
  );
}
