import { Helmet } from "react-helmet-async"
import { SEO_CONFIG } from "@/shared/config/seo"

interface SEOHeadProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "product"
  noindex?: boolean
}

const { SITE_NAME, BASE_URL, DEFAULT_OG_IMAGE } = SEO_CONFIG

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || `${BASE_URL}${location.pathname}`} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || `${BASE_URL}${location.pathname}`} />
      <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || DEFAULT_OG_IMAGE} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  )
}

// Structured Data (JSON-LD) helpers

interface ArticleStructuredData {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  authorName: string
  imageUrl: string
}

export function articleJsonLd(data: ArticleStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: { "@type": "Person", name: data.authorName },
    image: data.imageUrl,
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.SITE_NAME,
    },
  }
}

interface OrganizationStructuredData {
  name: string
  url: string
  logo?: string
  sameAs?: string[]
}

export function organizationJsonLd(data: OrganizationStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: data.logo,
    sameAs: data.sameAs,
  }
}

interface FAQStructuredData {
  questions: { question: string; answer: string }[]
}

export function faqJsonLd(data: FAQStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  }
}

interface BreadcrumbStructuredData {
  items: { label: string; url: string }[]
}

export function breadcrumbJsonLd(data: BreadcrumbStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.url,
    })),
  }
}

interface ProductStructuredData {
  name: string
  description: string
  price: string
  currency?: string
  availability?: "InStock" | "OutOfStock" | "PreOrder"
}

export function productJsonLd(data: ProductStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    offers: {
      "@type": "Offer",
      price: data.price,
      priceCurrency: data.currency || "USD",
      availability: `https://schema.org/${data.availability || "InStock"}`,
    },
  }
}

// Usage in a page:
// <SEOHead title="Home" description="..." />
// <script type="application/ld+json">{JSON.stringify(articleJsonLd({...}))}</script>
