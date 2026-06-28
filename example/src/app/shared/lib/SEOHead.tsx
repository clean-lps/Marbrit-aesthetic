import { Helmet } from "react-helmet-async"

const SITE_NAME = "Marbrit Aesthetic"
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://marbritaesthetic.com"
const DEFAULT_OG_IMAGE = "https://marbritaesthetic.com/18055694ec56b4d9d105947db5edb916.png"

interface SEOHeadProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "product"
  noindex?: boolean
  keywords?: string
  publisher?: string
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex,
  keywords,
  publisher,
}: SEOHeadProps) {
  const fullTitle = title && title !== SITE_NAME && !title.includes(SITE_NAME) ? `${title} | ${SITE_NAME}` : title || SITE_NAME
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="publisher" content={publisher || SITE_NAME} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="article:publisher" content={publisher || SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || DEFAULT_OG_IMAGE} />
    </Helmet>
  )
}
