// src/lib/contentful.ts

import { createClient, Entry, EntrySkeletonType, Asset, ChainModifiers } from 'contentful'; // Added ChainModifiers
import { TypeArticleSkeleton } from '../types/TypeArticle';
import { TypeEventSkeleton } from '../types/TypeEvent';
import { TypePartnerResourcesSkeleton } from '../types/TypePartnerResources';
import { Document } from '@contentful/rich-text-types';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

type EntryWithFields<TFields extends EntrySkeletonType> = Entry<TFields, undefined, 'en-US'>;

function isAsset(value: unknown): value is Asset {
  return (
    typeof value === 'object' &&
    value !== null &&
    'sys' in value &&
    typeof (value as { sys: unknown }).sys === 'object' &&
    'type' in (value as { sys: { type: unknown } }).sys &&
    (value as { sys: { type: string } }).sys.type === 'Asset' &&
    'fields' in value
  );
}

export interface SimplifiedEvent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: Document;
  location: string;
  registrationLink?: string;
  image?: Asset;
  qrCodeImage?: Asset;
  featured: boolean;
  date: string;
  createdAt: string;
  type: 'event';
}

export interface SimplifiedArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: Document;
  author: string;
  publishDate: string;
  image?: Asset;
  topics?: string[];
  featured: boolean;
  createdAt: string;
  type: 'article';
}

export interface SimplifiedPartnerResources {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: Document;
  partnerName: string;
  topics: string[];
  pdfFile?: Asset<ChainModifiers, string>; // Optional field
  image?: Asset;
  publishDate: string;
  featured: boolean;
  createdAt: string;
  type: 'partnerResources';
}

const mapEventFields = (entry: EntryWithFields<TypeEventSkeleton>): SimplifiedEvent => ({
  id: entry.sys.id,
  title: entry.fields.title,
  slug: entry.fields.slug,
  summary: entry.fields.summary,
  description: entry.fields.description,
  location: entry.fields.location,
  registrationLink: entry.fields.registrationLink,
  image: isAsset(entry.fields.image) ? entry.fields.image : undefined,
  qrCodeImage: isAsset(entry.fields.qrCodeImage) ? entry.fields.qrCodeImage : undefined,
  featured: entry.fields.featured || false,
  date: entry.fields.date,
  createdAt: entry.sys.createdAt,
  type: 'event',
});

const mapArticleFields = (entry: EntryWithFields<TypeArticleSkeleton>): SimplifiedArticle => ({
  id: entry.sys.id,
  title: entry.fields.title,
  slug: entry.fields.slug,
  summary: entry.fields.summary,
  content: entry.fields.content,
  author: entry.fields.author,
  publishDate: entry.fields.publishDate,
  image: isAsset(entry.fields.image) ? entry.fields.image : undefined,
  topics: entry.fields.topics,
  featured: entry.fields.featured || false,
  createdAt: entry.sys.createdAt,
  type: 'article',
});

const mapPartnerResourcesFields = (
  entry: EntryWithFields<TypePartnerResourcesSkeleton>
): SimplifiedPartnerResources => ({
  id: entry.sys.id,
  title: entry.fields.title,
  slug: entry.fields.slug,
  summary: entry.fields.summary,
  description: entry.fields.description,
  partnerName: entry.fields.partnerName,
  topics: entry.fields.topics,
  pdfFile: isAsset(entry.fields.pdfFile) ? entry.fields.pdfFile : undefined,
  image: isAsset(entry.fields.image) ? entry.fields.image : undefined,
  publishDate: entry.fields.publishDate,
  featured: entry.fields.featured || false,
  createdAt: entry.sys.createdAt,
  type: 'partnerResources',
});

export const fetchEvents = async (): Promise<SimplifiedEvent[]> => {
  const entries = await fetchEntries<TypeEventSkeleton>('event');
  return entries.map(mapEventFields);
};

export const fetchArticles = async (): Promise<SimplifiedArticle[]> => {
  const entries = await fetchEntries<TypeArticleSkeleton>('article');
  return entries.map(mapArticleFields);
};

export const fetchPartnerResources = async (): Promise<SimplifiedPartnerResources[]> => {
  const entries = await fetchEntries<TypePartnerResourcesSkeleton>('partnerResources');
  return entries.map(mapPartnerResourcesFields);
};

async function fetchEntries<TEntrySkeleton extends EntrySkeletonType>(
  contentType: string,
  query: Record<string, string | number | boolean | undefined> = {},
  locale: string = 'en-US'
): Promise<EntryWithFields<TEntrySkeleton>[]> {
  const entries = await client.getEntries<TEntrySkeleton>({
    content_type: contentType,
    locale,
    include: 2,
    ...query,
  });
  return entries.items as EntryWithFields<TEntrySkeleton>[];
}
