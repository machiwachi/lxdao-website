'use client';

import React, { useEffect, useState } from 'react';

import { Box, Button, InputBase, Link, Typography } from '@mui/material';

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

const SectionAnniversary = () => {
  const [totalSupply, setTotalSupply] = useState('----');
  const [amt, setAmt] = useState(1);
  const [loading, setLoading] = useState(false);

  const { address: accountAddress, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [buttonText, setButtonText] = useState('Mint');
  const { chains, switchChainAsync } = useSwitchChain();

  const {
    writeContractAsync,
    isPending: isMintPending,
    isSuccess: isMingSuccess,
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
        args: [amt],
        value: parseEther((0.01 * amt).toString()),
      });
      // setTotalSupply((parseInt(totalSupply) + amt).toString());
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
        setButtonText('Mint');
      }
    } else {
      setButtonText('Connect Wallet');
    }
  }, [accountAddress, balanceData]);

  return (
    <Box display="flex">
      <Box flex={1}>
        <Typography variant="body1" color="#101828" fontWeight={600}>
          Mint LXDAO Two-year Anniversary NFT
        </Typography>

        <Box
          mt={1}
          mb={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box ml="30px">
            <InputBase
              sx={{ width: amt.toString().length * 10 + 'px' }}
              value={amt}
              readOnly
              onChange={(e) => {
                if (
                  parseInt(e.target.value) >
                    500 - 100 - parseInt(totalSupply) ||
                  e.toString().length < 1
                ) {
                  return;
                }
                setAmt(parseInt(e.target.value) || 1);
              }}
            />
          </Box>
          <Typography
            variant="subtitle2"
            mx={3}
            fontSize="16px"
            color="#666F85"
          >
            {0.01 * amt} ETH
          </Typography>
          <Typography variant="subtitle2" color="#646F7C">
            {totalSupply}/500
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            sx={{ padding: '11px 20px', boxSizing: 'border-box' }}
            disabled={
              isMingSuccess || isMintPending || loading || balanceData > 0
            }
            onClick={accountAddress ? handleMint : openConnectModal}
          >
            {buttonText}
          </Button>

          <Link
            ml={3}
            target="_blank"
            href="https://optimistic.etherscan.io/address/0x96682f486b4c641c1625ced12d9af54b4c6a1b52"
          >
            <Box component="img" src="/images/etherscan.svg" />
          </Link>
          <Link
            ml={1}
            target="_blank"
            href="https://opensea.io/collection/lxdao2ndanniversarynft"
          >
            <Box component="img" src="/images/opensea.svg" />
          </Link>
        </Box>
      </Box>
      <Box>
        <Box
          component="img"
          height={[0, 0, 121, 121]}
          src="/images/anniversaryNFT2024.png?v=1"
          alt="anniversary NFT"
        />
      </Box>
    </Box>
  );
};

export default SectionAnniversary;
