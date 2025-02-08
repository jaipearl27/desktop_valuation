import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
// import Testimonials from "@/components/Testimonials";
// import Video from "@/components/Video";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Desktop Valuation Services | Instant Online Property Valuation",
  description:
    "Calculate property value instantly with our online property valuation tool. Access accurate, data-driven estimates for residential, commercial, and industrial properties.",
  authors: [{ name: "Desktop Valuation" }],
  publisher: "Desktop Valuation",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://desktopvaluation.in/",
  },
  openGraph: {
    type: "website",
    title: "Desktop Valuation Services | Instant Online Property Valuation",
    description:
      "Calculate property value instantly with our online property valuation tool. Access accurate, data-driven estimates for residential, commercial, and industrial properties.",
    url: "https://desktopvaluation.in/",
  },
};

export default function Home() {
  return (
    <>
      <main>
        {/* JSON-LD Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Desktop Valuation",
              alternateName:
                "Desktop Valuation Services | Instant Online Property Valuation",
              description:
                "Calculate property value instantly with our online property valuation tool. Access accurate, data-driven estimates for residential, commercial, and industrial properties.",
              url: "https://desktopvaluation.in/",
              logo: "https://desktopvaluation.in/images/logo/desktopValuation.svg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9687557070",
                email: "contactus@desktopvaluation.in",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["en", "Hindi"],
              },
            }),
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              name: "Desktop Valuation",
              url: "https://desktopvaluation.in/",
              potentialAction: {
                "@type": "SearchAction",
                target: "{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        ></script>

        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "pu59tx7dp7");`,
          }}
        />
      </main>
      <ScrollUp />
      <Hero />
      <Features />
      {/* <Video /> */}
      {/* <Brands /> */}
      <AboutSectionOne />
      <HowItWorks />
      <AboutSectionTwo />
      {/* <Testimonials /> */}
      <Pricing />
      <Contact />
    </>
  );
}
