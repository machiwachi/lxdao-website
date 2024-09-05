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
        <Typography
          fontSize="70px"
          fontWeight="600"
          lineHeight="70px"
          color="#101828"
          marginBottom="60px"
        >
          LXDAO WORKING GROUPS
        </Typography>
        {currentViewer && currentViewer?.role?.includes(BuilderRole.Mod) && (
          <Box display="flex" justifyContent="center">
            <Link
              sx={{ textDecoration: 'none' }}
              href={`/workingGroups/create`}
            >
              <Button variant="gradient" width="250px">
                Create a working group
              </Button>
            </Link>
          </Box>
        )}
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
