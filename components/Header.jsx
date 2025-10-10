import { useState } from 'react';

import { useRouter } from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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

  const MobileMenu = () => (
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
        <Link
          href="https://www.notion.so/lxdao/Introduction-723ae07d53fd40b79928d227afd6a487"
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          href="/buidlers"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Members" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          href="https://lxdao.notion.site/LXDAO-Buidl-288dceffe40b8033a8ccdc65b83189cf"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Buidl" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          href="https://lxdao.notion.site/LXDAO-27edceffe40b80ffae24d0ab3a17c650"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Governance" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          href="https://forum.lxdao.io"
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0.75 }}>
              <ListItemText primary="Forum" />
            </ListItemButton>
          </ListItem>
        </Link>
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
        <Link
          href="https://www.notion.so/lxdao/Introduction-723ae07d53fd40b79928d227afd6a487"
          target="_blank"
          color={'inherit'}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Typography>About</Typography>
        </Link>

        <Link
          href="/buidlers"
          target="_blank"
          color={'inherit'}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Typography>Members</Typography>
        </Link>
        <Link
          href="https://lxdao.notion.site/LXDAO-Buidl-288dceffe40b8033a8ccdc65b83189cf"
          target="_blank"
          color={'inherit'}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Typography>Buidl</Typography>
        </Link>
        <Link
          href="https://lxdao.notion.site/LXDAO-27edceffe40b80ffae24d0ab3a17c650"
          target="_blank"
          color={'inherit'}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Typography>Governance</Typography>
        </Link>

        <Link
          href="https://forum.lxdao.io"
          target="_blank"
          color={'inherit'}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Typography>Forum</Typography>
        </Link>
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
        <MobileMenu />
      </SwipeableDrawer>
    </Box>
  );
};

export default Header;
