import './globals.css';
import { Encode_Sans } from 'next/font/google';
import localFont from "next/font/local";
import ThemeRegistry from '@/components/ThemeRegistry';
import { NavbarProvider } from '@/contexts/NavbarContext';
import NavbarComponent from '@/components/navbar/navbar';

import LayoutBackground from '@/components/LayoutBackground';
import MobileBottomNav from '@/components/navbar/MobileNavBar';
import TopNavbar from '@/v2components/TopNavbar';

const encodeSans = Encode_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const productSans = localFont({
  src: [
    {
      path: "../fonts/ProductSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/ProductSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-product-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={productSans.variable}>
      <body
        className={productSans.className}
        style={{
          overflowX: 'hidden',
          background: "#fafafa"
        }}

      >
        <ThemeRegistry>
          {/* <NavbarProvider> */}
          {/*<MobileRedirect/>*/}
          <LayoutBackground>
            {/* <NavbarComponent /> */}
            <TopNavbar />
            {children}
            <MobileBottomNav />
          </LayoutBackground>
          {/* </NavbarProvider> */}
        </ThemeRegistry>
      </body>
    </html>
  );
}
