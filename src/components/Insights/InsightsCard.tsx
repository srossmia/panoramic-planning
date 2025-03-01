// src/components/Insights/InsightCard.tsx

'use client';

import React, { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { SimplifiedArticle, SimplifiedEvent, SimplifiedPartnerResources } from '@/lib/contentful';
import { getDescriptionAsString } from '@/lib/textHelpers';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface InsightCardProps {
  item: SimplifiedArticle | SimplifiedEvent | SimplifiedPartnerResources;
}

export default function InsightCard({ item }: InsightCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReadMore = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const title = item.title;
  let description = '';
  if ('description' in item && item.description) {
    description = typeof item.description === 'string' ? item.description : getDescriptionAsString(item.description);
  }

  const isArticle = 'publishDate' in item;
  const isEvent = 'date' in item;
  const isPartnerResource = 'pdfFile' in item;

  let modalContent: React.ReactNode = null;
  if (isArticle) {
    const article = item as SimplifiedArticle;
    const articleContent = article.content ? documentToReactComponents(article.content) : null;
    modalContent = (
      <div className="text-gray-800 space-y-4">
        <h2 className="text-xl font-semibold">{article.title}</h2>
        {article.author && article.publishDate && (
          <p className="text-sm text-gray-600">
            By {article.author} on {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}
        {articleContent || <p>{description}</p>}
        {article.topics && article.topics.length > 0 && (
          <p className="text-sm text-gray-600">
            Topics: {article.topics.join(', ')}
          </p>
        )}
      </div>
    );
  } else if (isEvent) {
    const event = item as SimplifiedEvent;
    const eventContent = event.description ? documentToReactComponents(event.description) : null;
    modalContent = (
      <div className="text-gray-800 space-y-4">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        {event.date && (
          <p className="text-sm text-gray-600">
            Date: {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}
        {event.location && <p>{event.location}</p>}
        {eventContent || <p>{description}</p>}
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Register Here
          </a>
        )}
      </div>
    );
  } else if (isPartnerResource) {
    const partnerResource = item as SimplifiedPartnerResources;
    const prContent = partnerResource.description ? documentToReactComponents(partnerResource.description) : null;
    modalContent = (
      <div className="text-gray-800 space-y-4">
        <h2 className="text-xl font-semibold">{partnerResource.title}</h2>
        {partnerResource.partnerName && (
          <p className="text-sm text-gray-600">By {partnerResource.partnerName}</p>
        )}
        {prContent || <p>{description}</p>}
        {partnerResource.pdfFile && partnerResource.pdfFile.fields?.file?.url && (
          <a
            href={`https:${partnerResource.pdfFile.fields.file.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Download PDF
          </a>
        )}
        {partnerResource.topics && partnerResource.topics.length > 0 && (
          <p className="text-sm text-gray-600">
            Topics: {partnerResource.topics.join(', ')}
          </p>
        )}
        {partnerResource.publishDate && (
          <p className="text-sm text-gray-600">
            Published on {new Date(partnerResource.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}
      </div>
    );
  } else {
    modalContent = (
      <div className="text-gray-800 space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>{description}</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-4 rounded shadow-md w-full max-w-sm flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      {description && <p className="text-gray-800 mb-4 text-left w-full line-clamp-3">{description}</p>}
      {modalContent && (
        <Button variant="secondary" onClick={handleReadMore}>
          Read More
        </Button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}
