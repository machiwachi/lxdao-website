import { Box, Link, Typography } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { keyframes } from '@mui/system';

import Button from '@/components/Button';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import Container from '@/components/Container';
import StyledTooltip from '@/components/StyledToolTip';
import Tag from '@/components/Tag';

import { getMemberFirstBadgeAmount } from '@/utils/utility';

export default function NewSectionOnBoarding({ buidlers }) {
  console.log(buidlers);
  return (
    <Box
      sx={{
        width: '100vw',
        backgroundImage: `url('/images/new/top-bg.svg'), url('/images/new/hero-bg.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom, top',
      }}
    >
      <Container
        minHeight={{ md: '990px', xs: '660px' }}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        textAlign="center"
        pt="70px"
      >
        <Box
          alignSelf="end"
          component="img"
          width="590px"
          src="/images/new/infinite.gif"
        ></Box>
        <Box alignSelf="start" mt="60px">
          <Typography
            fontSize="40px"
            maxWidth="674px"
            fontWeight="500"
            textAlign="left"
          >
            We are committed to creating an{' '}
            <span
              style={{
                fontWeight: '700',
              }}
            >
              infinite cycle
            </span>{' '}
            that promotes public goods and open source for an&nbsp;
            <span
              style={{
                fontWeight: '700',
              }}
            >
              {''}open and beautiful
            </span>
            society.
          </Typography>
          <br />
          <Typography fontSize="32px" textAlign="left">
            Here is how we make it real.
          </Typography>
        </Box>
      </Container>
      <OnBoardingSection
        title="Education"
        description="We held various events to let the ideas about Public Goods reach more people."
        index="01"
      >
        <Box
          sx={{
            width: '100%',
            overflow: 'scroll',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              width: 'fit-content',
              borderRadius: '24px',
              ml: 'calc((100vw - Min(90vw, 1216px))/2)',
              backgroundColor: '#CEE8F8',
              padding: '12px',
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'end',
                  width: '300px',
                  height: '400px',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent),url('/images/new/example.png')`,
                }}
              >
                <Typography fontSize="28px" fontWeight="600">
                  EDCON
                </Typography>
                <Box fontSize="14px" leading="10px">
                  <Typography>2024.07</Typography>
                  <Typography>@Tokyo</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </OnBoardingSection>
      <OnBoardingSection
        title="Onboarding"
        description="We onboard talents with 'LX' to research & develop."
        index="02"
      >
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              width: '100%',
              padding: '12px',
              height: '100%',
              backgroundColor: '#C6F5F1',
              borderRadius: '24px',
              my: '52px',
            }}
          >
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
          <MuiButton
            variant="contained"
            sx={{
              borderRadius: '100px',
              padding: '12px 40px',
            }}
          >
            VIEW ALL MEMBERS
          </MuiButton>
        </Container>
      </OnBoardingSection>
      <OnBoardingSection
        title="Research"
        description="We carry out research to dig out and keep updated with the latest happenings."
        index="03"
      >
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          justifyContent="center"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#CEE8F8',
              padding: '12px',
              borderRadius: '24px',
              my: '64px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                bgcolor: 'white',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '36px 60px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                      maxWidth: '120px',
                      minWidth: '120px',
                    }}
                  >
                    <MyTag color="blue">NFT</MyTag>
                    <MyTag color="green">Open source</MyTag>
                  </Box>
                  <Box minWidth="600px">
                    <Typography fontSize="24px" fontWeight="700">
                      Report on Web3 Public Goods Ecosystem
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '16px',
                        color: '#666',
                        fontSize: '14px',
                      }}
                    >
                      <Typography>2024/10/02</Typography>
                      <Typography>@Tiao</Typography>
                    </Box>
                  </Box>
                  <Box component="img" src="/images/new/arrow.svg" />
                </Box>
              ))}
            </Box>
          </Box>
          <MuiButton
            variant="contained"
            sx={{
              borderRadius: '100px',
              padding: '12px 40px',
            }}
          >
            VIEW ALL MEMBERS
          </MuiButton>
        </Container>
      </OnBoardingSection>
    </Box>
  );
}

function MyTag({ color, children }) {
  return (
    <Box align="center">
      <Typography
        fontSize={{ md: '14px', xs: '12px' }}
        sx={{
          alignItems: 'center',
          color: color == 'green' ? '#4DCC9E' : '#36AFF9',
          background: color == 'green' ? 'rgba(77, 204, 158, 0.1)' : '#e4eff5',
          display: 'initial',
          lineHeight: '23.92px',
          padding: '4px 12px',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

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
      width={{ sm: '121px', xs: '100%' }}
      height={{ sm: '121px', xs: '100%' }}
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
        width={{ sm: '121px', xs: '100%' }}
        sx={{ position: 'absolute', top: 0, left: 0, aspectRatio: '1 / 1' }}
        backgroundColor={active ? 'transpent' : 'rgba(0,0,0,0.5)'}
        display={{ md: 'block', xs: 'none' }}
      />
      <Box width={{ sm: '121px', xs: '100%' }} height="100%">
        <Box
          component="img"
          width={{ xs: '100%' }}
          src={buidler?.avatar || '/images/placeholder.jpeg'}
          sx={{ aspectRatio: '1 / 1' }}
          borderRadius="12px"
          border="0.5px solid #D0D5DD"
        />
      </Box>
    </Link>
  );
};

function OnBoardingSection({ title, description, index, children }) {
  return (
    <Box paddingTop="120px" paddingBottom="100px">
      <Box
        maxWidth="1216px"
        boxSizing="border-box"
        marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Typography fontSize="80px" fontWeight="700">
            {index}
          </Typography>
          <Box ml="20px">
            <Typography fontSize="32px" fontWeight="700">
              {title}
            </Typography>
            <Typography fontSize="20px" fontWeight="500">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        {children}
        {/* <Box
        sx={{
          width: '100%',
          overflow: 'scroll',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            width: 'fit-content',
            borderRadius: '24px',
            ml: 'calc((100vw - Min(90vw, 1216px))/2)',
            backgroundColor: '#CEE8F8',
            padding: '12px',
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
                width: '300px',
                height: '400px',
                color: 'white',
                borderRadius: '20px',
                padding: '10px 20px',
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent),url('/images/new/example.png')`,
              }}
            >
              <Typography fontSize="28px" fontWeight="600">
                EDCON
              </Typography>
              <Box fontSize="14px">
                <Typography>2024.07</Typography>
                <Typography>@Tokyo</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box> */}
      </Box>
    </Box>
  );
}

function OnBoardingTitle({ title, description, index }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Typography fontSize="80px" fontWeight="700">
        01
      </Typography>
      <Box ml="20px">
        <Typography fontSize="32px" fontWeight="700">
          {title}
        </Typography>
        <Typography fontSize="20px" fontWeight="500">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
