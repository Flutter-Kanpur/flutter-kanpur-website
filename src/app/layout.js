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