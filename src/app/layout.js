import './globals.css';
import { Encode_Sans } from 'next/font/google';
import localFont from "next/font/local";
import ThemeRegistry from '@/components/ThemeRegistry';
import { NavbarProvider } from '@/contexts/NavbarContext';
import NavbarComponent from '@/components/navbar/navbar';

import LayoutBackground from '@/components/LayoutBackground';
import MobileBottomNav from '@/components/navbar/MobileNavBar';

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

const returnHeight = (page) => {
  switch (page) {
    case '/':
      return 'radial-gradient(circle at 50% 8%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/members':
      return 'radial-gradient(circle at 50% 15%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/blog2':
      return 'radial-gradient(circle at 50% 32%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 29%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/communityPage':
      return 'radial-gradient(circle at 50% 30%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 29%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/events':
      return 'radial-gradient(circle at 50% 26%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 25%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)';
    default:
      return "auto";
  }
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={productSans.variable}>
      <body
        className={productSans.className}
        style={{
          position: "relative",
          minHeight: "100vh",
        }}

      >
        <ThemeRegistry>
          {/* <NavbarProvider> */}
          {/*<MobileRedirect/>*/}
          <LayoutBackground>
            {/* <NavbarComponent /> */}
            {children}
            <MobileBottomNav />
          </LayoutBackground>
          {/* </NavbarProvider> */}
        </ThemeRegistry>
      </body>
    </html>
  );
}
