import React from 'react';
import Head from 'next/head';
import { t } from '@lingui/macro';

import DemoSection from '../sections/DemoSection';

export default function Home() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        {/* <link rel="icon" href="/favicon.png" /> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>LXDAO</title>
        <meta name="description" content="TODO LXDAO description" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content="/banner.png" /> */}
        <meta property="og:title" content="TODO LXDAO" />
        <meta property="og:description" content="TODO LXDAO" />
        <meta property="og:url" content="TODO" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <DemoSection />
    </div>
  );
}
