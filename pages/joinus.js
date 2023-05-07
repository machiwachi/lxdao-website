/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import SectionJoinUsHero from '@/sections/SectionJoinUsHero';
import SectionApplicationSteps from '@/sections/SectionApplicationSteps';

export default function JoinUs() {
  return (
    <div>
      <Layout title="Join us | LXDAO">
        <SectionJoinUsHero maxWidth="1216px" />
        {/* todo Muxin later, tell people who we need */}
        <SectionApplicationSteps />
      </Layout>
    </div>
  );
}
