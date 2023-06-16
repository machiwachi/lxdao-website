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

    if (result?.data?.badges) {
      const badgesType = result?.data?.badges?.types;
      const badgesAmount = result?.data?.badges?.amounts.map(
        (amount) => amount
      );

      let badgesData = [];
      if (badgesType?.length) {
        const badgeMetadataPromises = badgesType.map(async (type) => {
          const badgeMetadata = await API.get(
            `/buidler/badge/metadata/${type}`
          );
          if (badgeMetadata?.data) {
            return badgeMetadata?.data;
          }
        });
        badgesData = await Promise.all(badgeMetadataPromises);

        if (badgesData?.length) {
          badgesData = badgesData.map((badge, index) => {
            badge.amount = badgesAmount[index];
            return badge;
          });
        }
        result.data.badges = badgesData;
      } else {
        // todo Muxin
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
