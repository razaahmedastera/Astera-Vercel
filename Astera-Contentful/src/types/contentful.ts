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

/**
 * Contentful Home Page Content Type Skeleton
 */
export interface HomePageContentSkeleton extends EntrySkeletonType {
  contentTypeId: 'homePage';
  fields: {
    heroSectionHeading: Document;
    heroSectionParagraph: string;
    slug: string;
  };
}

export type HomePageContentEntry = Entry<HomePageContentSkeleton, undefined, string>;

/**
 * Parsed/simplified version for home page components
 */
export interface HomePageContent {
  heroSectionHeading: Document;
  heroSectionParagraph: string;
  slug: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

