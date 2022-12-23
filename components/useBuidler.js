import React, { useState, useEffect } from 'react';
import API from '@/common/API';

function useBuidler(address) {
  const [buidler, setBuidler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const request = async () => {
    if (!address) return;
    setLoading(true);
    const data = await API.get(`/buidler/${address}`);
    const result = data?.data;
    if (result.status !== 'SUCCESS') {
      // error
      setError('Cannot get buidler detail');
    }
    setLoading(false);
    setBuidler(result.data);
  };

  function refresh() {
    request(address);
  }

  useEffect(() => {
    (async () => {
      await request(address);
    })();
  }, [address]);

  return [loading, buidler, error, refresh];
}

export default useBuidler;
