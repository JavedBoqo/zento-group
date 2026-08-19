import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Providers from "@/components/Providers";
import { OFFICES, CONTACT_EMAIL, CONTACT_NUMBER } from "@/constants";
import "./globals.css";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zentogroup.co.uk"),
  title: "Zento Care | Nurse-Led Home Care in Edinburgh & Perthshire | Zento",
  description:
    "Compassionate, nurse-led home care provider based in Edinburgh and Crieff, delivering safe, person-centred care across Edinburgh, Lothian, and Perthshire.",
  alternates: {
    canonical: "https://zentogroup.co.uk",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "jtwn42p9wCDqE8vnmhpOeWg-d8b_6ncXKaHnAbqfW7g",
  },
  openGraph: {
    title: "Zento Care | Nurse-Led Home Care in Edinburgh & Perthshire",
    description:
      "Compassionate, nurse-led home care provider based in Edinburgh and Crieff, delivering safe, person-centred care across Edinburgh, Lothian, and Perthshire.",
    url: "https://zentogroup.co.uk",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Care Nurse-Led Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zento Care | Nurse-Led Home Care in Edinburgh & Perthshire",
    description:
      "Compassionate, nurse-led home care provider delivering safe, person-centred care across Edinburgh, Lothian, and Perthshire.",
    images: ["/brand-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["HomeHealthCare", "MedicalBusiness"],
    name: "Zento Care",
    url: "https://zentogroup.co.uk",
    logo: "https://zentogroup.co.uk/logo.svg",
    image: "https://zentogroup.co.uk/brand-image.png",
    description:
      "Registered nurse-led home care provider delivering compassionate, personalized care services across Edinburgh, Lothian, and Perthshire.",
    telephone: CONTACT_NUMBER,
    email: CONTACT_EMAIL,
    priceRange: "££",
    address: OFFICES.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: office.locality,
      postalCode: office.postalCode,
      addressCountry: office.country,
    })),
    areaServed: [
      "City of Edinburgh",
      "East Lothian",
      "Midlothian",
      "West Lothian",
      "Crieff",
      "Comrie",
      "Muthill",
      "Braco",
      "Perthshire",
    ],
  };

  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {recaptchaSiteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="afterInteractive"
          />
        ) : null}

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YP2KYRP25S"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YP2KYRP25S');
          `}
        </Script>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}