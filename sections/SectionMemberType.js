import React from 'react';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';
import MemberTypeCard from '@/components/MemberTypeCard';

const SectionMemberType = ({ activeBuidlers, memberType, setMemberType }) => {
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
        paddingY={{ md: 10, xs: 6 }}
        textAlign="center"
        maxWidth="1200px"
        margin="0 auto"
      >
        <Typography
          fontSize={{ sm: '48px', sx: '30px' }}
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
          alignItems="stretch"
        >
          <MemberTypeCard
            onClick={() => setMemberType('member')}
            title="LX Community Member"
            type="member"
            description={
              <>
                LX Community members are the users or fans of the LXDAO
                projects. Everyone can join LXDAO and become a community member.
                As a community member, you can contribute to LXDAO and get
                LXPoints rewards, you can also receive benefits from LXDAO
                projects. For example, VIP privilege from projects, airdrop,
                whitelist, early access, etc.
              </>
            }
            selected={memberType === 'member'}
            flex={1}
            avatars={[]}
          />
          <MemberTypeCard
            onClick={() => setMemberType('buidler')}
            title="LX Buidler"
            type="buidler"
            description={
              <>
                LX Builders are the most important members of the LXDAO
                community. They are responsible for buidling and maintaining the
                LXDAO projects. Therefore, you need to submit an application.
                And the Onboarding Committee will review and vote on your
                application. After onboarding, you will get a Buidler SBT Card
                for free which cannot be transferred.
              </>
            }
            amount={activeBuidlerAmount}
            selected={memberType === 'buidler'}
            flex={1}
            avatars={displayBuidlerAvatars}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SectionMemberType;
