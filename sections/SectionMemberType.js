import React from 'react';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';
import MemberTypeCard from '@/components/MemberTypeCard';

const SectionMemberType = ({ activeBuidlers }) => {
  const activeBuidlerAmount = activeBuidlers?.length;
  const displayBuidlerAvatars = [];
  activeBuidlers.forEach((buidler) => {
    displayBuidlerAvatars.push(buidler?.avatar);
  });
  return (
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
            title="LX Buidler"
            type="buidler"
            description={
              <>
                LX Builders are the <strong>most important members</strong> of
                the LXDAO community. They are responsible for buidling and
                maintaining the LXDAO projects. Therefore,{' '}
                <strong>you need to submit an application.</strong>
                And the Onboarding committee will review and vote on your
                application. After onboarding,{' '}
                <strong>you will get a Buidler SBT Card for free</strong> which
                cannot be transferred.
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
                <strong>NOT OPENED YET</strong>. LX Community members are the
                users or fans of the LXDAO projects. As a member of the
                community,{' '}
                <strong>
                  members will receive benefits from LXDAO projects
                </strong>
                , for example, VIP privilege for free, airdrop, whitelist, early
                access, etc.{' '}
                <strong>Anyone can purchase LX Community member NFT</strong>, a
                PFP NFT with extra benefits. You can sell or transfer it later.
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
