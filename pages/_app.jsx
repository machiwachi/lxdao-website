import React from 'react';

import { ThemeProvider } from '@mui/material/styles';

import AlertPopup from '@/components/AlertPopup';
import { wagmiConfig } from '@/components/ConnectWallet';

import { WagmiProvider } from 'wagmi';

import '@/common/style.css';
import getTheme from '@/common/theme';
import { AlertProvider } from '@/context/AlertContext';

import { Img3Provider } from '@lxdao/img3';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// eslint-disable-next-line react/prop-types

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <Img3Provider
        defaultGateways={['https://lxdaoipfs.4everland.link/ipfs/']}
      >
        <AlertProvider>
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider
                theme={lightTheme({
                  borderRadius: 'small',
                  accentColor:
                    'linear-gradient(90deg, #305FE8 0%, #3AD9E3 100%)',
                })}
              >
                <Component {...pageProps} />
                <AlertPopup />
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </AlertProvider>
      </Img3Provider>
    </ThemeProvider>
  );
}

export default MyApp;
