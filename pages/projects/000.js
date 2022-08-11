/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SectionProjectDetail from '@/sections/SectionProjectDetail';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Layout>
        <Header />
        <SectionProjectDetail projectId="000" />
        <Footer />
      </Layout>
    </div>
  );
}
