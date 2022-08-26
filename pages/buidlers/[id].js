/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Link,
  Button,
  Tabs,
  Tab,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
} from '@mui/lab';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import ProfileForm from '@/components/ProfileForm';
import { formatAddress } from '@/utils/utility';
import { useRouter } from 'next/router';
import API from '@/common/API';
import { useAccount, useContract, useSigner } from 'wagmi';

import { contractInfo } from '@/components/ContractsOperation';

import { BigNumber } from 'ethers';

function Tag(props) {
  return (
    <Box
      style={{
        border: '1px solid #D0D5DD',
        borderRadius: '2px',
        padding: '2px 6px',
        marginLeft: '4px',
        marginBottom: '4px',
      }}
    >
      {props.text}
    </Box>
  );
}

function Project() {
  return (
    <Box display="flex" boxShadow={2} borderRadius={1} overflow="hidden">
      <Box flexBasis="158px">
        <img
          style={{ display: 'block', width: 158 }}
          src="/projects/2032-logo-square.png"
          alt=""
        />
      </Box>
      <Box flex="auto" padding={2} position="relative">
        <Typography variant="h5">Web3 In 2032</Typography>
        <Box display="flex" marginTop={2}>
          <Box flex="1">
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#101828',
              }}
            >
              Project Role
            </Typography>
            <Typography>Project Manager</Typography>
          </Box>
          <Box flex="1">
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#101828',
              }}
            >
              Started at
            </Typography>
            <Typography>2022-08-01</Typography>
          </Box>
          <Box flex="1">
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#101828',
              }}
            >
              Ended at
            </Typography>
            <Typography>-</Typography>
          </Box>
        </Box>
        <Typography sx={{ position: 'absolute', top: '24px', right: '36px' }}>
          Project#002
        </Typography>
      </Box>
    </Box>
  );
}

function Links(props) {
  const links = props.links;
  return links.map((link, index) => {
    return (
      <Link marginRight={5} target="_blank" href={link.url} key={index}>
        <Box width="18px" component={'img'} src={`/icons/${link.icon}.svg`} />
      </Link>
    );
  });
}

function BuidlerDetails(props) {
  const record = props.record;

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const [details, setDetails] = useState('buidlerCard');
  const [visible, setVisible] = useState(false);

  // contract token
  const [setHasToken] = useState(false);
  // backend status
  const [setStatus] = useState('');

  const [setTx] = useState(null);

  useEffect(async () => {
    if (!signer) {
      return;
    }
    setStatus(record.status);

    if (isConnected && address === record.address) {
      const result = await contract.balanceOf(address);
      if (BigNumber.isBigNumber(result)) {
        // own sbt
        setHasToken(result.toNumber() > 0);
        // ipfs
      }
    }
  }, [isConnected, signer]);

  const mint = async (signature) => {
    // test
    signature =
      '0x40c835598d05ba1d0ff10a89e87a7a181a1d8be68dae3e808f486166cf5bdf274ce9fe6698391bae2261877bf127381df5646e369e64c92d64565972af10ed351c';

    const tx = await contract.mint(signature);
    setTx(tx);
    const response = await tx.wait();
    console.log(response);
  };

  return (
    <Container paddingY={10}>
      <Box display="flex">
        <Box marginRight={6}>
          <Box width="150px" borderRadius="50%" overflow="hidden">
            <img
              style={{ display: 'block', width: 150 }}
              src="/images/kuncle.jpeg"
              alt=""
            />
          </Box>
          <Box textAlign="center" marginTop={4}>
            <Button
              onClick={() => {
                setVisible(true);
              }}
              size="small"
              variant="outlined"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                mint();
              }}
              size="small"
              variant="outlined"
            >
              Mint
            </Button>
          </Box>
        </Box>
        <Box>
          <Box>
            <Box>
              <Typography variant="h4">Wang Teng</Typography>
              <Typography>
                I am a UI designer with 7 years of work experience, I hope to
                learn more knowledge in WEB3.
              </Typography>
            </Box>
            <Box>
              <Box borderRight="1px solid #D0D5DD">
                <Links
                  links={[
                    {
                      url: 'https://twitter.com/LXDAO_Official',
                      icon: 'website',
                    },
                    {
                      url: 'https://twitter.com/LXDAO_Official',
                      icon: 'twitter',
                    },
                    {
                      url: 'https://twitter.com/LXDAO_Official',
                      icon: 'discord',
                    },
                    {
                      url: 'https://twitter.com/LXDAO_Official',
                      icon: 'ellipsis',
                    },
                  ]}
                />
              </Box>
              <Box>
                {formatAddress('0x147b166fb4f1Aa9581D184596Dbabe2980ba4b14')}
              </Box>
            </Box>
          </Box>
          <Box display="flex">
            <Box flex="1">
              <Typography variant="h5">Role</Typography>
              <Box display="flex" flexWrap="wrap">
                <Tag text="Buidler" />
                <Tag text="Core" />
                <Tag text="Investor" />
                <Tag text="Project Manager" />
              </Box>
            </Box>
            <Box flex="1">
              <Typography variant="h5">Skills</Typography>
              <Box display="flex" flexWrap="wrap">
                <Tag text="UI Design" />
                <Tag text="PM" />
                <Tag text="FrontEnd" />
                <Tag text="Project Manager" />
              </Box>
            </Box>
            <Box flex="1">
              <Typography variant="h5">Interests</Typography>
              <Box display="flex" flexWrap="wrap">
                <Tag text="DAO" />
                <Tag text="DeFI" />
                <Tag text="Solidity" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box marginTop={10}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value="project">
            <Tab label="Project 2" value="project" />
          </Tabs>
        </Box>
        <Box display="flex" marginTop={4}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Project />
            </Grid>
            <Grid item xs={6}>
              <Project />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box marginTop={10}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={details}
            onChange={(event, value) => {
              setDetails(value);
            }}
          >
            <Tab label="Buidler Card" value="buidlerCard" />
            <Tab label="My LXPoints" value="lxPoints" />
          </Tabs>
        </Box>
        <Box padding={2}>
          {details === 'buidlerCard' && (
            <Box>
              <img
                style={{ display: 'block', width: 150 }}
                src="/images/kuncle.jpeg"
                alt=""
              />
            </Box>
          )}
          {details === 'lxPoints' && (
            <Box>
              <Box>
                <Typography variant="h4">Accumulated LXPoints</Typography>
                <Typography>180</Typography>
              </Box>
              <Box>
                <Typography variant="h4">Reason</Typography>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      text for the reason，text for the reasontext for the
                      reasontext for the reason
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                      text for the reason，text for the reasontext for the
                      reasontext for the reason
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        onClose={(event, reason) => {
          if (reason && reason == 'backdropClick') return;
          setVisible(false);
        }}
        open={visible}
      >
        <Box
          onClick={() => {
            setVisible(false);
          }}
          sx={{
            cursor: 'pointer',
          }}
          position="absolute"
          top="16px"
          right="16px"
        >
          <CloseIcon></CloseIcon>
        </Box>
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default function Buidler() {
  const router = useRouter();
  const [record, setRecord] = useState(undefined);

  const requestDetail = async (id) => {
    API.get(`/buidler/${id}`).then((data) => {
      const result = data?.data;
      if (result.status !== 'SUCCESS') {
        // error
        return;
      }
      setRecord(result.data);
    });
  };

  useEffect(() => {
    const id = router.query.id;
    requestDetail(id);
  }, []);

  return (
    <Layout>
      <Header />
      {record && <BuidlerDetails record={record} />}
      <Footer />
    </Layout>
  );
}
