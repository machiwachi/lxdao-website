/* eslint-disable no-undef */
import React from 'react';
import _ from 'lodash';
import { Container, Box, Typography } from '@mui/material';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

import API from '@/common/API';

import Layout from '@/components/Layout';
import showMessage from '@/components/showMessage';
import WorkingGroupForm from '@/components/WorkingGroupForm';
import useBuidler from '@/components/useBuidler';

function CreateWorkingGroup() {
  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);
  const router = useRouter();

  const saveWorkingGroupHandler = async (values) => {
    try {
      const response = await API.post(`/workinggroup`, {
        ...values,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      }
      // TODO: redirect to the working group detail page
      //  else {
      //   router.push(`/workingGroups/${result}`);
      // }
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
              marginBottom={10}
            >
              Create a new Working Group
            </Typography>
          </Box>
          {currentViewer && currentViewer?.role?.includes('Administrator') ? (
            <WorkingGroupForm
              values={{}}
              isUpdate={false}
              saveWorkingGroupHandler={saveWorkingGroupHandler}
            />
          ) : (
            <Box color="red">
              You don't have access to create a working group.
            </Box>
          )}
        </Box>
      </Container>
    </Layout>
  );
}

export default CreateWorkingGroup;
