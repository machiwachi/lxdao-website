import { useRouter } from 'next/router';

import { Box, Grid, Link, Typography } from '@mui/material';

import LINKS from '@/config/links';
import CommunityLinkGroup from './CommunityLinkGroup';
import Container from './Container';

const NavList = ({ title, items }) => (
  <Box display="flex" flexDirection="column">
    <Typography variant="h6" lineHeight="58px" fontWeight={700}>
      {title}
    </Typography>
    {items.map((item, index) => {
      return (
        <Link
          target="_blank"
          href={item.link}
          sx={{ textDecoration: 'none' }}
          key={index}
        >
          <Typography
            color="#646F7C"
            variant="body1"
            lineHeight="40px"
            fontWeight={400}
          >
            {item.name}
          </Typography>
        </Link>
      );
    })}
  </Box>
);

const Footer = () => {
  const router = useRouter();
  return (
    <Box
      sx={{ background: router.pathname == '/' ? '#C6F5F1' : '#F1F1F1' }}
      width="100%"
    >
      <Container paddingY={{ md: '112px', xs: '44px' }} margin="0 auto">
        <Box
          display="flex"
          flexDirection={{ lg: 'row', md: 'column', xs: 'column' }}
        >
          <Grid container spacing={{ lg: 6, md: 12, xs: 12 }} flex={2}>
            <Grid item lg={4} md={4} xs={6}>
              <NavList
                title="Development"
                items={[
                  {
                    name: 'GitHub',
                    link: LINKS.social.github,
                  },
                  {
                    name: 'Developer Guide',
                    link: LINKS.docs.developerGuide,
                  },
                ]}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={6}>
              <NavList
                title="Buidl Together"
                items={[
                  { name: 'Join Us', link: '/onboarding/intro' },
                  {
                    name: 'Governance',
                    link: LINKS.docs.governance,
                  },
                ]}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={6}>
              <NavList
                title="Resources"
                items={[
                  { name: 'Forum', link: LINKS.social.forum },
                  {
                    name: 'Snapshot',
                    link: LINKS.governance.snapshot,
                  },
                  {
                    name: 'LXDAO Media Kit',
                    link: LINKS.brand.mediaKit,
                  },
                ]}
              />
            </Grid>
          </Grid>
          <Box
            display="flex"
            gap="24px"
            flexDirection="column"
            marginTop={{ lg: 0, md: 8, xs: 8 }}
            flex={1}
          >
            <Box
              width="147px"
              height="58px"
              component={'img'}
              src={'/icons/lxdao-logo.svg'}
            />
            <Typography
              variant="body1"
              lineHeight="24px"
              fontWeight={400}
              color="#666F85"
            >
              LXDAO is an <span style={{ color: '#3C7AFF' }}>R&D</span>
              -focused DAO in Web3
            </Typography>
            <CommunityLinkGroup marginBottom={0} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
