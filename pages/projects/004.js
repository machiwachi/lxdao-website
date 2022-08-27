/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import SectionProjectDetail from '@/sections/SectionProjectDetail';

export default function Home() {
  return (
    <div>
      <Layout>
        <SectionProjectDetail projectId="004" />
      </Layout>
    </div>
  );
}
