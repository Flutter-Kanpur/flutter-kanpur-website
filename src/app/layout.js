import { Encode_Sans_Semi_Expanded } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

const encodeSansSemiExpanded = Encode_Sans_Semi_Expanded({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={encodeSansSemiExpanded.className}>
      <body
        style={{
          background: `
            radial-gradient(circle at 50% 45%, rgba(63, 209, 255, 0.15) 0%, rgba(63, 209, 255, 0.05) 25%, transparent 50%),
            radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)
          `,
          minHeight: "100vh",
          margin: 0,
          color: "#e3f6ff",
          paddingLeft: "58px",
          paddingRight: "58px",
          paddingTop: "35px",
        }}
      >
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}