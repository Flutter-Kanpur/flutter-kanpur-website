import { Encode_Sans } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import { NavbarProvider } from '@/contexts/NavbarContext';
import NavbarComponent from '@/components/navbar/navbar';

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
          margin: 0,
          background: `
          radial-gradient(circle at 50% 8%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)
        `,
          // radial-gradient(circle at 50% 8%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)
          //   width: "100%"
        }}
      >
        <ThemeRegistry>
          <NavbarProvider>
            <NavbarComponent />
            {children}
          </NavbarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}