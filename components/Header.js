import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

import {
  Box,
  Typography,
  Link,
  Menu,
  MenuItem,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import OnBoardingAlertBtn from './OnBoardingAlertBtn';
import { ConnectWalletButton } from '@/components/ConnectWallet';
import useBuidler from '@/components/useBuidler';

const Header = () => {
  const { address } = useAccount();
  const [openMenu, setOpenMenu] = useState(false);
  const [governance, setGovernance] = useState(null);
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
            href={`https://lxdao.notion.site/`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Docs</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`/reward/announcement`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>
                Reward Announcement
              </Typography>
            </ListItemButton>
          </Link>
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
        <ListItem disablePadding>
          <Link
            href={`https://www.notion.so/lxdao/1341eee9bd9343a7a60b211de7822af3?v=101f42763e12488999211f15a7b75b81`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Bounty Task</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
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
            Members
          </Typography>
          <Link
            href={`https://lxdao.notion.site/`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <Typography>Docs</Typography>
          </Link>
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
              MenuListProps={{
                'aria-labelledby': 'governance-menu-trigger',
              }}
              PaperProps={{ sx: { width: '210px' } }}
            >
              <MenuItem
                onClick={() => {
                  handleGovernanceMenuClose();
                }}
              >
                <Link
                  href={`/reward/announcement`}
                  target="_blank"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  Reward Announcement
                </Link>
              </MenuItem>

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
          <Link
            href={`https://www.notion.so/lxdao/1341eee9bd9343a7a60b211de7822af3?v=101f42763e12488999211f15a7b75b81`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <Typography>Bounty Task</Typography>
          </Link>
        </Box>
        <Box display="flex" alignItems="center" gap="20px">
          {record && (
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
              }}
            >
              <Box
                component={'img'}
                src={record?.avatar}
                width="30px"
                height="30px"
              />
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
