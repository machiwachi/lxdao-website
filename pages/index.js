/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import SectionHero from '@/sections/SectionHomepageHero';
import SectionMission from '@/sections/SectionMission';
import SectionWorkSteps from '@/sections/SectionWorkSteps';
import SectionHomepageProjects from '@/sections/SectionHomepageProjects';
import SectionBuidlers from '@/sections/SectionBuidlers';
import SectionWorkingGroup from '@/sections/SectionWorkingGroup';
// import SectionActivities from '@/sections/SectionActivities';
import SectionPartners from '@/sections/SectionPartners';

import { scrollToSection } from '@/utils/utility';
import API from '@/common/API';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [latest3Projects, setLatest3Projects] = useState([]);
  const [buidlers, setBuidlers] = useState([]);
  const [activeBuidlerAmount, setActiveBuidlerAmount] = useState(0);

  const router = useRouter();
  const scrollToSectionName = router?.query?.scrollToSection;

  useEffect(() => {
    if (scrollToSectionName) {
      scrollToSection(scrollToSectionName);
    }
  }, []);

  useEffect(() => {
    API.get(`/project?page=1&per_page=30`)
      .then((res) => {
        if (res?.data?.status === 'SUCCESS') {
          setProjects(res?.data?.data);
        } else {
          // todo Muxin common error handling, function invocation
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(async () => {
    try {
      const res = await API.get('/buidler?per_page=100');
      const result = res?.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      if (result?.data) {
        setBuidlers(result?.data);
        const activeBuidlersNumber = result?.data.filter(
          (buidler) => buidler.status === 'ACTIVE'
        )?.length;
        setActiveBuidlerAmount(activeBuidlersNumber);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setLatest3Projects(projects.slice(projects.length - 3));
    }
  }, [projects]);

  return (
    <Layout>
      <SectionHero />
      <SectionMission
        projectAmount={projects.length}
        buidlerAmount={realBuidlersAmount}
      />
      <SectionWorkSteps projects={latest3Projects} />
      <SectionHomepageProjects projects={projects} />
      <SectionBuidlers buidlers={buidlers} />
      <SectionWorkingGroup />
      {/* <SectionActivities /> */}
      <SectionPartners />
    </Layout>
  );
}
