import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { t } from '@lingui/macro';
import { Box, Typography, Link, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { scrollToSection } from '@/utils/utility';
import Container from './Container';
import { ConnectWalletButton } from '@/components/ConnectWallet';

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
              router.push('/projects');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Projects</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
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
            <Typography sx={{ cursor: 'pointer' }}>Core Team</Typography>
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
              window.open('https://twitter.com/LXDAO_Official', '_blank');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Twitter</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              window.open('https://discord.com/invite/HtcDdPgJ7D', '_blank');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Discord</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              window.open('https://t.me/LXDAO', '_blank');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Telegram</Typography>
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
              window.open('https://github.com/lxdao-official/', '_blank');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>GitHub</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push('/invest');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Invest</Typography>
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
      maxWidth="100%"
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
          <Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={(event) => {
                handleMenuClick(event, 'community');
              }}
              id="community-menu-trigger"
            >
              <Typography style={{ float: 'left' }}>Community</Typography>
              <KeyboardArrowDownIcon />
            </Box>
            <Menu
              id="community-menu"
              anchorEl={community}
              open={Boolean(community)}
              onClose={() => {
                handleCommunityMenuClose();
              }}
              MenuListProps={{ 'aria-labelledby': 'community-menu-trigger' }}
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Box
                    width="20px"
                    component={'img'}
                    src={`/icons/forum.svg`}
                  />
                  Forum
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
                <Link
                  href={`https://twitter.com/LXDAO_Official`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Box
                    width="20px"
                    component={'img'}
                    src={`/icons/twitter.svg`}
                  />
                  Twitter
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
                <Link
                  href={`https://discord.com/invite/HtcDdPgJ7D`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Box
                    width="20px"
                    component={'img'}
                    src={`/icons/discord.svg`}
                  />
                  Discord
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCommunityMenuClose();
                }}
              >
                <Link
                  href={`https://t.me/LXDAO`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Box
                    width="20px"
                    component={'img'}
                    src={`/icons/telegram.svg`}
                  />
                  Telegram
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={(event) => {
                handleMenuClick(event, 'governance');
              }}
              id="governance-menu-trigger"
            >
              <Typography style={{ float: 'left' }}>Governance</Typography>
              <KeyboardArrowDownIcon />
            </Box>
            <Menu
              id="governance-menu"
              anchorEl={governance}
              open={Boolean(governance)}
              onClose={() => {
                handleCommunityMenuClose();
              }}
              MenuListProps={{ 'aria-labelledby': 'governance-menu-trigger' }}
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
          </Box>
        </Box>
      </Box>
      <ConnectWalletButton />
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
