/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SectionProjects from '@/sections/SectionProjects';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Layout>
        <Header />
        <SectionProjects />
        <Footer />
      </Layout>
    </div>
  );
}
