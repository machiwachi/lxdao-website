import React, { useEffect, useState } from 'react';

import { Box, Link, Typography } from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';
import WorkingGroupCard from '@/components/workingGroups/WorkingGroupCard';

import { useAccount } from 'wagmi';

import API from '@/common/API';
import { BuilderRole } from '@/models/builder';

export default function WorkingGroupList() {
  const [listData, setListData] = useState([]);
  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);

  const handleInit = async () => {
    try {
      const res = await API.get('/workinggroup/list');
      const result = res?.data;
      if (result?.status === 'SUCCESS') {
        setListData(result?.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to get the working group list',
        body: err.message,
      });
    }
  };

  useEffect(() => {
    handleInit();
  }, []);

  return (
    <Layout title={'LXDAO Working Group List | LXDAO'}>
      <Container
        paddingY={{ md: 12, xs: 8 }}
        textAlign="center"
        id="Projects-Section"
        maxWidth="1200px"
        width="auto"
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography
            fontSize="70px"
            fontWeight="600"
            lineHeight="70px"
            color="#101828"
          >
            LXDAO WORKING GROUPS
          </Typography>
          <Box
            sx={{
              backgroundColor: '#FEF3F2',
              border: '1px solid #FEE4E2',
              borderRadius: '16px',
              padding: '12px 24px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              marginBottom: '40px',
            }}
          >
            <Typography
              fontSize="14px"
              fontWeight="500"
              color="#B42318"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              📚 Historical Archive
            </Typography>
          </Box>
          <Typography
            fontSize="16px"
            fontWeight="400"
            color="#667085"
            textAlign="center"
            maxWidth="600px"
          >
            Working Groups have been deprecated. The data below is preserved for
            historical reference only.
          </Typography>
        </Box>
        <Box
          display="flex"
          gap="24px"
          flexWrap="wrap"
          marginTop="96px"
          justifyContent={{ xs: 'center', md: 'center', lg: 'flex-start' }}
        >
          {listData &&
            listData.length > 0 &&
            listData.map((item, index) => {
              return <WorkingGroupCard key={index} data={item} />;
            })}
        </Box>
      </Container>
    </Layout>
  );
}
