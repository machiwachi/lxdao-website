import React, { useState, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useAccount } from 'wagmi';

import API from '@/common/API';

import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Container from '@/components/Container';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';

import { Img3 } from '@lxdao/img3';
import { getImg3DidStrFromUrl } from '@/utils/utility';

export function WorkingGroupCard({ key, data, width }) {
  const normalMembers = data?.membersInWorkingGroup?.filter(
    (member) => !member?.role?.includes('Working Group Leader')
  );
  const leader = data?.membersInWorkingGroup?.filter((member) =>
    member?.role?.includes('Working Group Leader')
  );
  return (
    <Link
      href={`/workingGroups/${data?.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        borderRadius: '5px',
        border: '0.5px solid #D0D5DD',
        width: width || '384px',
        backgroundColor: '#ffffff',
      }}
      key={key}
    >
      <Box
        sx={{
          backgroundImage: `url(${data?.bannerURI})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '5px 5px 0 0',
        }}
        width="100%"
        height="160px"
      />
      <Box padding="16px 24px" textAlign="left">
        <Typography
          color="#101828"
          fontSize="16px"
          fontWeight={600}
          marginBottom="16px"
        >
          {data?.name}
        </Typography>
        <Typography
          color="#666F85"
          fontSize="16px"
          fontWeight={400}
          lineHeight="24px"
          marginBottom="16px"
        >
          {data?.shortDescription}
        </Typography>
        <Typography
          color="#101828"
          fontSize="16px"
          fontWeight={600}
          marginBottom="16px"
        >
          Members
        </Typography>
        <Box display="flex" gap="10px" overflow="hidden">
          {leader &&
            leader.map((member, index) => (
              <Link
                sx={{
                  border: '0.5px solid #d0d5dd',
                  borderRadius: '2px',
                  width: '60px',
                  height: '60px',
                  position: 'relative',
                }}
                target="_blank"
                href={`/buidlers/${member?.member?.address}`}
                key={index}
              >
                <Box
                  component="img"
                  src={member?.member?.avatar}
                  alt="avatar"
                  style={{
                    width: '59px',
                    height: '59px',
                  }}
                />
                <Typography
                  position="absolute"
                  sx={{
                    right: 0,
                    bottom: 0,
                    fontSize: '10px',
                    lineHeight: '12px',
                    color: '#fff',
                    background: '#36AFF9',
                    width: '28px',
                    zIndex: 3,
                    textAlign: 'center',
                  }}
                >
                  Lead
                </Typography>
              </Link>
            ))}
          {normalMembers &&
            normalMembers.map((member, index) => (
              <Link
                sx={{
                  border: '0.5px solid #d0d5dd',
                  borderRadius: '2px',
                  width: '60px',
                  height: '60px',
                  position: 'relative',
                }}
                target="_blank"
                href={`/buidlers/${member?.member?.address}`}
                key={index}
              >
                <Box
                  component="img"
                  src={member?.member?.avatar}
                  alt="avatar"
                  style={{
                    width: '59px',
                    height: '59px',
                  }}
                />
              </Link>
            ))}
        </Box>
      </Box>
    </Link>
  );
}

export default function WorkingGroupList() {
  const [listData, setListData] = useState([]);
  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);

  useEffect(async () => {
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
        {currentViewer && currentViewer?.role?.includes('Administrator') && (
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
