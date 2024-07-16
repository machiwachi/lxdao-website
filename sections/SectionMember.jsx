import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';
import Button from '@/components/Button';

const SectionApplicationSteps = () => {
  return (
    <Box backgroundColor="#F9FAFB" width="100%">
      <Container
        paddingY={{ md: 5, xs: 3 }}
        textAlign="center"
        maxWidth="1200px"
        margin="0 auto"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            textTransform="uppercase"
            fontSize={{ sm: '48px', xs: '30px' }}
            fontWeight="600"
            color="#101828"
            marginBottom={8}
            textAlign="center"
            width={{ sm: 'auto', xs: '300px' }}
          >
            How to join the community?
          </Typography>
          <Typography
            variant="h6"
            color="#667085"
            textAlign="center"
            marginBottom={8}
            maxWidth={{ md: '1200px', sm: '700px', xs: '300px' }}
          >
            Our main community is on Discord, we use Discord for chatting,
            events, and notifications. We also have a Forum for formal public
            discussion, soft proposals, sharing, etc.
          </Typography>
          <Box display="flex" flexDirection="row">
            <Link
              sx={{ textDecoration: 'none' }}
              textTransform="uppercase"
              href="https://discord.lxdao.io"
              target="_blank"
              paddingY={4}
              marginRight="20px"
            >
              <Button variant="gradient" width="260px">
                Join the Discord
              </Button>
            </Link>
            <Link
              sx={{ textDecoration: 'none' }}
              textTransform="uppercase"
              href="https://forum.lxdao.io/"
              target="_blank"
              paddingY={4}
            >
              <Button variant="outlined" width="210px">
                Open the Forum
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionApplicationSteps;
