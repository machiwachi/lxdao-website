import React, { use, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import CustomButton from '@/components/Button';
import LXButton from '@/components/Button';
import Layout from '@/components/Layout';
import ProjectCard from '@/components/projects/ProjectCard';

/* eslint-disable no-undef */
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';
import WorkingGroupCard from '@/components/workingGroups/WorkingGroupCard';

import { toBytes, toHex } from 'viem';

import {
  useAccount,
  useBalance,
  useSwitchChain,
  useWriteContract,
} from 'wagmi';

import { buidlerContract } from '@/abi/index';
import API from '@/common/API';
import { ipfsToBytes } from '@/utils/utility';

export default function MintCard() {
  const { address, chainId } = useAccount();
  const [minting, setMinting] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [, record, , refresh] = useBuidler(address);
  console.log({ record, address });
  const router = useRouter();
  const [workingGroupsData, setWorkingGroupsData] = useState([]);
  const { data: balance } = useBalance({
    address,
  });
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isError, error } = useWriteContract();

  useEffect(() => {
    (async () => {
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
    })();
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
      if (chainId != buidlerContract.chainId) {
        await switchChainAsync({
          chainId: buidlerContract.chainId,
        });
      }
      const signatureRes = await API.post(`/buidler/${address}/signature`);
      const signature = signatureRes.data.data.signature;
      const ipfsURI = record.ipfsURI;
      const bytes = ipfsToBytes(ipfsURI);
      const hash = await writeContractAsync({
        ...buidlerContract,
        functionName: 'mint',
        args: [toHex(bytes), signature],
      });
      if (hash) {
        await API.post('/buidler/activate');
        refresh();
        router.push(`/buidlers/${address}`);
      }
    } catch (err) {
      console.log(typeof err);
      showMessage({
        type: 'error',
        title: 'Failed to mint',
        body: err.toString(),
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
              href={`/buidlers/${address}?isFromOnboarding=true`}
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
            disabled={false}
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
            to earn up to 500 LXPU reward. Then request a current member with
            SBT held to initialize a proposal.
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
