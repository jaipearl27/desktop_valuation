import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  // {
  //   id: 2,
  //   title: "About",
  //   path: "/about",
  //   newTab: false,
  // },
  {
    id: 3,
    title: "Support",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Blogs",
    dropdown: [
      {
        title: "Real estate market value",
        path: "/blog/real-estate-market-value",
      },
      {
        title: "Quick property valuation online",
        path: "/blog/quick-property-valuation-online",
      },
      {
        title: "Automated valuation model india",
        path: "/blog/automated-valuation-model-india",
      },
      {
        title: "Real estate valuation calculator",
        path: "/blog/real-estate-valuation-calculator",
      },
      {
        title: "Real Estate Market Value",
        path: "/blog/real-estate-market-value",
      },
      {
        title: "Commercial Real Estate Valuation Calculator",
        path: "/blog/commercial-real-estate-valuation-calculator",
      },
      {
        title: "Real Estate Valuation Tools",
        path: "/blog/real-estate-valuation-tools",
      },

      {
        title: "5 Mistakes to Avoid When Relying on Desktop Valuations",
        path: "/blog/5-Mistakes-to-Avoid-When-Relying-on-Desktop-Valuations"
      },
      {
        title: "Desktop Valuation of Commercial Properties: Is It Accurate?",
        path: "/blog/desktop-valuation-of-commercial-properties-is-it-accurate"
      },
      {
        title: "Desktop Valuation vs Full Property Valuation: Key Differences",
        path: "/blog/desktop-valuation-vs-full-property-valuation-key-differences"
      },
      {
        title: "How AI and Big Data Are Revolutionizing Desktop Valuations",
        path: "/blog/how-ai-and-big-data-are-revolutionizing-desktop-valuations"
      },
      {
        title: "How Banks and Lenders Utilize Desktop Valuations for Mortgage Approvals?</",
        path: "/blog/how-banks-and-lenders-utilize-desktop-valuations-for-mortgage-app"
      },

      {
        title: "Simplifying Property Appraisals with a Commercial Real Estate Valuation Calculator",
        path: "/blog/simplifying-property-appraisals-with-a-commercial-real-estate-val"
      },


      {
        title: "The Increasing Trend of Desktop Valuations in 2025",
        path: "/blog/the-increasing-trend-of-desktop-valuations-in-2025"
      },

      {
        title: "The Role of Desktop Valuation in Real Estate Investment",
        path: "/blog/the-role-of-desktop-valuation-in-real-estate-investment"
      },

      {
        title: "What Information is Used in a Desktop Valuation?",
        path: "/blog/what-information-is-used-in-a-desktop-valuation"
      },


    ],
    newTab: false,
  },

  {
    id: 5,
    title: "Services",
    dropdown: [
      {
        title: "Real estate valuation india",
        path: "/services/real-estate-valuation-india",
      },
      {
        title: "Property valuation report india",
        path: "/services/property-valuation-report-india",
      },
      {
        title: "Property Appraisal Services",
        path: "/services/property-appraisal-services"
      }
    ],
    newTab: false,
  },
];
export default menuData;
