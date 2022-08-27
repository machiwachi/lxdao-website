/* eslint-disable no-unused-vars */
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
  Tooltip,
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
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Layout from '@/components/Layout';

import Container from '@/components/Container';
import ProfileForm from '@/components/ProfileForm';
import Skills from '@/components/Skills';
import { formatAddress } from '@/utils/utility';
import { useRouter } from 'next/router';
import API from '@/common/API';
import { useAccount, useContract, useSigner } from 'wagmi';

import { contractInfo } from '@/components/ContractsOperation';

import { BigNumber } from 'ethers';
import BuidlerContacts from '@/components/BuidlerContacts';
import Tag from '@/components/Tag';

function Project({ data }) {
  console.log('project: ', project);
  const project = data.project;
  return (
    <Box display="flex" boxShadow={2} borderRadius={2} overflow="hidden">
      <Box flexBasis="158px">
        <img
          style={{ display: 'block', width: 158 }}
          src={project.logoLarge}
          alt=""
        />
      </Box>
      <Box flex="auto" padding={2} position="relative">
        <Typography variant="h5">{project.name}</Typography>
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
          Project#{project.number}
        </Typography>
      </Box>
    </Box>
  );
}

function BuidlerDetails(props) {
  const record = props.record;
  console.log('record: ', record);

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const [details, setDetails] = useState('buidlerCard');
  const [visible, setVisible] = useState(false);

  // contract token
  const [hasToken, setHasToken] = useState(false);
  // backend status
  const [status, setStatus] = useState('');

  const [tx, setTx] = useState(null);

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

  // todo mint page develop
  const [copyTip, setCopyTip] = useState('Copy to Clipboard');

  return (
    <Container paddingY={10}>
      <Box display="flex">
        <Box marginRight={6}>
          <Box width="150px" borderRadius="50%" overflow="hidden">
            <img
              style={{ display: 'block', width: 150 }}
              src={record.image || '/images/placeholder.jpeg'}
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
          <Box marginTop={4}>
            <Box marginBottom={2}>
              <Typography variant="h4" fontWeight="bold" marginBottom={2}>
                {record.name}
              </Typography>
              <Typography>{record.description}</Typography>
            </Box>
            <Box display="flex" marginBottom={6}>
              <CopyToClipboard
                text={record.address}
                onCopy={() => {
                  setCopyTip('Copied');
                  setTimeout(() => {
                    setCopyTip('Copy to Clipboard');
                  }, 1000);
                }}
              >
                <Tooltip title={copyTip} placement="top">
                  <Box
                    marginRight={1}
                    paddingRight={3}
                    borderRight="1px solid #D0D5DD"
                    display="flex"
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {formatAddress(record.address)}
                    <Box
                      marginLeft={1}
                      width="20px"
                      component={'img'}
                      src={`/icons/copy.svg`}
                      sx={{
                        display: 'block',
                      }}
                    />
                  </Box>
                </Tooltip>
              </CopyToClipboard>
              <Box>
                <BuidlerContacts space={2} contacts={record.contacts} />
              </Box>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography fontWeight="bold" variant="h6" marginBottom={2}>
                Role
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {record.role.map((item) => {
                  return <Tag key={item} text={item} />;
                })}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold" variant="h6" marginBottom={2}>
                Skills
              </Typography>
              <Box display="flex" flexWrap="wrap">
                <Skills skills={record.skills} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold" variant="h6" marginBottom={2}>
                Interests
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {record.interests.map((item) => {
                  return <Tag key={item} text={item} />;
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* todo zero project */}
      <Box marginTop={10}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value="project">
            <Tab label="Project 2" value="project" />
          </Tabs>
        </Box>
        <Box display="flex" marginTop={4}>
          <Grid container spacing={4}>
            {record.projects.map((project) => {
              return (
                <Grid item xs={6} key={project.id}>
                  <Project data={project} />
                </Grid>
              );
            })}
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

  const id = router.query.id;
  useEffect(() => {
    if (id) {
      requestDetail(id);
    }
  }, [id]);

  return <Layout>{record && <BuidlerDetails record={record} />}</Layout>;
}
