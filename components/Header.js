import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { t } from '@lingui/macro';
import { Box, Typography, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { scrollToSection } from '@/utils/utility';
import Container from './Container';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const route = router.route;

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(open);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              scrollToSection('Projects-Section');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Projects</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              scrollToSection('CoreTeam-Section');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Core Team</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              scrollToSection('Invest-Section');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Invest LXDAO</Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List sx={{ padding: 0 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ gap: 2 }}>
            <Typography
              target="_blank"
              component="a"
              href="https://twitter.com/LXDAO_Official"
              color="primary"
            >
              <Box width="32px" component={'img'} src={'/icons/twitter.svg'} />
            </Typography>
            <Typography
              target="_blank"
              component="a"
              href="https://discord.lxdao.io"
              color="primary"
            >
              <Box width="32px" component={'img'} src={'/icons/discord.svg'} />
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={{ md: '80px', xs: '64px' }}
      borderBottom="1px solid #F2F4F7"
    >
      <Box display="flex" alignItems="center">
        <Box
          onClick={() => {
            router.push('/');
          }}
          sx={{ cursor: 'pointer' }}
          display="flex"
        >
          <Box width="32px" component={'img'} src={'/icons/logo.svg'} />
          <Typography variant="h5" paddingLeft="10px">{t`LXDAO`}</Typography>
        </Box>

        <Box gap="24px" marginLeft={7} display={{ md: 'flex', xs: 'none' }}>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router.push('/projects');
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              if (route === '/') {
                scrollToSection('CoreTeam-Section');
              } else {
                router.push({
                  pathname: '/',
                  query: { scrollToSection: 'CoreTeam-Section' },
                });
              }
            }}
          >
            Core Team
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router.push('/invest');
            }}
          >
            Investment
          </Typography>
          <Typography>
            <Link
              href={`https://github.com/lxdao-official`}
              target="_blank"
              color={'inherit'}
              sx={{
                textDecoration: 'none',
              }}
            >
              GitHub
            </Link>
          </Typography>
          <Typography>
            <Link
              href={`https://forum.lxdao.io/`}
              target="_blank"
              color={'inherit'}
              sx={{
                textDecoration: 'none',
              }}
            >
              Forum
            </Link>
          </Typography>
          <Typography>
            <Link
              href={`https://www.figma.com/file/QeDaGHM1GxNTb1R6ma8tsw/LXDAO-Design-UI-Kit?node-id=59%3A4`}
              target="_blank"
              color={'inherit'}
              sx={{
                textDecoration: 'none',
              }}
            >
              Media kit
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box display={{ md: 'block', xs: 'none' }}>
        <Typography
          target="_blank"
          component="a"
          href="https://twitter.com/LXDAO_Official"
          color="primary"
          marginRight={2}
        >
          <Box width="50px" component={'img'} src={'/icons/twitter.svg'} />
        </Typography>
        <Typography
          target="_blank"
          component="a"
          href="https://discord.lxdao.io"
          color="primary"
          marginRight={2}
        >
          <Box width="50px" component={'img'} src={'/icons/discord.svg'} />
        </Typography>
      </Box>
      <MenuIcon
        sx={{
          display: { md: 'none', xs: 'block' },
          cursor: 'pointer',
        }}
        onClick={toggleDrawer(true)}
      />
      <SwipeableDrawer
        anchor="top"
        open={openMenu}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </Container>
  );
};

export default Header;
