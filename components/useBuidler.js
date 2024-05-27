import { useState, useEffect } from 'react';
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

    const badges = result?.data?.badges;
    if (badges && Object.keys(badges).length) {
      let badgesData = [];
      const badgeMetadataPromises = Object.keys(badges).map(async (key) => {
        const badgeMetadata = await API.get(`/buidler/badge/metadata/${key}`);
        if (badgeMetadata?.data) {
          return badgeMetadata?.data;
        }
      });

      badgesData = await Promise.all(badgeMetadataPromises);
      if (badgesData?.length) {
        badgesData = badgesData.map((badge) => {
          badge.amount = badges[badge?.id];
          return badge;
        });
      }
      result.data.badges = badgesData;
    } else {
      if (result.data) {
        result.data.badges = [];
      }
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
