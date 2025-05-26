import React, { useState } from 'react';

import { useRouter } from 'next/router';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Typography,
} from '@mui/material';

import { ConnectWalletButton } from '@/components/ConnectWallet';
import useBuidler from '@/components/useBuidler';

import { useAccount } from 'wagmi';

import OnBoardingAlertBtn from './OnBoardingAlertBtn';

const Header = () => {
  const { address } = useAccount();
  const [openMenu, setOpenMenu] = useState(false);
  const [governanceAnchorEl, setGovernanceAnchorEl] = useState(null);
  const [communityAnchorEl, setCommunityAnchorEl] = useState(null);
  const [, record, ,] = useBuidler(address);
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
    setGovernanceAnchorEl(event.currentTarget);
  };

  const handleGovernanceMenuClose = () => {
    setGovernanceAnchorEl(null);
  };

  const handleCommunityMenuClick = (event) => {
    setCommunityAnchorEl(event.currentTarget);
  };

  const handleCommunityMenuClose = () => {
    setCommunityAnchorEl(null);
  };

  const HiddenMenu = () => (
    <Box
      role="presentation"
      onClick={() => setOpenMenu(false)}
      onKeyDown={() => setOpenMenu(false)}
      sx={{
        width: 250,
        pt: '12px',
      }}
    >
      <List sx={{ py: 0 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/buidlers" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Buidlers" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/workinggroups" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Working Groups" />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding>
          <ListItemButton sx={{ py: 0.75 }}>
            <ListItemText primary="Governance" />
          </ListItemButton>
        </ListItem>
        <List component="div" sx={{ pl: 3, py: 0 }}>
          <Link href="/reward/announcement" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Reward Announcement" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="https://snapshot.org/#/lxdao.eth" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Snapshot" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="https://lxdao.notion.site/Governance-Group-c4ae9fb26068453483a8c1e6abf993b8" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Handbook Doc" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>

        <ListItem disablePadding>
          <ListItemButton sx={{ py: 0.75 }}>
            <ListItemText primary="Community" />
          </ListItemButton>
        </ListItem>
        <List component="div" sx={{ pl: 3, py: 0 }}>
          <Link href="https://www.notion.so/lxdao/1341eee9bd9343a7a60b211de7822af3?v=101f42763e12488999211f15a7b75b81&cookie_sync_completed=true" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Bounty Task" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="https://forum.lxdao.io" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Forum" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="https://t.me/lxdao" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Telegram" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="https://lu.ma/lxdao" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Event" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="https://lxdao.notion.site/" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="Working Docs" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="https://github.com/lxdao-official" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 0.25, minHeight: 28 }}>
                <ListItemText 
                  primary="GitHub" 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    lineHeight: '1.2'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>

        <Link href="https://docs.lxdao.io/lxdao" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Docs" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <>
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
              router.push('/buidlers');
            }}
          >
            Members
          </Typography>
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
              router.push('/workingGroups/list');
            }}
          >
            Working Groups
          </Typography>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
            onClick={handleGovernanceMenuClick}
            id="governance-menu-button"
          >
            <Typography>Governance</Typography>
            <KeyboardArrowDownIcon />
          </Box>
          <Menu
            id="governance-menu"
            anchorEl={governanceAnchorEl}
            open={Boolean(governanceAnchorEl)}
            onClose={handleGovernanceMenuClose}
            MenuListProps={{
              'aria-labelledby': 'governance-menu-button',
            }}
            PaperProps={{
              elevation: 2,
              sx: {
                width: '210px',
                mt: 1.5,
              },
            }}
          >
            {[
              { label: 'Reward Announcement', href: '/reward/announcement' },
              { label: 'Snapshot', href: 'https://snapshot.org/#/lxdao.eth' },
              {
                label: 'Handbook Doc',
                href: 'https://lxdao.notion.site/Governance-Group-c4ae9fb26068453483a8c1e6abf993b8',
              },
            ].map(({ label, href }) => (
              <MenuItem
                key={label}
                onClick={handleGovernanceMenuClose}
                component={Link}
                href={href}
                target="_blank"
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  py: 0.75,
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
          <Link
            href={`https://docs.lxdao.io/lxdao`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <Typography>Docs</Typography>
          </Link>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
            onClick={handleCommunityMenuClick}
            id="community-menu-button"
          >
            <Typography>Community</Typography>
            <KeyboardArrowDownIcon />
          </Box>
          <Menu
            id="community-menu"
            anchorEl={communityAnchorEl}
            open={Boolean(communityAnchorEl)}
            onClose={handleCommunityMenuClose}
            MenuListProps={{
              'aria-labelledby': 'community-menu-button',
            }}
            PaperProps={{
              elevation: 2,
              sx: {
                width: '210px',
                mt: 1.5,
              },
            }}
          >
            {[
              {
                label: 'Bounty Task',
                href: 'https://www.notion.so/lxdao/1341eee9bd9343a7a60b211de7822af3?v=101f42763e12488999211f15a7b75b81&cookie_sync_completed=true',
              },
              { label: 'Forum', href: 'https://forum.lxdao.io' },
              { label: 'Telegram', href: 'https://t.me/lxdao' },
              { label: 'Event', href: 'https://lu.ma/lxdao' },
              { label: 'Working Docs', href: 'https://lxdao.notion.site/' },
              { label: 'GitHub', href: 'https://github.com/lxdao-official' },
            ].map(({ label, href }) => (
              <MenuItem
                key={label}
                onClick={handleCommunityMenuClose}
                component={Link}
                href={href}
                target="_blank"
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  py: 0.75,
                  fontSize: '0.875rem',
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box display="flex" alignItems="center" gap="20px">
          {record?.avatar && (
            <Link
              href={`/buidlers/${record?.address}`}
              sx={{
                cursor: 'pointer',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '0.5px solid #D0D5DD',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
              }}
            >
              {record?.avatar && (
                <Box
                  component="img"
                  src={record?.avatar}
                  alt="avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </Link>
          )}
          <OnBoardingAlertBtn />
          <ConnectWalletButton />
        </Box>

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
    </>
  );
};

export default Header;
