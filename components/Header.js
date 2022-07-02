import React, { useState } from 'react';
import { t } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { scrollToSection } from '@/utils/utility';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

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
      sx="auto"
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
            <Typography>Core Team</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              scrollToSection('Invest-Section');
            }}
          >
            <Typography>Invest</Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography
              target="_blank"
              component="a"
              href="https://twitter.com/LXDAO_Official"
              color="primary"
            >
              <Box width="32px" component={'img'} src={'/icons/twitter.svg'} />
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Typography
              target="_blank"
              component="a"
              href="https://discord.gg/UBAmmtBs"
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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height={{ md: '80px', xs: '64px' }}
      borderBottom="1px solid #F2F4F7"
    >
      <Box display="flex" marginLeft={{ md: 10, xs: 6 }} alignItems="center">
        <Box width="32px" component={'img'} src={'/icons/logo.svg'} />
        <Typography variant="h5" paddingLeft="10px">{t`LXDAO`}</Typography>
        <Box gap="24px" marginLeft={7} display={{ md: 'flex', xs: 'none' }}>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              scrollToSection('Projects-Section');
            }}
          >
            Projects
          </Typography>
          <Typography
            onClick={() => {
              scrollToSection('CoreTeam-Section');
            }}
          >
            Core Team
          </Typography>
          <Typography
            onClick={() => {
              scrollToSection('Invest-Section');
            }}
          >
            Invest
          </Typography>
        </Box>
      </Box>
      <Box marginRight={10} display={{ md: 'block', xs: 'none' }}>
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
          href="https://discord.gg/UBAmmtBs"
          color="primary"
          marginRight={2}
        >
          <Box width="50px" component={'img'} src={'/icons/discord.svg'} />
        </Typography>
      </Box>
      <MenuIcon
        sx={{
          marginRight: 6,
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
    </Box>
  );
};

export default Header;
