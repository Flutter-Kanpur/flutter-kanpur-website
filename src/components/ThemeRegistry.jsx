'use client';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '@/theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/createEmotionCache';

// Client-side cache, shared for the whole session
const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({ children }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
