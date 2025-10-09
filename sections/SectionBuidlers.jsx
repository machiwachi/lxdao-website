import React from 'react';

import { Box, Link, Typography } from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';
import StyledTooltip from '@/components/StyledToolTip';
import Tag from '@/components/Tag';

import { getMemberFirstBadgeAmount } from '@/utils/utility';

const BuidlerAvatarBox = ({ buidler, active, display }) => {
  return (
    <Link
      href={`/buidlers/${buidler.address}`}
      target="_blank"
      sx={{
        textDecoration: 'none',
        aspectRatio: '1 / 1',
      }}
      display={display}
      width={{ lg: '152px', sm: '130px', xs: '130px' }}
      height={{ lg: '152px', sm: '130px', xs: '130px' }}
      position="relative"
    >
      {!active && (
        <Box
          sx={{ position: 'absolute', zIndex: 1 }}
          component="img"
          src={'/icons/onboarding.svg'}
        />
      )}
      <Box
        width={{ lg: '152px', sm: '130px', xs: '100%' }}
        sx={{ position: 'absolute', top: 0, left: 0, aspectRatio: '1 / 1' }}
        backgroundColor={active ? 'transpent' : 'rgba(0,0,0,0.5)'}
        display={{ md: 'block', xs: 'none' }}
      />
      <Box width={{ lg: '152px', sm: '130px', xs: '100%' }} height="100%">
        <Box
          component="img"
          width={{ xs: '100%' }}
          src={buidler?.avatar || '/images/placeholder.jpeg'}
          sx={{ aspectRatio: '1 / 1' }}
        />
      </Box>
    </Link>
  );
};

const BudilerTooltip = ({
  buidler,
  handleBuidlerCardHover,
  handleBuidlerCardLeave,
  ...rest
}) => {
  const BuidlerDetails = ({ name, description, address, role }) => {
    return (
      <Box>
        <Typography
          color="#000000"
          variant="h5"
          lineHeight="24px"
          fontWeight={500}
          marginBottom={3}
        >
          {name}
        </Typography>
        <Typography
          color="#666F85"
          variant="body1"
          lineHeight="24px"
          fontWeight={400}
          marginBottom="17px"
        >
          {description}
        </Typography>
        {role?.length && (
          <Box display="flex" flexWrap="wrap" marginBottom="25px">
            {role.map((roleItem, index) => {
              return <Tag key={index} text={roleItem} />;
            })}
          </Box>
        )}
        <Link
          href={`/buidlers/${address}`}
          sx={{ textDecoration: 'none' }}
          target="_blank"
        >
          <Typography
            color="#101828"
            variant="body1"
            lineHeight="24px"
            fontWeight={500}
            textAlign="right"
          >
            More -{`>`}
          </Typography>
        </Link>
      </Box>
    );
  };

  const firstMemberBadgeAmount = getMemberFirstBadgeAmount(buidler?.badges);

  return (
    <Box {...rest}>
      <StyledTooltip
        title={<BuidlerDetails {...buidler} />}
        placement="bottom-start"
      >
        <Box
          sx={{ aspectRatio: '1 / 1' }}
          onMouseOver={handleBuidlerCardHover}
          onMouseLeave={handleBuidlerCardLeave}
          position="relative"
        >
          <BuidlerAvatarBox
            buidler={buidler}
            active={
              buidler?.status === 'ACTIVE' ||
              (buidler?.status === 'PENDING' && firstMemberBadgeAmount > 0)
            }
            display="block"
          />
        </Box>
      </StyledTooltip>
    </Box>
  );
};

const SectionBuidlers = ({ buidlers }) => {
  return (
    <Box backgroundColor="#000000" boxSizing="border-box">
      <Container paddingY={{ md: '112px', xs: 8 }}>
        <Typography
          variant="h2"
          lineHeight="44px"
          fontWeight={600}
          color="#ffffff"
          marginBottom={3}
        >
          LXDAO MEMBERS
        </Typography>
        <Typography
          variant="subtitle1"
          lineHeight="30px"
          fontWeight={400}
          color="#ffffff"
          marginBottom={{ md: '102px', xs: '72px' }}
        >
          Welcome to Join Us, let&apos;s buidl more valuable Web3 products
          together!
        </Typography>
        <Box display="flex" flexWrap="wrap" width={{ sm: '100%', xs: '100%' }}>
          {buidlers.map((buidler, index) => {
            const firstMemberBadgeAmount = getMemberFirstBadgeAmount(
              buidler?.badges
            );
            const active =
              buidler?.status === 'ACTIVE' ||
              (buidler?.status === 'PENDING' && firstMemberBadgeAmount > 0);
            if (!active) return;
            return (
              <Box key={index}>
                <BudilerTooltip
                  buidler={buidler}
                  active={active}
                  display={{ md: 'block', xs: 'none' }}
                />
                <BuidlerAvatarBox
                  buidler={buidler}
                  active={active}
                  display={{ md: 'none', xs: 'block' }}
                />
              </Box>
            );
          })}
        </Box>
        <Link
          href={`/onboarding/profile`}
          color="#ffffff"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Button
            variant="gradient"
            width="200px"
            marginTop={{ md: '96px', xs: '27px' }}
          >
            Join Us
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default SectionBuidlers;
