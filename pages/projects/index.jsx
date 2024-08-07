/* eslint-disable no-undef */
import React from 'react';

import Layout from '@/components/Layout';
import { ProjectsDashboard } from '@/components/projects/ProjectsDashboard';

export default function Projects() {
  return (
    <div>
      <Layout title="LXDAO Projects | LXDAO">
        <ProjectsDashboard />
      </Layout>
    </div>
  );
}
