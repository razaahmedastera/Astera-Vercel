"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentfulClient = void 0;
const contentful_1 = require("contentful");
if (!process.env.CONTENTFUL_SPACE_ID) {
    throw new Error('CONTENTFUL_SPACE_ID is not defined in environment variables');
}
if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined in environment variables');
}
/**
 * Contentful client instance
 * Configured with environment variables
 */
exports.contentfulClient = (0, contentful_1.createClient)({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
