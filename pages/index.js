/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import SectionHero from '@/sections/SectionHomepageHero';
import SectionMission from '@/sections/SectionMission';
import SectionWorkSteps from '@/sections/SectionWorkSteps';
import SectionHomepageProjects from '@/sections/SectionHomepageProjects';
import SectionBuidlers from '@/sections/SectionBuidlers';
import SectionWorkingGroup from '@/sections/SectionWorkingGroup';
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
      <SectionHomepageProjects />
      <SectionBuidlers />
      <SectionWorkingGroup />
      <SectionActivities />
      <SectionPartners />
    </Layout>
  );
}
