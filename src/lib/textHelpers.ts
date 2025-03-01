// src/lib/textHelpers.ts

import { Document, Block, Inline } from '@contentful/rich-text-types';

export function extractPlainTextFromDocument(doc: Document): string {
  if (!doc || !doc.content) return '';

  return doc.content
    .map((node: Block | Inline) => {
      if ('content' in node && Array.isArray(node.content)) {
        const firstChild = node.content[0];
        if (firstChild && 'value' in firstChild && typeof firstChild.value === 'string') {
          return firstChild.value;
        }
      }
      return '';
    })
    .join(' ');
}

export function getDescriptionAsString(desc: string | Document | undefined): string {
  if (!desc) return '';
  if (typeof desc === 'string') return desc;
  return extractPlainTextFromDocument(desc);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
