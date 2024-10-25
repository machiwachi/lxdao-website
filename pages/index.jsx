/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

import API from '@/common/API';
import NewSectionConnections from '@/sections/NewSectionConnections';
import NewSectionHero from '@/sections/NewSectionHero';
import NewSectionOnBoarding from '@/sections/NewSectionOnBoarding';
import NewSectionPG from '@/sections/NewSectionPG';
import NewSectionWork from '@/sections/NewSectionWork';
import { scrollToSection } from '@/utils/utility';

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

  const handleInit = async () => {
    try {
      const members = [];
      const ActiveMembers = [];
      let page = 1;
      let hasMoreData = true;

      while (hasMoreData) {
        const res = await API.get(
          `/buidler?per_page=27&page=${page}&status=ACTIVE&status=READYTOMINT&status=PENDING`
        );

        const result = res?.data;
        if (result.status !== 'SUCCESS') {
          // error todo Muxin add common alert, wang teng design
          return;
        }

        if (result?.data && result.data.length > 0) {
          // result.data.forEach((member) => {
          //   members.push(member);
          //   if (member?.badges && member?.badges['MemberFirstBadge'] >= 1) {
          //     ActiveMembers.push(member);
          //   }
          // });
          members.push(...result.data.slice(0, 27));
          setActiveBuidlerAmount(result.pagination.total);

          if (result.data.length < 200) {
            hasMoreData = false;
          } else {
            page += 1;
          }
        } else {
          hasMoreData = false;
        }
      }

      setBuidlers(members);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setLatest3Projects(projects.slice(0, 3));
    }
  }, [projects]);

  return (
    <Layout>
      <NewSectionHero />
      <NewSectionWork
        projectAmount={projects.length}
        buidlerAmount={activeBuidlerAmount}
      />
      <NewSectionPG />
      <NewSectionOnBoarding buidlers={buidlers.slice(0, 27)} />
      <NewSectionConnections />
      {/* <SupportUs />
      <SectionMission
        projectAmount={projects.length}
        buidlerAmount={activeBuidlerAmount}
      />
      <SectionWorkSteps projects={latest3Projects} />
      <SectionHomepageProjects projects={projects} />
      <SectionBuidlers buidlers={buidlers} />
      <SectionWorkingGroup />
      <SectionPartners /> */}
    </Layout>
  );
}
