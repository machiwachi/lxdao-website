/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SectionHomepageHero from '@/sections/SectionHomepageHero';
import SectionWeb3in2032 from '@/sections/SectionWeb3in2032';
import SectionMission from '@/sections/SectionMission';
import SectionProjects from '@/sections/SectionProjects';
import SectionCoreTeam from '@/sections/SectionCoreTeam';
// import SectionFinancing from '@/sections/SectionFinancing';
import SectionMailchimp from '@/sections/SectionMailchimp';
import Footer from '@/components/Footer';

import { scrollToSection } from '@/utils/utility';

export default function Home() {
  const router = useRouter();
  const scrollToSectionName = router?.query?.scrollToSection;

  useEffect(() => {
    if (scrollToSectionName) {
      scrollToSection(scrollToSectionName);
    }
  }, []);

  return (
    <div>
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
          LXDAO - Bringing together buidlers to buidl and maintain
          &quot;LX&quot; projects for Web3, in a sustainable manner.
        </title>
        <meta
          name="description"
          content="LXDAO is an R&amp;D-focused DAO in Web3.
Our mission: Bringing together buidlers to buidl and maintain LX projects for Web3, in a sustainable manner."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:title" content="LXDAO Official" />
        <meta
          property="og:description"
          content='LXDAO is an R&D-focused DAO in Web3, bringing together buidlers to buidl and maintain
          "LX" projects for Web3, in a sustainable manner.'
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
      <Layout>
        <Header />
        <SectionHomepageHero />
        <SectionMission />
        <SectionWeb3in2032 />
        <SectionProjects />
        <SectionCoreTeam />
        <SectionMailchimp />
        <Footer />
      </Layout>
    </div>
  );
}
