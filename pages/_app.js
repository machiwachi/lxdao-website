import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import getTheme from '@/common/theme';

import '@/common/global.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
