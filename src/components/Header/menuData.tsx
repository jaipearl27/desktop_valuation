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
    ],
    newTab: false,
  },
];
export default menuData;
