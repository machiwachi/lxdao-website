import React from 'react';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';
import MemberTypeCard from '@/components/MemberTypeCard';

const SectionMemberType = ({ activeBuidlers }) => {
  const activeBuidlerAmount = activeBuidlers?.length;
  const displayBuidlerAvatars = [];
  const displayBuidlers =
    activeBuidlerAmount > 4
      ? activeBuidlers.slice(activeBuidlers.length - 4, activeBuidlers.length)
      : activeBuidlers;
  displayBuidlers.forEach((buidler) => {
    displayBuidlerAvatars.push(buidler?.avatar);
  });
  return (
    <Box backgroundColor="#F9FAFB" width="100%">
      <Container
        paddingY={{ md: 10, xs: 8 }}
        textAlign="center"
        maxWidth="1200px"
        margin="0 auto"
      >
        <Typography
          fontSize="48px"
          fontWeight="600"
          marginBottom={6}
          lineHeight="40px"
          textAlign="left"
          textTransform="uppercase"
        >
          Member Type
        </Typography>
        <Box
          display="flex"
          flexDirection={{ md: 'row', xs: 'column' }}
          gap="26px"
        >
          <MemberTypeCard
            title="LX Buidler"
            type="buidler"
            description={
              <>
                LX Builders are the most important members of the LXDAO
                community. They are responsible for buidling and maintaining the
                LXDAO projects. Therefore, you need to submit an application.
                And the Onboarding committee will review and vote on your
                application. After onboarding, you will get a Buidler SBT Card
                for free which cannot be transferred.
              </>
            }
            amount={activeBuidlerAmount}
            selected={true}
            flex={1}
            avatars={displayBuidlerAvatars}
          />
          <MemberTypeCard
            title="LX Community Member"
            type="member"
            description={
              <>
                NOT OPENED YET. LX Community members are the users or fans of
                the LXDAO projects. As a member of the community, members will
                receive benefits from LXDAO projects , for example, VIP
                privilege for free, airdrop, whitelist, early access, etc.
                Anyone can purchase LX Community member NFT, a PFP NFT with
                extra benefits. You can sell or transfer it later.
              </>
            }
            selected={false}
            flex={1}
            disabled={true}
            avatars={['', '', '', '']}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SectionMemberType;
