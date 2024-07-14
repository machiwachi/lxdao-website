import  { useState, useEffect } from 'react';
import API from '@/common/API';

function useMate(address) {
  const [mates, setMates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const request = async () => {
    if (!address) return;
    setLoading(true);
    const data = await API.get(`/buidler/${address}/mates`);
    const result = data?.data;
    if (result.status !== 'SUCCESS') {
      // error
      setError('Cannot get buidler detail');
    }
    setLoading(false);
    setMates(result.data);
  };

  function refresh() {
    request(address);
  }

  useEffect(() => {
    (async () => {
      await request(address);
    })();
  }, [address]);

  return [loading, mates, error, refresh];
}

export default useMate;
