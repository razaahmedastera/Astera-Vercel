"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageContentBySlug = getPageContentBySlug;
exports.getPageContentById = getPageContentById;
exports.getHomePageContent = getHomePageContent;
exports.getAllPages = getAllPages;
exports.getProductPageContent = getProductPageContent;
const client_1 = require("./client");
const BLOG_PLACEHOLDER_COVER = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80';
function mapBlogCategory(entry) {
    var _a;
    if (!((_a = entry === null || entry === void 0 ? void 0 : entry.sys) === null || _a === void 0 ? void 0 : _a.id))
        return null;
    const fields = entry.fields || {};
    return {
        id: entry.sys.id,
        title: fields.name || 'General',
        slug: fields.slug || 'general',
    };
}
function mapBlogAuthor(entry) {
    var _a, _b, _c, _d;
    if (!((_a = entry === null || entry === void 0 ? void 0 : entry.sys) === null || _a === void 0 ? void 0 : _a.id))
        return undefined;
    const fields = entry.fields || {};
    const avatar = ((_d = (_c = (_b = fields.avatar) === null || _b === void 0 ? void 0 : _b.fields) === null || _c === void 0 ? void 0 : _c.file) === null || _d === void 0 ? void 0 : _d.url)
        ? `https:${fields.avatar.fields.file.url}`
        : undefined;
    return {
        id: entry.sys.id,
        name: fields.name || 'Astera Team',
        role: fields.role || '',
        bio: fields.bio || '',
        avatar,
    };
}
function mapBlogPost(entry) {
    var _a, _b, _c;
    const fields = entry.fields || {};
    const cover = ((_c = (_b = (_a = fields.featuredImage) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.url)
        ? `https:${fields.featuredImage.fields.file.url}`
        : BLOG_PLACEHOLDER_COVER;
    const category = mapBlogCategory(fields.category);
    const author = mapBlogAuthor(fields.author);
    return {
        id: entry.sys.id,
        title: fields.title || 'Untitled post',
        slug: fields.slug || entry.sys.id,
        excerpt: fields.excerpt || '',
        content: fields.content,
        featuredImage: cover,
        coverImage: cover,
        category: category || {
            id: 'general',
            title: 'General',
            slug: 'general',
        },
        author,
        tags: fields.tags || [],
        publishedAt: fields.publishedAt || entry.sys.createdAt,
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
        authorName: (author === null || author === void 0 ? void 0 : author.name) || 'Astera Team',
    };
}
/**
 * Fetch a page content entry by slug (more scalable than entry ID)
 * @param slug - The page slug (e.g., 'home', 'about', 'contact')
 * @returns Parsed page content
 */
async function getPageContentBySlug(slug) {
    try {
        const response = await client_1.contentfulClient.getEntries({
            content_type: 'pageContent',
            'fields.slug': slug,
            limit: 1,
        });
        if (response.items.length === 0) {
            throw new Error(`Page with slug "${slug}" not found`);
        }
        const entry = response.items[0];
        return {
            id: entry.sys.id,
            title: entry.fields.title,
            slug: entry.fields.slug,
            body: entry.fields.body,
            randomText: entry.fields.randomText,
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
        };
    }
    catch (error) {
        console.error(`Error fetching page with slug "${slug}":`, error);
        throw new Error(`Failed to fetch page with slug "${slug}"`);
    }
}
/**
 * Fetch a page content entry by ID (kept for backward compatibility)
 * @param entryId - The Contentful entry ID
 * @returns Parsed page content
 */
async function getPageContentById(entryId) {
    try {
        const entry = await client_1.contentfulClient.getEntry(entryId);
        return {
            id: entry.sys.id,
            title: entry.fields.title,
            slug: entry.fields.slug,
            body: entry.fields.body,
            randomText: entry.fields.randomText,
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
        };
    }
    catch (error) {
        console.error('Error fetching content from Contentful:', error);
        throw new Error('Failed to fetch content from Contentful');
    }
}
/**
 * Fetch home page content from homePage content type
 * @returns Home page content with all sections
 */
async function getHomePageContent() {
    try {
        const response = await client_1.contentfulClient.getEntries({
            content_type: 'homePage',
            'fields.slug': 'home',
            limit: 1,
        });
        if (response.items.length === 0) {
            throw new Error('Home page content not found');
        }
        const entry = response.items[0];
        const fields = entry.fields;
        return {
            id: entry.sys.id,
            entryTitle: fields.entryTitle,
            slug: fields.slug,
            // Hero Section
            heroSectionBadge: fields.heroSectionBadge,
            heroSectionHeading: fields.heroSectionHeading,
            heroSectionDescription: fields.heroSectionDescription,
            heroSectionPrimaryCta: fields.heroSectionPrimaryCta,
            heroSectionSecondaryCta: fields.heroSectionSecondaryCta,
            // Features Section
            featuresSectionTitle: fields.featuresSectionTitle,
            featuresSectionDescription: fields.featuresSectionDescription,
            features: fields.features || [],
            // Steps Section
            stepsSectionTitle: fields.stepsSectionTitle,
            stepsSectionDescription: fields.stepsSectionDescription,
            steps: fields.steps || [],
            // Use Cases Section
            useCasesSectionTitle: fields.useCasesSectionTitle,
            useCasesSectionDescription: fields.useCasesSectionDescription,
            useCases: fields.useCases || [],
            // CTA Section
            ctaSectionTitle: fields.ctaSectionTitle,
            ctaSectionDescription: fields.ctaSectionDescription,
            ctaSectionPrimaryCta: fields.ctaSectionPrimaryCta,
            ctaSectionSecondaryCta: fields.ctaSectionSecondaryCta,
            ctaSectionNote: fields.ctaSectionNote,
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
        };
    }
    catch (error) {
        console.error('Error fetching home page content from Contentful:', error);
        throw new Error('Failed to fetch home page content from Contentful');
    }
}
/**
 * Fetch all pages (useful for navigation, sitemap, etc.)
 * @returns Array of all page content
 */
async function getAllPages() {
    try {
        const response = await client_1.contentfulClient.getEntries({
            content_type: 'pageContent',
            order: ['-sys.createdAt'],
        });
        return response.items.map((entry) => ({
            id: entry.sys.id,
            title: entry.fields.title,
            slug: entry.fields.slug,
            body: entry.fields.body,
            randomText: entry.fields.randomText,
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
        }));
    }
    catch (error) {
        console.error('Error fetching all pages:', error);
        throw new Error('Failed to fetch all pages');
    }
}
/**
 * Fetch product page content from productPage content type
 * @returns Product page content with all sections
 */
async function getProductPageContent() {
    try {
        const response = await client_1.contentfulClient.getEntries({
            content_type: 'productPage',
            'fields.slug': 'product',
            limit: 1,
        });
        if (response.items.length === 0) {
            throw new Error('Product page content not found');
        }
        const entry = response.items[0];
        const fields = entry.fields;
        return {
            id: entry.sys.id,
            entryTitle: fields.entryTitle,
            slug: fields.slug,
            // Hero Section
            heroSectionBadge: fields.heroSectionBadge,
            heroSectionHeading: fields.heroSectionHeading,
            heroSectionDescription: fields.heroSectionDescription,
            heroSectionPrimaryCta: fields.heroSectionPrimaryCta,
            heroSectionSecondaryCta: fields.heroSectionSecondaryCta,
            // Products Section
            productsSectionTitle: fields.productsSectionTitle,
            productsSectionDescription: fields.productsSectionDescription,
            products: fields.products || [],
            // Product Features Section
            productFeaturesSectionTitle: fields.productFeaturesSectionTitle,
            productFeaturesSectionDescription: fields.productFeaturesSectionDescription,
            productFeatures: fields.productFeatures || [],
            // CTA Section
            ctaSectionTitle: fields.ctaSectionTitle,
            ctaSectionDescription: fields.ctaSectionDescription,
            ctaSectionPrimaryCta: fields.ctaSectionPrimaryCta,
            ctaSectionSecondaryCta: fields.ctaSectionSecondaryCta,
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
        };
    }
    catch (error) {
        console.error('Error fetching product page content from Contentful:', error);
        throw new Error('Failed to fetch product page content from Contentful');
    }
}
