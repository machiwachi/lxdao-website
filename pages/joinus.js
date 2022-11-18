/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

import API from '@/common/API';
import Layout from '@/components/Layout';
import SectionJoinUsHero from '@/sections/SectionJoinUsHero';
import SectionMemberType from '@/sections/SectionMemberType';
import SectionMember from '@/sections/SectionMember';
import SectionApplicationSteps from '@/sections/SectionApplicationSteps';

export default function JoinUs() {
  const [activeBuidlers, setActiveBuidlers] = useState([]);
  const [memberType, setMemberType] = useState('member');

  useEffect(async () => {
    try {
      const res = await API.get(`/buidler?per_page=50`);
      const result = res.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      setActiveBuidlers(result?.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <Layout>
        <SectionJoinUsHero maxWidth="1216px" />
        {/* todo Muxin later, tell people who we need */}
        <SectionMemberType
          activeBuidlers={activeBuidlers}
          memberType={memberType}
          setMemberType={setMemberType}
        />
        {memberType === 'member' && <SectionMember />}
        {memberType === 'buidler' && <SectionApplicationSteps />}
      </Layout>
    </div>
  );
}
