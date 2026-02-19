# Contentful Use Case Content Model

This document describes the Contentful content model structure for the **Use Case** content type.

## Content Type: `useCase`

### Basic Fields

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `title` | Title | Short text | Yes | Use case title |
| `slug` | Slug | Short text | Yes | URL-friendly identifier (unique) |
| `subtitle` | Subtitle | Short text | No | Subtitle for hero section |
| `heroDescription` | Hero Description | Long text | No | Description text for hero section |
| `heroImage` | Hero Image | Media (Asset) | No | Hero section image |
| `description` | Description | Short text | No | Short description for listing page |
| `icon` | Icon | Short text | No | Icon type identifier (fallback) |
| `iconImage` | Icon Image | Media (Asset) | No | Icon image for listing |
| `category` | Category | Short text | No | Use case category |
| `featured` | Featured | Boolean | No | Mark as featured use case |

### Stats Section

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `stats` | Stats | JSON Object | No | Array of stat objects with `value` and `label` |

**Stats JSON Structure:**
```json
[
  {
    "value": "22%",
    "label": "Reduction in loan cycle completion time"
  },
  {
    "value": "6-to-1",
    "label": "ROI in just 6 months"
  }
]
```

### Benefits

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `benefits` | Benefits | Long text | No | Benefits description text |

### Features Section

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `featuresDescription` | Features Description | Long text | No | Description paragraph above features |
| `features` | Features | JSON Object | No | Array of feature objects |

**Features JSON Structure:**
```json
[
  {
    "title": "Intelligent & Context-Aware Document Capture",
    "description": "Automatically identify and extract data...",
    "icon": "document",
    "iconImage": "<Asset Reference>",
    "image": "<Asset Reference>"
  }
]
```

**Feature Fields:**
- `title` (String, required): Feature title
- `description` (String, required): Feature description
- `icon` (String, optional): Icon type for fallback
- `iconImage` (Asset Reference, optional): Icon image from Contentful
- `image` (Asset Reference, optional): Feature image from Contentful

### How It Works Section

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `howItWorks` | How It Works | JSON Object | No | Array of step objects |

**How It Works JSON Structure:**
```json
[
  {
    "step": 1,
    "title": "Ingest Documents",
    "description": "Upload mortgage documents through multiple channels..."
  }
]
```

### Capabilities Section

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `capabilities` | Capabilities | JSON Object | No | Array of capability objects |

**Capabilities JSON Structure:**
```json
[
  {
    "title": "Intelligent Document Recognition",
    "description": "Automatically identify document types...",
    "icon": "recognition"
  }
]
```

### Integrations

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `integrations` | Integrations | Short text, multiple | No | List of integration names |

### Case Study Section

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `caseStudy` | Case Study | JSON Object | No | Case study object |

**Case Study JSON Structure:**
```json
{
  "quote": "Overall, the project met and surpassed all of its goals...",
  "author": "Harley Hess",
  "company": "Financial Services",
  "link": "#"
}
```

### FAQs Section

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `faqs` | FAQs | JSON Object | No | Array of FAQ objects |

**FAQs JSON Structure:**
```json
[
  {
    "question": "How does AI-powered document processing work?",
    "answer": "Our AI system uses advanced machine learning algorithms..."
  }
]
```

### SEO Fields

| Field ID | Field Name | Type | Required | Description |
|----------|------------|------|----------|-------------|
| `seoTitle` | SEO Title | Short text | No | Meta title for SEO |
| `seoDescription` | SEO Description | Long text | No | Meta description for SEO |
| `seoKeywords` | SEO Keywords | Short text | No | Meta keywords |
| `ogImage` | OG Image | Media (Asset) | No | Open Graph image |

## Contentful Setup Instructions

1. **Create Content Type:**
   - Go to Contentful → Content model
   - Click "Add content type"
   - Name: `Use Case`
   - API Identifier: `useCase`

2. **Add Fields:**
   - Add all fields listed above
   - For JSON fields (stats, features, etc.), use "JSON Object" type
   - For image fields, use "Media" type with "Asset" validation
   - For `slug`, enable "Unique" validation

3. **Field Validations:**
   - `slug`: Required, Unique
   - `title`: Required
   - All other fields are optional

4. **Asset Requirements:**
   - Hero Image: Recommended size 1200x600px
   - Icon Images: Recommended size 64x64px (SVG preferred)
   - Feature Images: Recommended size 600x400px
   - OG Image: Recommended size 1200x630px

## API Functions

The following functions are available in `src/lib/contentful/api.ts`:

- `getAllUseCases()`: Fetches all use cases for listing page
- `getUseCaseBySlug(slug: string)`: Fetches a single use case by slug

Both functions handle asset URL extraction automatically.

## Usage Example

```typescript
import { getAllUseCases, getUseCaseBySlug } from '@/lib/contentful/api';

// Get all use cases for listing
const useCases = await getAllUseCases();

// Get single use case
const useCase = await getUseCaseBySlug('mortgage-data-extraction');
```
