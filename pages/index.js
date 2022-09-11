/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import SectionHero from '@/sections/SectionHomepageHero';
import SectionWeb3in2032 from '@/sections/SectionWeb3in2032';
import SectionMission from '@/sections/SectionMission';
import SectionProjects from '@/sections/SectionProjects';
import SectionBuidlers from '@/sections/SectionBuidlers';
import SectionCoreTeam from '@/sections/SectionCoreTeam';
import SectionMailchimp from '@/sections/SectionMailchimp';

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
      <SectionHero />
      <SectionMission />
      <SectionWeb3in2032 />
      <SectionProjects />
      <SectionBuidlers />
      <SectionCoreTeam />
      <SectionMailchimp />
    </Layout>
  );
}
