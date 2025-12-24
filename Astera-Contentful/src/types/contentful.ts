import type { Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

/**
 * Contentful Page Content Type Skeleton
 */
export interface PageContentSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageContent';
  fields: {
    title: string;
    slug: string;
    body: string;
    randomText: Document;
  };
}

export type PageContentEntry = Entry<PageContentSkeleton, undefined, string>;

/**
 * Parsed/simplified version for components
 */
export interface PageContent {
  title: string;
  slug: string;
  body: string;
  randomText: Document;
  id: string;
  createdAt: string;
  updatedAt: string;
}

