import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { Img3Provider } from '@lxdao/img3';

import getTheme from '@/common/theme';
import { AlertProvider } from '@/context/AlertContext';
import { wagmiClient, chains } from '@/components/ConnectWallet';
import AlertPopup from '@/components/AlertPopup';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '@/common/style.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <Img3Provider
        defaultGateways={[
          'https://nftstorage.link/ipfs/',
          'https://ipfs-gateway.cloud/ipfs/',
          'https://gateway.pinata.cloud/ipfs/',
        ]}
      >
        <AlertProvider>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              theme={lightTheme({
                borderRadius: 'small',
                accentColor: 'linear-gradient(90deg, #305FE8 0%, #3AD9E3 100%)',
              })}
              chains={chains}
            >
              <Component {...pageProps} />
              <AlertPopup />
            </RainbowKitProvider>
          </WagmiConfig>
        </AlertProvider>
      </Img3Provider>
    </ThemeProvider>
  );
}

export default MyApp;
