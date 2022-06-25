import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from '@lingui/macro';

const Footer = () => (
  <Box width="100%" height="112px" backgroundColor="#F9FAFB">
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderTop="1px solid #F2F4F7"
      marginLeft="80px"
      marginRight="80px"
      height="100%"
    >
      <Box display="flex">
        <Box width="32px" component={'img'} src={'/icons/logo.svg'} />
        <Typography variant="h5" paddingLeft="10px">{t`LXDAO`}</Typography>
      </Box>
      <Box>
        <Typography>© 2022 Made by LXDAO</Typography>
      </Box>
    </Box>
  </Box>
);

export default Footer;
