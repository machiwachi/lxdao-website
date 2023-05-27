import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, InputBase } from '@mui/material';
import Container from '@/components/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import showMessage from '@/components/showMessage';
import LXButton from '@/components/Button';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  // useConnect,
} from 'wagmi';

import abi from '@/abi/anniversary.json';

const ADDRESS = '0xBf66f2d9630A033022602c3279b04b4a37399927';

const SectionAnniversary = () => {
  const anniversaryContract = {
    addressOrName: ADDRESS,
    contractInterface: abi,
  };

  const { isConnected, address } = useAccount();
  // const { connect, connectors } = useConnect();
  const [totalSupply, setTotalSupply] = useState('0');
  const [amt, setAmt] = useState(1);
  const [loading, setLoading] = useState(false);

  const { writeAsync } = useContractWrite({
    ...anniversaryContract,
    functionName: 'mint',
    mode: 'recklesslyUnprepared',
    chainId: 1,
  });
  const {
    data: readData,
    isError,
    error,
  } = useContractRead({
    ...anniversaryContract,
    functionName: 'totalSupply',
  });
  console.log(isError, error);
  useEffect(() => {
    console.log(readData, !readData);
    if (!readData?.length) return;
    setTotalSupply(readData[0]?.toString());
  }, [readData]);

  const handleMint = async () => {
    if (!isConnected) {
      // connect({ connector: connectors[2] });
      return;
    }
    try {
      setLoading(true);
      const res = await writeAsync?.({
        recklesslySetUnpreparedArgs: [address, amt],
      });

      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      showMessage({
        type: 'error',
        title: 'Estimate Fail',
        body: 'You may have already minted or other reason.',
      });
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   if (isSuccess) {
  //     showMessage({
  //       type: 'success',
  //       title: `Mint Successfully`,
  //     });
  //   }
  // }, [isSuccess]);

  return (
    <Container
      // height="calc(100vh - 81px)"
      minHeight={{ xs: '660px', md: '217px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            disabled={amt == 1}
            onClick={() => setAmt(amt - (amt == 1 ? 0 : 1))}
          >
            <RemoveCircleOutlineIcon sx={{ transform: 'scale(1.2)' }} />
          </IconButton>
          <InputBase
            sx={{ width: '10px' }}
            value={amt}
            onChange={(e) => {
              setAmt(e.target.value);
            }}
          />
          <IconButton onClick={() => setAmt(amt + 1)}>
            <AddCircleOutlineIcon sx={{ transform: 'scale(1.2)' }} />
          </IconButton>
          <Typography variant="subtitle2" ml="20px" mr="40px">
            {0.02 * amt} ETH
          </Typography>
          <Typography variant="subtitle2" mr="20px">
            {totalSupply}/2000
          </Typography>

          <LXButton disabled={loading} onClick={handleMint} variant="gradient">
            Recharge your conscience
          </LXButton>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionAnniversary;
