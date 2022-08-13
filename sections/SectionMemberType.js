import React from 'react';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';
import MemberTypeCard from '@/components/MemberTypeCard';

const SectionMemberType = () => (
  <Box backgroundColor="#F9FAFB" width="100%">
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      maxWidth="1200px"
      margin="0 auto"
    >
      <Typography variant="h3" marginBottom={6} textAlign="left">
        Member Type
      </Typography>
      <Box
        display="flex"
        flexDirection={{ md: 'row', xs: 'column' }}
        gap="26px"
      >
        <MemberTypeCard
          type="Buidler"
          description="We are an ever growing international community of humans from a diversity of specializations. Coders, Engineers, Legal Experts, Designers, Writers, Testers, Activists - and more! Come one, come all!"
          amount={36}
          selected={true}
          flex={1}
        />
        <MemberTypeCard
          type="Member"
          description="We are an ever growing international community of humans from a diversity of specializations. Coders, Engineers, Legal Experts, Designers, Writers, Testers, Activists - and more! Come one, come all!"
          selected={false}
          flex={1}
        />
      </Box>
    </Container>
  </Box>
);

export default SectionMemberType;
