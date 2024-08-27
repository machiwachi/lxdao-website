/* eslint-disable no-undef */
import React from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import { ProjectDetail } from '@/components/projects/ProjectDetail';

export default function Home() {
  const router = useRouter();

  const projectId = router.query.id;

  if (!projectId) return null;

  return (
    <Layout title={'LXDAO Project: ' + projectId + ' | LXDAO'}>
      <ProjectDetail projectId={projectId} />
    </Layout>
  );
}
