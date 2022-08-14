/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SectionHero from '@/sections/SectionHero';
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
    <Layout>
      <Header />
      <SectionHero />
      <SectionMission />
      <SectionWeb3in2032 />
      <SectionProjects />
      <SectionCoreTeam />
      <SectionMailchimp />
      <Footer />
    </Layout>
  );
}
