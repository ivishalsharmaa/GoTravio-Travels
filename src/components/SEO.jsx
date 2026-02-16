import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaData,
  publishedTime,
  modifiedTime,
  author = 'GoTravio Travels',
  twitterHandle = '@gotravio',
  noindex = false
}) => {
  const siteUrl = 'https://gotravio.com'; // Replace with your actual domain
  const defaultImage = 'https://gotravio.com/og-image.jpg';
  const siteName = 'GoTravio Travels - India\'s Premier Travel Assistance';

  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {author && <meta name="author" content={author} />}
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#4f46e5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Article Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta property="article:author" content={author} />

      {/* Structured Data (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}

      {/* Language and Regional Meta Tags */}
      <meta httpEquiv="content-language" content="en-in" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      
      {/* Verification Meta Tags */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
    </Helmet>
  );
};

export default SEO;