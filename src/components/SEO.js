import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "Hina Medical Agencies | Trusted Medicine Wholesaler",
    description = "Leading distributor of generic medicines in Haryana since 1998.",
    keywords = "medicine wholesaler, pharmacy supplier, generic medicines",
    canonicalUrl = window.location.href,
    ogImage = "/logo.png"
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* OpenGraph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEO;