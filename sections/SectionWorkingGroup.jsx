import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';
import showMessage from '@/components/showMessage';
import WorkingGroupCard from '@/components/workingGroups/WorkingGroupCard';

import API from '@/common/API';

const SectionWorkingGroup = () => {
  const [workingGroupsData, setWorkingGroupsData] = useState([]);
  const handleInit = async () => {
    try {
      const res = await API.get('/workinggroup/list');
      const result = res?.data;
      if (result?.status === 'SUCCESS') {
        setWorkingGroupsData(result?.data);
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
    <Box width="100%" backgroundColor="#36AFF9">
      <Container paddingY={{ md: '112px', xs: 8 }} margin="0 auto">
        <Typography
          variant="h2"
          lineHeight="58px"
          fontWeight="600"
          color="#ffffff"
          marginBottom={8}
        >
          LXDAO Working Groups
        </Typography>
        <Box
          display="flex"
          gap="24px"
          flexWrap="wrap"
          marginTop="48px"
          justifyContent={{ xs: 'center', md: 'center', lg: 'flex-start' }}
        >
          {workingGroupsData.length > 0 &&
            workingGroupsData.map((item, index) => {
              return <WorkingGroupCard key={index} data={item} />;
            })}
        </Box>
      </Container>
    </Box>
  );
};

export default SectionWorkingGroup;
