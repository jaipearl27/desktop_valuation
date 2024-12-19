import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";
import { UserProvider } from '@/context/UserContext';
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "../components/FloatingWhatsApp/floatingWhatsApp.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head >

<meta name="google-site-verification" content="AMParf1SEeZt2zQCQFnijZeLyNTjMVQMoWcidc3Bx0E" />

        <Script id="my-script" strategy={"beforeInteractive"} src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_YOUR_API_KEY}&libraries=places`}/>

<Script async src="https://www.googletagmanager.com/gtag/js?id=G-3DP27LSJHX"/>
<Script id="google-analytics">
  {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3DP27LSJHX');`}
</Script>

      </head>

      <body className={`bg-[#FCFCFC] ${inter.className}`}>
        <Providers>
         <UserProvider>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <Toaster />
          </UserProvider>
          <FloatingWhatsApp
            phoneNumber="9687557070"
            accountName="Desktop Valuation"
            allowEsc
            notification
            notificationSound
            avatar={"/images/logo/desktopValuation.svg"}
          />
        </Providers>
      </body>
    </html>
  );
}
