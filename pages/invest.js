/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SectionFinancing from '@/sections/SectionFinancing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Layout>
        <Header />
        <SectionFinancing />
        <Footer />
      </Layout>
    </div>
  );
}
