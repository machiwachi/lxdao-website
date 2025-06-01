'use client';

import React, { useEffect, useState } from 'react';

import { Box, Link, Typography } from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';
import showMessage from '@/components/showMessage';

import { parseEther } from 'viem';

import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from 'wagmi';

import { anniversaryContract } from '@/abi/index';

import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function AnniversaryNFT2025() {
  const [totalSupply, setTotalSupply] = useState('----');
  const [loading, setLoading] = useState(false);
  const { address: accountAddress, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [buttonText, setButtonText] = useState('MINT NOW');
  const { chains, switchChainAsync } = useSwitchChain();

  const {
    writeContractAsync,
    isPending: isMintPending,
    isSuccess: isMintSuccess,
  } = useWriteContract();

  const { data, isSuccess } = useReadContract({
    ...anniversaryContract,
    functionName: 'totalSupply',
  });

  const { data: balanceData } = useReadContract({
    ...anniversaryContract,
    functionName: 'balanceOf',
    args: [accountAddress],
  });

  const handleMint = async () => {
    try {
      setLoading(true);
      if (chainId != anniversaryContract.chainId) {
        await switchChainAsync({
          chainId: anniversaryContract.chainId,
        });
      }
      await writeContractAsync({
        ...anniversaryContract,
        functionName: 'mint',
      });
      setLoading(false);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Mint Failed',
        body:
          err?.cause?.shortMessage ||
          'Something went wrong. Please try again later.',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTotalSupply(data.toString() || '0');
      setLoading(false);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (accountAddress) {
      if (balanceData > 0) {
        setButtonText('MINTED');
      } else {
        setButtonText('MINT NOW');
      }
    } else {
      setButtonText('Connect Wallet');
    }
  }, [accountAddress, balanceData]);

  return (
    <Box
      sx={{
        width: { lg: '840px', xs: '100%' },
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        mt: '87px',
        py: { lg: '60px', xs: '24px' },
        px: { lg: '48px', xs: '12px' },
        borderRadius: '20px',
      }}
    >
      <Container
        display="flex"
        flexDirection={{ md: 'row', xs: 'column' }}
        alignItems="center"
        gap="48px"
      >
        <Box
          sx={{
            width: '240px',
            height: '240px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '50%',
          }}
        >
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/mp4/anniversaryNFT2025.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { md: 'flex-start', xs: 'center' },
            textAlign: 'left',
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: '32px', xs: '24px' },
              fontWeight: 'bold',
              lineHeight: '120%',
              mb: '16px',
            }}
          >
            LXDAO 3rd Anniversary NFT
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: '16px', xs: '14px' },
              lineHeight: '180%',
              mb: '24px',
              fontWeight: '600',
            }}
          >
            Available only from 2025-06-01 to 2025-06-15
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
          >
            <Button
              variant="gradient"
              borderRadius="100px"
              width="200px"
              disabled={
                isMintSuccess || isMintPending || loading || balanceData > 0
              }
              onClick={accountAddress ? handleMint : openConnectModal}
            >
              {buttonText}
            </Button>

            <Typography variant="subtitle2" ml={2} color="#646F7C">
              minted by {totalSupply} LXers
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
