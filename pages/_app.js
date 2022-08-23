import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import getTheme from '@/common/theme';
import { wagmiClient, chains } from '@/components/ConnectWallet';

import '@/common/global.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={lightTheme({
            borderRadius: 'medium',
            accentColor: 'linear-gradient(90deg, #305FE8 0%, #3AD9E3 100%)',
          })}
          chains={chains}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default MyApp;
