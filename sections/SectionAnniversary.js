import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  // IconButton,
  InputBase,
  Link,
  Button,
} from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import showMessage from '@/components/showMessage';
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
} from 'wagmi';
import { parseEther } from 'viem';

import abi from '@/abi/anniversary.json';

const ADDRESS = process.env.NEXT_PUBLIC_ANNIVERSARY_CONTRACT_ADDRESS;
const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);

const SectionAnniversary = () => {
  const anniversaryContract = {
    address: ADDRESS,
    abi,
    chainId: 10,
  };

  const { isConnected, address: accountAddress } = useAccount();
  const { connect, connectors } = useConnect();
  const [totalSupply, setTotalSupply] = useState('----');
  const [amt, setAmt] = useState(1);
  const [loading, setLoading] = useState(true);

  const {
    write,
    error: contractWriteError,
    isLoading: isMinting,
    isSuccess: isMingSuccess,
  } = useContractWrite({
    ...anniversaryContract,
    functionName: 'mint',
  });

  const { data, isSuccess } = useContractRead({
    ...anniversaryContract,
    functionName: 'totalSupply',
  });

  const { data: balanceData } = useContractRead({
    ...anniversaryContract,
    functionName: 'balanceOf',
    args: [accountAddress],
  });

  useEffect(() => {
    if (isSuccess) {
      setTotalSupply(data.toString() || '0');
      setLoading(false);
    }
  }, [data, isSuccess]);

  const handleMint = async () => {
    if (!isConnected) {
      connect({ connector: connectors[2] });
      return;
    }
    try {
      setLoading(true);
      await write({
        args: [amt],
        value: parseEther((0.01 * amt).toString()),
      });
      // setTotalSupply((parseInt(totalSupply) + amt).toString());
      setLoading(false);
    } catch (err) {
      if (err.toString().includes('ChainMismatchError')) {
        showMessage({
          type: 'error',
          title: 'Wrong Network',
          body: `Please Change to ${
            CHAIN_ID == 10 ? 'Optimism' : 'ETH Goerli'
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
    if (contractWriteError) {
      showMessage({
        type: 'error',
        title: 'error',
        body: contractWriteError.message,
      });
    }
  }, [contractWriteError]);

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
          {/* <IconButton
            sx={{ width: '20px', height: '20px', marginRight: '8px' }}
            disabled={amt == 1}
            onClick={() => setAmt(amt - (amt == 1 ? 0 : 1))}
          >
            <RemoveCircleOutlineIcon sx={{ transform: 'scale(0.9)' }} />
          </IconButton> */}
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
          {/* <IconButton
            sx={{ width: '20px', height: '20px', marginLeft: '8px' }}
            // onClick={() => setAmt(amt + 1)}
          >
            <AddCircleOutlineIcon sx={{ transform: 'scale(0.9)' }} />
          </IconButton> */}

          <Typography
            variant="subtitle2"
            mx={3}
            fontSize="16px"
            color="#666F85"
          >
            {0.01 * amt} ETH
            {/* Free */}
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
              isMinting ||
              isMingSuccess ||
              loading ||
              balanceData > 0 ||
              !accountAddress
            }
            onClick={handleMint}
          >
            {balanceData > 0 ? 'MINTED' : 'Mint'}
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
          // width={[0, 0, 151, 151]}
          height={[0, 0, 121, 121]}
          src="/images/anniversaryNFT2024.png?v=1"
          alt="anniversary NFT"
        />
      </Box>
    </Box>
  );
};

export default SectionAnniversary;
