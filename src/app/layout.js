import './globals.css';
import { Encode_Sans } from 'next/font/google';
import ThemeRegistry from '@/components/ThemeRegistry';
import { NavbarProvider } from '@/contexts/NavbarContext';
import NavbarComponent from '@/components/navbar/navbar';
import MobileRedirect from '@/components/MobileRedirect';
import LayoutBackground from '@/components/LayoutBackground';

const encodeSans = Encode_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const returnHeight = (page) => {
  switch (page) {
    case '/':
      return 'radial-gradient(circle at 50% 8%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/members':
      return 'radial-gradient(circle at 50% 15%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/bloglisting':
      return 'radial-gradient(circle at 50% 32%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 29%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/communityPage':
      return 'radial-gradient(circle at 50% 30%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 29%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
    case '/events':
      return 'radial-gradient(circle at 50% 26%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 25%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)';
    default:
      return 'auto';
  }
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={encodeSans.className}>
      <body
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <ThemeRegistry>
          <NavbarProvider>
            <MobileRedirect />
            <LayoutBackground>
              <NavbarComponent />
              {children}
            </LayoutBackground>
          </NavbarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}