import { useAccount, useContractWrite } from 'wagmi';
import React, { useState } from 'react';
import { Contract } from 'ethers';

import { Box, Typography, Fade } from '@mui/material';

import LXButton from '@/components/Button';
import useBuidler from '@/components/useBuidler';
import { contractInfo } from '@/components/ContractsOperation';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import showMessage from '@/components/showMessage';
import API from '@/common/API';
import { Container } from '@mui/system';
import { ipfsToBytes } from '@/utils/utility';
import { useEthersSigner } from '@/hooks';

import { Img3 } from '@lxdao/img3';
import { getImg3DidStrFromUrl } from '@/utils/utility';

export default function Mint() {
  const { address } = useAccount();
  const [, record, , refresh] = useBuidler(address);
  const [minting, setMinting] = useState(false);
  const [animation, setAnimation] = useState(false);
  const signer = useEthersSigner();

  const mint = async () => {
    if (minting) return;
    setMinting(true);
    try {
      // get signature
      const signatureRes = await API.post(`/buidler/${address}/signature`);
      const signature = signatureRes.data.data.signature;

      const ipfsURI = record.ipfsURI;
      const bytes = ipfsToBytes(ipfsURI);

      const { address, abi } = contractInfo();
      const contract = new Contract(address, abi, signer);
      const response = await contract.mint(bytes, signature);

      if (response && response.hash) {
        await API.post('/buidler/activate');
        refresh();
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to mint',
        body: err.message,
      });
    }
    setMinting(false);
    setAnimation(true);
  };

  return (
    <OnBoardingLayout
      title="Free, Only gas."
      desc="Mint your LXDAO Buidler Card"
      back="/onboarding/profile"
      next="done"
      disableNext={record?.status != 'ACTIVE'}
    >
      <Box
        sx={{
          display: 'flex',
          paddingTop: '32px',
          paddingBottom: '107px',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: '80px',
        }}
      >
        <Box position="relative">
          <Box
            component="img"
            src="/images/card.png"
            sx={{ width: { xs: '100%', md: '545px' } }}
            marginBottom={'83px'}
            margin="auto"
          />
          <Fade in={animation} timeout={3000} easing={'ease-out'}>
            {
              <Container>
                <Box
                  component="img"
                  src={record?.avatar}
                  alt="avatar"
                  style={{
                    width: '68px',
                    height: '68px',
                    position: 'absolute',
                    bottom: '37px',
                    left: '37px',
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  color="white"
                  position="absolute"
                  bottom={50}
                  left={127}
                  fontWeight={500}
                  fontSize={24}
                >
                  {record?.name}
                </Typography>
              </Container>
            }
          </Fade>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'start' },
            mt: { xs: '20px', md: '0' },
          }}
        >
          <Typography variant="subtitle1" fontWeight="800" color="#101828">
            HOW TO MINT
          </Typography>
          <Typography
            variant="body1"
            color="#666F85"
            whiteSpace={'pre-wrap'}
            lineHeight="24px"
            mt={{ sm: 1, md: 4 }}
          >
            {
              '1. Reach out to your Buddy to schedule an onboarding session.\n2. During the onboarding session, your Buddy will review your profile and provide answers to any questions you may have.\n3. Then your Buddy will enable your LXDAO Builder Card minting access, allowing you to create your own unique LXDAO Builder Card.'
            }
          </Typography>
          <LXButton
            variant="gradient"
            width="148px"
            my={4}
            disabled={!(record?.status == 'READYTOMINT')}
            onClick={() => {
              mint();
            }}
          >
            {minting ? 'Minting...' : 'Mint'}
          </LXButton>
          <Typography variant="body2" color="#666F85" whiteSpace={'pre-wrap'}>
            {
              'Free, Only gas.\nMint success meaning officially become a LXDAO Buidler'
            }
          </Typography>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}
