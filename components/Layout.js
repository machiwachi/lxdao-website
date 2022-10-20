/* eslint-disable no-undef */
import React from 'react';
import Head from 'next/head';
import { Box, CssBaseline } from '@mui/material';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// eslint-disable-next-line react/prop-types
export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/icons/favicon.png" />
        <title>
          {title ||
            'LXDAO - Bringing together buidlers to buidl and maintain &quot;LX&quot; projects for Web3, in a sustainable manner.'}
        </title>
        <meta
          name="description"
          content="LXDAO is an R&amp;D-focused DAO in Web3.
Our mission: Bringing together buidlers to buidl and maintain LX projects for Web3, in a sustainable manner."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:title" content={title || 'LXDAO Official Website'} />
        <meta
          property="og:description"
          content={
            description ||
            'LXDAO is an R&D-focused DAO in Web3, bringing together buidlers to buidl and maintain "LX" projects for Web3, in a sustainable manner.'
          }
        />
        <meta property="og:url" content="https://lxdao.io/" />
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

      <CssBaseline />
      <Box>
        <Header />
        <Box minHeight={'100vh'}>{children}</Box>
        <Footer />
      </Box>
    </>
  );
}
