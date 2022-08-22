import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import getTheme from '@/common/theme';
import { wagmiClient, chains } from '@/components/ConnectWallet';
import { activatei18n } from '../i18n';

import '@/common/global.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // const localeLang = localStorage.getItem('locale');
    // const navigatorLang = navigator.language || navigator.userLanguage;
    // const navigatorLanguage = navigatorLang.substr(0, 2);
    // activatei18n(
    //   localeLang ? localeLang : navigatorLanguage === 'zh' ? 'zh' : 'en'
    // );
    // TODO: en by default for now
    activatei18n('en');
  }, []);
  return (
    <ThemeProvider theme={getTheme('light')}>
      <I18nProvider i18n={i18n}>
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
      </I18nProvider>
    </ThemeProvider>
  );
}

export default MyApp;
