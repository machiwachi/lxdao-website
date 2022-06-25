import { useEffect } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { ParallaxProvider } from 'react-scroll-parallax';

import getTheme from '@/common/theme';
import { activatei18n } from '../i18n';

import '@/common/global.css';

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
    <I18nProvider i18n={i18n}>
      <ParallaxProvider>
        <Component {...pageProps} />
      </ParallaxProvider>
    </I18nProvider>
  );
}

export default MyApp;
