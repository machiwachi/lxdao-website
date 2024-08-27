/* eslint-disable no-undef */
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

import Layout from '@/components/Layout';
import ProjectForm from '@/components/projects/ProjectForm';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';

import { useAccount } from 'wagmi';

import API from '@/common/API';

function CreateProject() {
  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);

  const saveProjectHandler = async (values) => {
    try {
      const response = await API.post(`/project`, {
        ...values,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      } else {
        if (result?.data?.id) {
          showMessage({
            type: 'success',
            title: 'Project created',
          });
  
          window.location.href = `${window.location.origin}/projects/${result?.data?.index_name}`;
        }
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to create a project',
        body: err.message,
      });
    }
  };

  return (
    <Layout title={`Create a new Project | LXDAO`}>
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
              Create a new Project
            </Typography>
          </Box>
          {currentViewer ? (
            currentViewer?.role?.includes('Administrator') ? (
              <ProjectForm
                values={{}}
                isUpdate={false}
                saveProjectHandler={saveProjectHandler}
              />
            ) : (
              <Box color="red">
                You don&apos;t have access to create a project.
              </Box>
            )
          ) : (
            <></>
          )}
        </Box>
      </Container>
    </Layout>
  );
}

export default CreateProject;
