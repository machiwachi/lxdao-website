import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { t } from '@lingui/macro';
import { Box, Typography, Link, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { scrollToSection } from '@/utils/utility';
import Container from './Container';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [community, setCommunity] = useState(null);
  const [governance, setGovernance] = useState(null);
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

  const handleMenuClick = (event, menu) => {
    menu === 'community'
      ? setCommunity(event.currentTarget)
      : setGovernance(event.currentTarget);
  };

  const handleCommunityMenuClose = () => {
    setCommunity(null);
    setGovernance(null);
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
              window.open('https://github.com/lxdao-official/', '_blank');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>GitHub</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              window.open('https://forum.lxdao.io/', '_blank');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Forum</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              window.open('https://forum.lxdao.io/c/governance/10', '_blank');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Weekly</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              window.open(
                'https://forum.lxdao.io/c/governance/monthly-ama/12',
                '_blank'
              );
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>AMA</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              scrollToSection('Invest-Section');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Invest</Typography>
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
          <Typography sx={{ cursor: 'pointer' }}>
            <span
              style={{ float: 'left' }}
              onMouseOver={(event) => {
                handleMenuClick(event, 'community');
              }}
            >
              Community
            </span>
            <KeyboardArrowDownIcon />
            <Menu
              id="community-menu"
              anchorEl={community}
              open={Boolean(community)}
              onClose={() => {
                handleCommunityMenuClose();
              }}
              MenuListProps={{ onMouseLeave: () => handleCommunityMenuClose() }}
            >
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
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
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
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
              </MenuItem>
            </Menu>
          </Typography>
          <Typography>
            <span
              style={{ float: 'left' }}
              onMouseOver={(event) => {
                handleMenuClick(event, 'governance');
              }}
            >
              Governance
            </span>
            <KeyboardArrowDownIcon />
            <Menu
              id="governance-menu"
              anchorEl={governance}
              open={Boolean(governance)}
              onClose={() => {
                handleCommunityMenuClose();
              }}
              MenuListProps={{ onMouseLeave: () => handleCommunityMenuClose() }}
            >
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
                <Link
                  href={`https://forum.lxdao.io/c/governance/weekly/11`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  Weekly
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
                <Link
                  href={`https://forum.lxdao.io/c/governance/monthly-ama/12`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  AMA
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
                <Typography
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    router.push('/invest');
                  }}
                >
                  Invest
                </Typography>
              </MenuItem>
            </Menu>
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
