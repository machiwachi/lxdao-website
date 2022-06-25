import React from 'react';
import { t } from '@lingui/macro';
import { Box, Typography } from '@mui/material';

const SectionVision = () => {
  return (
    <Box
      height="calc(100vh - 81px)"
      display="flex"
      paddingX="80px"
      flexDirection="column"
      justifyContent="center"
      gap="48px"
    >
      <Typography variant="h2">{t`vision-content`}</Typography>
      <Box
        display="flex"
        gap="12px"
        padding="16px 28px"
        borderRadius="8px"
        border="1px solid #D0D5DD"
        alignItems="center"
        alignSelf="flex-start"
        sx={{
          cursor: 'pointer',
          '&:hover': { border: '1px solid #00FB8C' },
        }}
      >
        <Box width="24px" component={'img'} src={'/icons/play.svg'} />
        <Typography color="#344054" fontSize="18px" lineHeight="28px">
          Showreel
        </Typography>
      </Box>
    </Box>
  );
};

export default SectionVision;
