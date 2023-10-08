import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useBalance, usePublicClient } from 'wagmi';
import {
  Box,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  Container,
} from '@mui/material';
import { Contract, ethers } from 'ethers';

import API from '@/common/API';
import { useEthersSigner } from '@/hooks';
import { ipfsToBytes } from '@/utils/utility';

import CustomButton from '@/components/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; /* eslint-disable no-undef */
import showMessage from '@/components/showMessage';
import { contractInfo } from '@/components/ContractsOperation';
import ProjectCard from '@/components/ProjectCard';
import useBuidler from '@/components/useBuidler';
import LXButton from '@/components/Button';

import { WorkingGroupCard } from '../pages/workingGroups/list';

import Layout from '@/components/Layout';

export default function FirstBadge() {
  const { address } = useAccount();
  const [minting, setMinting] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [, record, , refresh] = useBuidler(address);
  const router = useRouter();
  const [currentAddress, setCurrentAddress] = useState('');
  const [workingGroupsData, setWorkingGroupsData] = useState([]);
  const { data: balance } = useBalance({
    address,
  });
  const publicClient = usePublicClient();
  const signer = useEthersSigner();

  useEffect(() => {
    if (address) {
      setCurrentAddress(address);
    }
  }, [address]);

  useEffect(async () => {
    try {
      const res = await API.get('/workinggroup/list');
      const result = res?.data;
      if (result?.status === 'SUCCESS') {
        setWorkingGroupsData(result?.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to get the working group list',
        body: err.message,
      });
    }
  }, []);

  useEffect(() => {
    API.get(`/project?page=1&per_page=30`)
      .then((res) => {
        if (res?.data?.status === 'SUCCESS') {
          setProjects(res?.data?.data);
        } else {
          // todo Muxin common error handling, function invocation
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const mint = async () => {
    if (minting) return;
    setMinting(true);
    try {
      // get signature
      const signatureRes = await API.post(
        `/buidler/${currentAddress}/signature`
      );
      const signature = signatureRes.data.data.signature;
      const ipfsURI = record.ipfsURI;
      const bytes = ipfsToBytes(ipfsURI);

      const { address, abi } = contractInfo();
      const contract = new Contract(address, abi, signer);

      const callData = contract.interface.encodeFunctionData('mint', [
        bytes,
        signature,
      ]); // 替换为合约函数名和参数
      const tx = {
        account: currentAddress,
        to: address,
        data: callData,
      };
      const gasEstimate = await publicClient.estimateGas(tx);
      if (balance.value < gasEstimate) {
        throw new Error(
          `Not enough gas, probably at least ${ethers.formatEther(
            gasEstimate
          )} gas.`
        );
      }

      const response = await contract.mint(bytes, signature);
      if (response && response.hash) {
        await API.post('/buidler/activate');
        refresh();
        router.push(`/buidlers/${currentAddress}`);
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to mint',
        body: err.message,
      });
    }
    setMinting(false);
  };
  return (
    <Layout>
      <Container
        sx={{
          maxWidth: 1216,
          display: 'flex',
          flexDirection: 'column',
          mb: '55px',
        }}
      >
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="inherit"
              href={`/buidlers/${currentAddress}?isFromOnboarding=true`}
            >
              <Typography variant="body1">Member profile</Typography>
            </Link>
            <Link underline="none" color="#437EF7" aria-current="page">
              <Typography variant="body1">Earn your SBT Card</Typography>
            </Link>
          </Breadcrumbs>
        </Box>
        <Stack
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: { xs: 'center', md: 'left' },
            gap: 3,
            py: 6,
          }}
        >
          <Box position="relative">
            <Box
              sx={{
                position: 'absolute',
                width: '145.8px',
                borderBottom: '28.28px solid #d0d5dd',
                borderLeft: '28.28px solid transparent',
                borderRight: '28.28px solid transparent',
                textAlign: 'center',
                transform: 'rotate(-45deg)',
                top: 27.5,
                left: -31.5,
              }}
            ></Box>
            <Box
              sx={{
                position: 'absolute',
                width: '145.8px',
                height: '28.28px',
                textAlign: 'center',
                transform: 'rotate(-45deg)',
                top: 27.5,
                left: -31.5,
              }}
            >
              <Typography color="#fff" variant="body2" lineHeight="28.28px">
                To be earned
              </Typography>
            </Box>

            <Box
              component="img"
              src="/images/card.png"
              width="368px"
              //   height="180px"
            ></Box>
          </Box>

          <Typography
            fontFamily="Inter"
            fontSize="48px"
            lineHeight="44px"
            fontWeight="800"
          >
            Earn your SBT Card
          </Typography>
          <Typography fontSize="20px" color="#666F85">
            Governance rights entitled
          </Typography>
          <LXButton
            variant="gradient"
            width="200px"
            disabled={!(record?.status == 'READYTOMINT')}
            onClick={() => {
              mint();
            }}
          >
            {minting ? 'Minting...' : 'Mint'}
          </LXButton>
          <Typography fontSize="16px" color="#666F85">
            Contribute in projects, working groups or pick up some bounty tasks
            from{' '}
            <Link
              href="https://www.notion.so/lxdao/1341eee9bd9343a7a60b211de7822af3?v=101f42763e12488999211f15a7b75b81"
              target="_blank"
            >
              here
            </Link>{' '}
            to earn up to 500 LXU reward. Then request a current member with SBT
            held to initialize a proposal.
          </Typography>
        </Stack>
        <Stack gap={3} mb={3}>
          <Typography variant="subtitle2" fontWeight="800">
            Working groups
          </Typography>
          <Box
            display="flex"
            gap="24px"
            flexWrap="wrap"
            justifyContent={{ xs: 'center', md: 'center', lg: 'flex-start' }}
          >
            {workingGroupsData.length > 0 &&
              workingGroupsData.map((item, index) => {
                return (
                  <WorkingGroupCard key={index} data={item} width="368px" />
                );
              })}
          </Box>
        </Stack>
        <Stack gap={3}>
          <Typography variant="subtitle2" fontWeight="800">
            Projects
          </Typography>
          <Box overflow="scroll">
            <Box
              display="flex"
              flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
              alignItems="stretch"
              flexWrap="nowrap"
              gap={3}
            >
              {projects.map((project, index) => {
                return (
                  <Box
                    width={{
                      md: '500px',
                      sm: 'calc(100% - 40px)',
                      xs: 'calc(100% - 40px)',
                    }}
                    key={index}
                    flexShrink={0}
                    marginLeft={{
                      sm: 'auto',
                      xs: 'auto',
                    }}
                    marginRight={{
                      sm: 'auto',
                      xs: 'auto',
                    }}
                  >
                    <ProjectCard project={project} />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <CustomButton variant="outlined" width="200px">
            <Link
              href="/projects"
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              View all projects
            </Link>
          </CustomButton>
        </Stack>
      </Container>
    </Layout>
  );
}
