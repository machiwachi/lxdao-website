/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import SectionHero from '@/sections/SectionHomepageHero';
import SectionMission from '@/sections/SectionMission';
import SectionWorkSteps from '@/sections/SectionWorkSteps';
import SectionProjects from '@/sections/SectionProjects';
import SectionBuidlers from '@/sections/SectionBuidlers';
import SectionCoreTeam from '@/sections/SectionCoreTeam';
import SectionActivities from '@/sections/SectionActivities';
import SectionPartners from '@/sections/SectionPartners';

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
      <SectionWorkSteps />
      <SectionProjects />
      <SectionBuidlers />
      <SectionCoreTeam />
      <SectionActivities />
      <SectionPartners />
    </Layout>
  );
}
