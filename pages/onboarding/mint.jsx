import { useAccount, useContract, useSigner } from 'wagmi';
import { useEffect, useState } from 'react';
import * as bs58 from 'bs58';

import { Box, Typography, Fade } from '@mui/material';

import LXButton from '@/components/Button';
import useBuidler from '@/components/useBuidler';
import { contractInfo } from '@/components/ContractsOperation';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import showMessage from '@/components/showMessage';
import API from '@/common/API';
import { Container } from '@mui/system';

function ipfsToBytes(ipfsURI) {
  const ipfsHash = ipfsURI.replace('ipfs://', '');

  return bs58.decode(ipfsHash).slice(2);
}

export default function Mint() {
  const { address } = useAccount();
  const [, record, , refresh] = useBuidler(address);
  console.log(record);
  const { data: signer } = useSigner();
  const [minting, setMinting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [txResOpen, setTxResOpen] = useState(false);
  const [tx, setTx] = useState(null);
  const [txRes, setTxRes] = useState(null);
  const [animation, setAnimation] = useState(false);
  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const mint = async () => {
    if (minting) return;
    setMinting(true);
    try {
      // get signature
      const signatureRes = await API.post(`/buidler/${address}/signature`);
      const signature = signatureRes.data.data.signature;

      const ipfsURI = record.ipfsURI;
      const bytes = ipfsToBytes(ipfsURI);
      const tx = await contract.mint(bytes, signature);
      setTx(tx);
      setTxOpen(true);
      const response = await tx.wait();
      setTxRes(response);
      setTxOpen(false);
      setTxResOpen(true);
      if (response) {
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
                  width="68px"
                  height="68px"
                  position="absolute"
                  bottom={37}
                  left={37}
                  borderRadius="50%"
                  src={record?.avatar}
                  sx
                ></Box>
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
