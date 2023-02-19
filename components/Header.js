import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Link, Menu, MenuItem, Tooltip } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled as muistyle } from '@mui/material/styles';
import styled, { keyframes } from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAccount } from 'wagmi';
import useBuidler from './useBuidler';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { ConnectWalletButton } from '@/components/ConnectWallet';

const LightTooltip = muistyle(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '6px',
    color: '#666F85',
    fontSize: '16px',
    maxWidth: 400,
    lineHeight: '24px',
  },
}));

const RotateAni = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const RotateBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 46px;
  height: 46px;
  animation: ${RotateAni} 10s linear infinite;

  background-image: url('/icons/ani-border.svg');
`;

const RotateAniR = keyframes`
  to {
    transform: rotate(-360deg);
  }
`;
const RotateContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(180deg, #00fb8c 0%, #36aff9 100%);
  cursor: pointer;
  animation: ${RotateAniR} 10s linear infinite;
`;

const Header = () => {
  const { address } = useAccount();
  console.log(address);
  const [, buidler] = useBuidler(address);
  const [openMenu, setOpenMenu] = useState(false);
  const [governance, setGovernance] = useState(null);
  const router = useRouter();

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

  const handleGovernanceMenuClick = (event) => {
    setGovernance(event.currentTarget);
  };

  const handleGovernanceMenuClose = () => {
    setGovernance(null);
  };

  const HiddenMenu = () => (
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
              router.push('/buidlers');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Buidlers</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`https://forum.lxdao.io/c/governance/10`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Weekly Update</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`https://forum.lxdao.io/c/governance/monthly-ama/12`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Monthly AMA</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height={{ md: '128px', sm: '120px', xs: '120px' }}
      maxWidth="1216px"
      marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
    >
      <Box
        onClick={() => {
          router.push('/');
        }}
        sx={{ cursor: 'pointer' }}
        display="flex"
      >
        <Box
          width={{ md: '120px', sm: '120px', xs: '80px' }}
          component={'img'}
          src={'/icons/lxdao-logo.svg'}
        />
      </Box>
      <Box
        gap={4}
        display={{ md: 'flex', sm: 'none', xs: 'none' }}
        fontSize={2}
        lineHeight={3}
      >
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
            router.push('/buidlers');
          }}
        >
          Buidlers
        </Typography>
        <Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={(event) => {
              handleGovernanceMenuClick(event);
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
              handleGovernanceMenuClose();
            }}
            MenuListProps={{ 'aria-labelledby': 'governance-menu-trigger' }}
          >
            <MenuItem
              onClick={() => {
                handleGovernanceMenuClose();
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
                Weekly Update
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleGovernanceMenuClose();
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
                Monthly AMA
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <LightTooltip
        title="Click me to complete the onborading process."
        sx={{ backgroundColor: '#fff' }}
      >
        <RotateBorder>
          <RotateContent>
            {/* <AccountCircleIcon /> */}
            <Box component="img" src="/icons/user-block.svg"></Box>
            <Box
              sx={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '900',
                lineHeight: '20px',
                backgroundColor: '#FF0000',
                left: '52%',
                bottom: '52%',
                border: '2px solid #fff',
              }}
            >
              !
            </Box>
          </RotateContent>
        </RotateBorder>
      </LightTooltip>

      <ConnectWalletButton />
      <MenuIcon
        sx={{
          display: { md: 'none', sm: 'block', xs: 'block' },
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
        <HiddenMenu />
      </SwipeableDrawer>
    </Box>
  );
};

export default Header;
