/* eslint-disable no-undef */
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

import Layout from '@/components/Layout';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';
import WorkingGroupForm from '@/components/workingGroups/WorkingGroupForm';

import { useAccount } from 'wagmi';

import API from '@/common/API';
import { BuilderRole } from '@/models/builder';

function CreateWorkingGroup() {
  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);

  const saveWorkingGroupHandler = async (values) => {
    try {
      const response = await API.post(`/workinggroup`, {
        ...values,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      } else {
        if (result?.data?.id) {
          showMessage({
            type: 'success',
            title: 'Working group created',
          });
          // reload the page for hiding the popup
          window.location.href = `${window.location.origin}/workingGroups/${result?.data?.id}`;
        }
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to create a working group',
        body: err.message,
      });
    }
  };
  return (
    <Layout title={`Create a new Working Group | LXDAO`}>
      <Container
        sx={{
          mt: 4,
          maxWidth: 1216,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          width="1000px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box textAlign="center" width="100%">
            <Typography
              fontSize="70px"
              fontWeight={600}
              lineHeight="70px"
              color="#101828"
              marginBottom={4}
            >
              Create a new Working Group
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#FEF3F2',
              border: '2px solid #FEE4E2',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              maxWidth: '600px',
              marginTop: 4,
            }}
          >
            <Typography
              fontSize="24px"
              fontWeight="600"
              color="#B42318"
              marginBottom={2}
            >
              📚 Working Groups Have Been Deprecated
            </Typography>
            <Typography
              fontSize="16px"
              fontWeight="400"
              color="#667085"
              marginBottom={3}
            >
              Working Groups are no longer active at LXDAO. This feature has
              been archived and creating new working groups is disabled.
            </Typography>
            <Typography fontSize="14px" fontWeight="400" color="#667085">
              Please refer to our current organizational structure for
              collaboration opportunities.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default CreateWorkingGroup;
