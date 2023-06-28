import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, InputBase, Link } from '@mui/material';
import Container from '@/components/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import showMessage from '@/components/showMessage';
import LXButton from '@/components/Button';
import { useAccount, useContractWrite, useConnect } from 'wagmi';
import { ethers } from 'ethers';

import abi from '@/abi/anniversary.json';

const ADDRESS = process.env.NEXT_PUBLIC_ANNIVERSARY_CONTRACT_ADDRESS;
const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
const RPC_URL =
  (CHAIN_ID == 1
    ? 'https://mainnet.infura.io/v3/'
    : 'https://goerli.infura.io/v3/') + process.env.NEXT_PUBLIC_INFURA_ID;

const SectionAnniversary: React.FC = () => {
  const anniversaryContract = {
    addressOrName: ADDRESS,
    contractInterface: abi,
  };

  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [totalSupply, setTotalSupply] = useState('----');
  const [amt, setAmt] = useState(1);
  const [loading, setLoading] = useState(true);

  const { writeAsync } = useContractWrite({
    ...anniversaryContract,
    functionName: 'mint',
    mode: 'recklesslyUnprepared',
    chainId: CHAIN_ID,
  });

  const handleMint = async () => {
    if (!isConnected) {
      connect({ connector: connectors[2] });
      return;
    }
    try {
      setLoading(true);
      const tx = await writeAsync?.({
        recklesslySetUnpreparedArgs: [amt],
        recklesslySetUnpreparedOverrides: {
          value: ethers.utils.parseEther((0.02 * amt).toString()),
        },
      });
      const res = await tx?.wait(1);
      setTotalSupply((parseInt(totalSupply) + amt).toString());
      setLoading(false);
    } catch (err) {
      if (err.toString().includes('ChainMismatchError')) {
        showMessage({
          type: 'error',
          title: 'Wrong Network',
          body: `Please Change to ${
            CHAIN_ID == 1 ? 'ETH Mainnet' : 'ETH Goerli'
          }`,
        });
      } else {
        showMessage({
          type: 'error',
          title: 'Estimate Fail',
          body: 'You may have already minted or other reason.',
        });
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const anniContract = new ethers.Contract(ADDRESS, abi, provider);
      const res = await anniContract.totalSupply();
      setTotalSupply(res.toString() || '0');
      setLoading(false);
    })();
  }, []);
  return (
    <Container
      minHeight={{ xs: 'calc(100vh - 120px)', md: '217px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
      sx={{
        borderBottom: '1px solid #F3F3F3',
      }}
    >
      <Box component="img" src="/images/anniversaryNFT.png" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="500"
          sx={{
            background: 'linear-gradient(to right, #366eff, #23e5ff, #ff7fdb)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          LXDAO One-Year Anniversary NFT is on sale (limited to 2000)
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              disabled={amt == 1}
              onClick={() => setAmt(amt - (amt == 1 ? 0 : 1))}
            >
              <RemoveCircleOutlineIcon sx={{ transform: 'scale(1.2)' }} />
            </IconButton>
            <InputBase
              sx={{ width: amt.toString().length * 10 + 'px' }}
              value={amt}
              onChange={(e) => {
                if (
                  parseInt(e.target.value) >
                    2000 - 100 - parseInt(totalSupply) ||
                  e.toString().length < 1
                ) {
                  return;
                }
                setAmt(parseInt(e.target.value) || 1);
              }}
            />
            <IconButton onClick={() => setAmt(amt + 1)}>
              <AddCircleOutlineIcon sx={{ transform: 'scale(1.2)' }} />
            </IconButton>
            <Typography variant="subtitle2" ml="20px" mr="40px">
              {0.02 * amt} ETH
            </Typography>
            <Typography variant="subtitle2">{totalSupply}/2000</Typography>
          </Box>

          <LXButton disabled={loading} onClick={handleMint} variant="gradient">
            Mint
          </LXButton>
        </Box>
        <Box sx={{ display: 'flex' }} gap={1}>
          <Link
            target="_blank"
            href="https://etherscan.io/address/0x854c0f99f67e37b8f4d5ad92ea7f69cd193b058a"
          >
            <Box component="img" src="/images/etherscan.svg" />
          </Link>
          <Link
            target="_blank"
            href="https://opensea.io/collection/lxdao1stanniversarynft"
          >
            <Box component="img" src="/images/opensea.svg" />
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionAnniversary;
