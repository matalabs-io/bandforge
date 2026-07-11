import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "BandForge IELTS",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  parentOrganization: {
    "@type": "Organization",
    name: "MATA Labs",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "BandForge IELTS",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: "MATA Labs",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  name: SITE_NAME,
  alternateName: "BandForge IELTS",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "INR",
    availability: "https://schema.org/PreOrder",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "MATA Labs",
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}
