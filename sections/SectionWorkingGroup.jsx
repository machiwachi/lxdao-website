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
        <Box display="flex" flexDirection="column" gap={2} marginBottom={8}>
          <Typography
            variant="h2"
            lineHeight="58px"
            fontWeight="600"
            color="#ffffff"
          >
            LXDAO Working Groups
          </Typography>
          <Box
            sx={{
              backgroundColor: 'rgba(254, 243, 242, 0.95)',
              border: '1px solid #FEE4E2',
              borderRadius: '12px',
              padding: '10px 20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              alignSelf: 'flex-start',
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
            color="#ffffff"
            sx={{ opacity: 0.9 }}
          >
            Working Groups have been deprecated. The data below is preserved for
            historical reference only.
          </Typography>
        </Box>
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
