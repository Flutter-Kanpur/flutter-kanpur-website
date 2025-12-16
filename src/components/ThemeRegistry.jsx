// 'use client';

// import { ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import theme from '@/theme';
// import { CacheProvider } from '@emotion/react';
// import createEmotionCache from '@/createEmotionCache';

// // Client-side cache, shared for the whole session
// const clientSideEmotionCache = createEmotionCache();

// export default function ThemeRegistry({ children }) {
//   return (
//     <CacheProvider value={clientSideEmotionCache}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }
'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme'; // your MUI theme

// ✅ Create cache OUTSIDE component (critical)
const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

export default function ThemeRegistry({ children }) {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        {/* ✅ CssBaseline MUST be here */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
