/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

import API from '@/common/API';
import Layout from '@/components/Layout';

export default function Votes() {
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

  return <Layout>投票记录</Layout>;
}
