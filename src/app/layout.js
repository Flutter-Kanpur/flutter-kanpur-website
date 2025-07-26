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
            radial-gradient(circle at 50% 35%, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.02) 180px, transparent 400px),
            radial-gradient(circle at 50% 30%, #0b3d4f 0%, #073042 40%, #0a1922 70%, #050d13 100%)
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
