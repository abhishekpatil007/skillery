import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  siteName?: string;
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
}

const defaultSEO = {
  title: "Skillery - Learn Skills That Move You Forward",
  description: "Master in-demand skills from industry experts. Learn at your pace, track your growth, and stay ahead with our comprehensive online courses.",
  image: "/og-image.jpg",
  url: "https://skillery.com",
  siteName: "Skillery",
  twitterCard: "summary_large_image" as const,
};

export function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  siteName = defaultSEO.siteName,
  twitterCard = defaultSEO.twitterCard,
  noIndex = false,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title,
    description: description || defaultSEO.description,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    type,
    siteName,
    twitterCard,
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={seo.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6C63FF" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Skillery" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
