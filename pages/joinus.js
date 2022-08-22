/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SectionJoinUsHero from '@/sections/SectionJoinUsHero';
import SectionMemberType from '@/sections/SectionMemberType';
import SectionApplicationSteps from '@/sections/SectionApplicationSteps';
import Footer from '@/components/Footer';

export default function JoinUs() {
  return (
    <div>
      <Layout>
        <Header />
        <SectionJoinUsHero />
        <SectionMemberType />
        <SectionApplicationSteps />
        <Footer />
      </Layout>
    </div>
  );
}
