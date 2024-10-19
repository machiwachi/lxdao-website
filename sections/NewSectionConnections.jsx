import { Box, Link, Typography } from '@mui/material';

import Container from '@/components/Container';

export default function NewSectionConnections() {
  return (
    <Box
      sx={{
        width: '100vw',
        background: `#C6F5F1`,
        position: 'relative',
        pt: '80px',
        pb: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        width="430px"
        src="/images/new/white.png"
        sx={{
          position: 'absolute',
          top: '76px',
          right: '-40px',
        }}
      />
      <Box
        position="relative"
        fontSize={{ md: '40px', xs: '28px' }}
        textAlign="center"
        fontWeight="700"
        width="fit-content"
      >
        <Box
          component="img"
          src="/images/new/quote-right.svg"
          sx={{
            position: 'absolute',
            width: { md: '60px', xs: '20px' },
            left: { md: '-80px', xs: '-20px' },
          }}
        />
        Heart From <Box component="br" display={{ md: 'none', xs: 'block' }} />
        our community
        <Box
          component="img"
          src="/images/new/quote-left.svg"
          sx={{
            position: 'absolute',
            width: { md: '60px', xs: '20px' },
            top: { md: '40px', xs: '0px' },
            right: { md: '-90px', xs: '-20px' },
          }}
        />
      </Box>
      <Box
        width="100%"
        height="810px"
        sx={{
          overflow: 'scroll',
          top: '0',
          left: '0',
          mt: { md: '150px', xs: '30px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            flexWrap: 'wrap',
            gap: { md: '37px', xs: '20px' },
            height: '810px',
            px: '20px',
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              width="280px"
              sx={{
                p: '47px 34px',
                background: 'white',
                borderRadius: '20px',
                zIndex: 100,
              }}
            >
              <Box>
                qoutes from the community qoutes from the community qoutes from
                the community
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '12px',
                  mt: '48px',
                }}
              >
                <Box
                  width="40px"
                  height="40px"
                  sx={{
                    borderRadius: '50%',
                    background: 'red',
                  }}
                ></Box>
                <Box>
                  <Box>XXX</Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    @XXX
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            mt: '120px',
            width: '100%',
            justifyContent: { md: 'space-between', xs: 'center' },
            alignItems: { md: 'start', xs: 'center' },
          }}
        >
          <Box
            fontSize={{ md: '48px', xs: '32px' }}
            fontWeight="700"
            maxWidth={{ md: '320px', xs: '100%' }}
            textAlign={{ md: 'start', xs: 'center' }}
          >
            LXDAO Partners
          </Box>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mt={{ md: '0px', xs: '20px' }}
            maxWidth={{ md: '800px', xs: '100%' }}
            justifyContent={{ md: 'end', xs: 'center' }}
          >
            {partnersData.map((partner, index) => {
              return (
                <Link href={partner.link} target="_blank" key={index}>
                  <Box component={'img'} src={partner.logo} />
                </Link>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            mt: { md: '120px', xs: '60px' },
            width: '100%',
            justifyContent: { md: 'space-between', xs: 'center' },
            alignItems: { md: 'start', xs: 'center' },
          }}
        >
          <Box
            fontSize={{ md: '48px', xs: '32px' }}
            fontWeight="700"
            maxWidth={{ md: '320px', xs: '100%' }}
            textAlign={{ md: 'start', xs: 'center' }}
          >
            Beloved Sponsors
          </Box>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mt={{ md: '0px', xs: '20px' }}
            maxWidth={{ md: '800px', xs: '100%' }}
            justifyContent={{ md: 'end', xs: 'center' }}
          >
            {sponsorshipsData.map((partner, index) => {
              return (
                <Link href={partner.link} target="_blank" key={index}>
                  <Box component={'img'} src={partner.logo} />
                </Link>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { md: '96px', xs: '20px' },
            mt: { md: '120px', xs: '60px' },
            maxWidth: '1218px',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(135deg, #2975DF 0%, #32A5E1 50%, #3ACFE3 100%)',
            borderRadius: '24px',
            padding: { md: '120px 100px', xs: '60px 40px' },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: '48px', xs: '32px' },
              fontWeight: '700',
              color: 'white',
            }}
          >
            Support LXDAO
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography color="white" maxWidth="420px">
              The problem we try to tackle at LXDAO requires long-term
              endeavors. We have been here for two years, yet still need support
              for the future works to happen.
              <br />
              <br />
              If you agree with our ideas, please support us for a longer
              runway.
            </Typography>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: '24px',
                width: '240px',
                mt: { md: '0px', xs: '40px' },
                height: 'fit-content',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                  textAlign: 'center',
                  py: '18px',
                  bgcolor: 'white',
                  width: '240px',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  backgroundImage:
                    'linear-gradient(to right, #2975DF, #32A5E1, #3ACFE3)',
                }}
              >
                <Box
                  sx={{
                    fontSize: '22px',
                    fontWeight: 700,
                  }}
                >
                  Support Guide
                </Box>
                <Box
                  sx={{
                    fontSize: '18px',
                  }}
                >
                  {'Notion ->'}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const sponsorshipsData = [
  {
    name: 'Mask Network',
    logo: '/images/partners/mask-logo.svg',
    link: '	https://mask.io/',
  },
  {
    name: 'Optimism',
    logo: '/images/partners/optimism-logo.svg',
    link: 'https://www.optimism.io/',
  },
];

const partnersData = [
  {
    name: 'NextDAO',
    logo: '/images/partners/nextdao-logo.svg',
    link: 'https://twitter.com/theNextDAO',
  },
  {
    name: 'GCC',
    logo: '/images/partners/gcc-logo.svg',
    link: 'https://www.gccofficial.org/',
  },
  {
    name: 'PlanckerDAO',
    logo: '/images/partners/Plancker-logo.svg',
    link: 'https://plancker.org/',
  },
  {
    name: 'DAOStar',
    logo: '/images/partners/DAOStar-logo.svg',
    link: 'https://daostar.org/',
  },
  {
    name: 'MoleDAO',
    logo: '/images/partners/moledao-logo.svg',
    link: 'https://linktr.ee/moledao',
  },
  {
    name: 'MarsDAO',
    logo: '/images/partners/marsdao-logo.svg',
    link: 'https://linktr.ee/MarsDAO',
  },
  {
    name: 'EthSign',
    logo: '/images/partners/ethsign-logo.svg',
    link: 'https://linktr.ee/SignProtocol',
  },
  {
    name: '8dao',
    logo: '/images/partners/8dao-logo.svg',
    link: 'https://8dao.io/',
  },
  {
    name: 'Uncommons',
    logo: '/images/partners/Uncommons-logo.svg',
    link: 'https://www.notion.so/Uncommons-04ea0224d3cd4fe9b5181b6dd22d02b4',
  },
  {
    name: 'AAStar',
    logo: '/images/partners/AAStar-logo.svg',
    link: 'https://www.aastar.xyz/',
  },
  {
    name: 'Eleduck',
    logo: '/images/partners/eleduck-logo.svg',
    link: 'https://eleduck.com/',
  },
  {
    name: 'Artele',
    logo: '/images/partners/Artela-logo.svg',
    link: 'https://artela.network/',
  },
  {
    name: 'DMC',
    logo: '/images/partners/DMC-logo.svg',
    link: 'https://www.dmctech.io/en',
  },
  {
    name: 'ETHPanda',
    logo: '/images/partners/ETHPanda-logo.svg',
    link: 'https://ethpanda.org/',
  },
  {
    name: 'BlockBooster',
    logo: '/images/partners/BlockBooster-logo.svg',
    link: 'https://www.gitcoin.co/',
  },
];
