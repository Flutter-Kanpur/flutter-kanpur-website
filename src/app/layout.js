'use client';
import { Encode_Sans } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '@/theme';
import './globals.css';
import createEmotionCache from '@/lib/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import '@/lib/firebase/setup.js'; // Ensure Firebase is initialized

const encodeSans = Encode_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={encodeSans.className}>
      <body
        style={{
          position: "relative",
          background: `
            radial-gradient(circle at 50% 45%, rgba(63, 209, 255, 0.15) 0%, rgba(63, 209, 255, 0.05) 25%, transparent 50%),
            radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)
          `,
          minHeight: "100vh",
          margin: 0,
          background: `
          radial-gradient(circle at 50% 40%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.05) 30%, transparent 50%),
          radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)
        `,
          width: "100%"
        }}
      >
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}