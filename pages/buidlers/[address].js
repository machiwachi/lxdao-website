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
  Alert,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import _ from 'lodash';
import SyncIcon from '@mui/icons-material/Sync';
import { useContract, useAccount, useSigner } from 'wagmi';
import * as bs58 from 'bs58';

import Layout from '@/components/Layout';
import CopyText from '@/components/CopyText';
import Container from '@/components/Container';
import ProfileForm from '@/components/ProfileForm';
import Skills from '@/components/Skills';
import { formatAddress } from '@/utils/utility';
import API from '@/common/API';
import { getEtherScanDomain, getOpenSeaDomain } from '@/utils/utility';
import { contractInfo } from '@/components/ContractsOperation';
import BuidlerContacts from '@/components/BuidlerContacts';
import Tag from '@/components/Tag';
import showMessage from '@/components/showMessage';
import Project from '@/components/Project';
import { convertIpfsGateway } from '@/utils/utility';
import LXButton from '@/components/Button';
import WorkingGroupCard from '@/components/WorkingGroupCard';

import workingGroupsData from '@/common/content/workingGroups';

function totalLXPoints(record) {
  if (!record.lxPoints) {
    return 0;
  }

  return record.lxPoints.reduce((total, point) => {
    if (point.operator === '+') {
      return total + point.value;
    }
    if (point.operator === '-') {
      return total - point.value;
    }
    return total;
  }, 0);
}

function LXPointsTable({ points }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">remuneration</TableCell>
            <TableCell align="left">reason</TableCell>
            <TableCell align="left">source</TableCell>
            <TableCell align="left">release time</TableCell>
            <TableCell align="right">transaction link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {points.map((point) => (
            <TableRow
              key={point.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {point.value}
              </TableCell>
              <TableCell align="right">{point.reason}</TableCell>
              <TableCell align="right">{point.source}</TableCell>
              <TableCell align="right">{point.createdAt}</TableCell>
              <TableCell align="right">view</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ipfsToBytes(ipfsURI) {
  const ipfsHash = ipfsURI.replace('ipfs://', '');

  return bs58.decode(ipfsHash).slice(2);
}

function BuidlerDetails(props) {
  const record = props.record;
  record.lxPoints = [
    { id: 1, value: 12 },
    { id: 2, value: 12 },
    { id: 3, value: 15 },
    { id: 4, value: 12 },
    { id: 5, value: 12 },
  ];
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [minting, setMinting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const [tx, setTx] = useState(null);
  const [txRes, setTxRes] = useState(null);

  // tokenId on chain
  const [tokenId, setTokenId] = useState(null);
  // ipfsURL on chain
  const [ipfsURLOnChain, setIpfsURLOnChain] = useState(null);

  useEffect(async () => {
    if (!signer) {
      return;
    }

    if (isConnected && address === record.address) {
      await getToken(address);
    }
  }, [isConnected, signer]);

  const getToken = async (address) => {
    let result = await contract.balanceOf(address);
    if (result.toNumber() === 0) {
      console.log('has no token.');
      return;
    }

    const tokenId = await contract.tokenIdOfOwner(address);
    setTokenId(tokenId.toNumber());
    await getOnChainIpfsURL(tokenId);
  };

  const getOnChainIpfsURL = async (tokenId) => {
    const result = await contract.tokenURI(tokenId);
    if (result && result.length > 0) {
      setIpfsURLOnChain(result);
    }
  };

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
      const response = await tx.wait();
      setTxRes(response);

      if (response) {
        await API.post('/buidler/activate');
        props.refresh();
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

  const enableMint = async () => {
    try {
      const enableMintRes = await API.post(
        `/buidler/${record.address}/enableMint`
      );
      const data = enableMintRes.data.data;
      alert('Success!');
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to enable mint access',
        body: err.message,
      });
    }
  };

  const saveProfileHandler = async (newMetaData) => {
    setUpdating(true);
    const userProfile = {
      ...newMetaData,
      role: record.role.length === 0 ? ['Buidler'] : record.role,
      // set the NFT image
      image: `https://api.lxdao.io/buidler/${record.address}/card`,
    };
    try {
      const response = await API.put(`/buidler/${address}`, {
        metaData: userProfile,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      }
      setVisible(false);
      props.refresh();
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to update profile',
        body: err.message,
      });
    }
    setUpdating(false);
  };

  const projects = record.projects.filter((project) => {
    return project.status === 'ACTIVE';
  });

  const buddies = record.buddies.map((buddy) => buddy.address);
  const isBuddyChecking = buddies.includes(address);

  const createdAt =
    record.createdAt &&
    new Date(Date.parse(record.createdAt)).toDateString().split(' ');

  return (
    <Container>
      {address === record.address &&
        !!ipfsURLOnChain &&
        ipfsURLOnChain !== record.ipfsURI && (
          <Box marginTop={4}>
            <Alert severity="info">
              We found your latest information not synced on the Ethereum,
              please click{' '}
              <Button
                onClick={async () => {
                  setSyncing(true);
                  try {
                    const syncInfoRes = await API.post(
                      `/buidler/${address}/syncInfo`
                    );
                    if (syncInfoRes?.data?.status !== 'SUCCESS') {
                      throw new Error(syncInfoRes?.data.message);
                    }
                    const { signature, ipfsURI } =
                      syncInfoRes?.data?.data || {};
                    const tx = await contract.updateMetadata(
                      tokenId,
                      ipfsToBytes(ipfsURI),
                      signature
                    );
                    await tx.wait();
                    await getToken(address);
                    // todo add tx to the page
                  } catch (err) {
                    showMessage({
                      type: 'error',
                      title: 'Failed to update metadata',
                      body: err.message,
                    });
                  }
                  setSyncing(false);
                }}
                size="small"
                variant="outlined"
                disabled={syncing}
              >
                <SyncIcon fontSize="small"></SyncIcon>{' '}
                {syncing ? 'Syncing...' : 'Sync My Profile'}
              </Button>
              . You need to pay for the Gas fee, we suggest you finish every
              update and then sync them together.
            </Alert>
          </Box>
        )}
      {address === record.address && record.status === 'PENDING' && (
        <Box marginTop={4}>
          <Alert severity="success">
            Welcome LXDAO. Please fill up the form first, and your Buddy will
            enable your Mint access on the Onboarding Session. Thanks.
          </Alert>
          <Box marginTop={2} marginBottom={2}>
            <Button disabled={true} variant="outlined">
              {minting ? 'Minting Builder Card...' : 'Mint Builder Card'}
            </Button>
          </Box>
        </Box>
      )}
      {address === record.address && record.status === 'READYTOMINT' && (
        <Box marginTop={4}>
          <Alert severity="info">
            Welcome LXDAO. Your Buidler Card is Ready to Mint.
          </Alert>
          <Box marginTop={2} marginBottom={2}>
            <LXButton
              onClick={() => {
                mint();
              }}
            >
              {minting ? 'Minting Builder Card...' : 'Mint Builder Card'}
            </LXButton>
          </Box>
          <Box display="flex" justifyContent="center">
            We will arrange on-boarding as soon as possible and help you mint
            buidler card
          </Box>
        </Box>
      )}
      {isBuddyChecking && (
        <Box marginTop={4}>
          <Alert severity="info">Enable Mint Access</Alert>
          <Box marginTop={2} marginBottom={2}>
            <Button
              onClick={() => {
                enableMint();
              }}
              variant="outlined"
            >
              Enable Mint Access
            </Button>
          </Box>
        </Box>
      )}
      {tx && (
        <Alert severity="info">
          Minting, tx:{' '}
          <Link
            marginBottom={2}
            target="_blank"
            href={`https://${getEtherScanDomain()}/tx/${tx.hash}`}
          >
            {tx.hash}
          </Link>
        </Alert>
      )}

      {txRes && (
        <Box marginBottom={2}>
          <Alert severity="success">
            Minted successfully, check on{' '}
            <Link
              target="_blank"
              color={'inherit'}
              href={`https://${getOpenSeaDomain()}/account`}
            >
              OpenSea
            </Link>
            . Please refresh the page.
          </Alert>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection={{
          xs: 'column',
          md: 'row',
        }}
      >
        {/* left section*/}
        <Box width="300px">
          <Box
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            display="flex"
            padding={3}
          >
            <Box>
              <Box
                width="252px"
                height="252px"
                border="0.5px solid #D0D5DD"
                borderRadius="6px"
                overflow="hidden"
              >
                <img
                  style={{ display: 'block', width: 252 }}
                  src={
                    convertIpfsGateway(record.avatar) ||
                    '/images/placeholder.jpeg'
                  }
                  alt=""
                />
              </Box>
              <Typography
                variant="h5"
                fontWeight="500"
                textAlign="center"
                marginTop={3}
                marginBottom={1}
              >
                {record.name}
              </Typography>
              <Box display="flex" justifyContent="center">
                <CopyText
                  textAlign="center"
                  copyTextOriginal={record.address}
                  copyText={formatAddress(record.address)}
                />
              </Box>
              <Divider
                sx={{
                  marginTop: '24px',
                  borderColor: '#E5E5E5',
                }}
              />
              {record.description && (
                <Box marginTop={3}>
                  <Typography>{record.description}</Typography>
                </Box>
              )}
              {record.role?.length > 0 && (
                <Grid marginTop={3} item>
                  <Box display="flex" flexWrap="wrap">
                    {record.role.map((item) => {
                      return <Tag key={item} text={item} />;
                    })}
                  </Box>
                </Grid>
              )}
              {record.contacts && (
                <Box
                  marginTop={2}
                  display="flex"
                  flexWrap="wrap"
                  alignItems="flex-start"
                  width="176px"
                >
                  <BuidlerContacts
                    sx={{ flexWrap: 'wrap' }}
                    contacts={record.contacts}
                  />
                </Box>
              )}
              {record.role?.length > 0 &&
                record.description &&
                record.contacts && (
                  <Divider
                    sx={{
                      marginTop: '24px',
                      borderColor: '#E5E5E5',
                    }}
                  />
                )}
              {createdAt.length === 4 && (
                <Box paddingTop={3} display="flex" justifyContent="center">
                  <Typography>{`Joined ${createdAt[1]} ${createdAt[3]}`}</Typography>
                </Box>
              )}
              <Divider
                sx={{
                  marginTop: '24px',
                  borderColor: '#E5E5E5',
                }}
              />
              <Box textAlign="center" marginTop={4}>
                {address === record.address ? (
                  <Button
                    onClick={() => {
                      setVisible(true);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                ) : null}
                {address === record.address &&
                record.role.includes('Onboarding Committee') ? (
                  <Button
                    style={{
                      marginLeft: 8,
                    }}
                    onClick={async () => {
                      const newAddress = window.prompt('New joiner address');
                      const data = await API.post(`/buidler`, {
                        address: newAddress,
                      });
                      const result = data?.data;
                      if (result.status === 'SUCCESS') {
                        alert('created!');
                      }
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Onboarding
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Box>
          <Box
            marginTop={3}
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            display="flex"
            padding="20px 24px"
          >
            <Box display="flex" alignItems="center">
              Buddy
            </Box>
            {record.buddies?.length > 0 && (
              <Box
                width="76.95px"
                height="80px"
                borderRadius="6px"
                overflow="hidden"
              >
                <img
                  style={{ display: 'block', width: 80 }}
                  src={record.buddies[0].avatar || '/images/placeholder.jpeg'}
                  alt=""
                />
              </Box>
            )}
          </Box>

          {record.status === 'ACTIVE' ? (
            <Box marginTop={2}>
              <img
                crossOrigin="anonymous"
                style={{ display: 'block', width: 300 }}
                src={`https://api.lxdao.io/buidler/${record.address}/card`}
                alt=""
              />
            </Box>
          ) : null}
        </Box>
        {/* right senction */}
        <Box flex="1" width="calc(100% - 29px)" marginLeft="29px">
          <Box display="flex" flexDirection="column">
            <Accordion padding={4} maxHeight="363px">
              <AccordionSummary
                height="128px"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="bold" variant="h6">
                  all remuneration
                  <Box
                    marginLeft={1}
                    width="16px"
                    component={'img'}
                    src={`/icons/help-fill.svg`}
                  />
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  I am an accordion
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <LXPointsTable maxHeight="235px" points={record.lxPoints} />
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box flex="1 1" marginTop={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box
                  border="0.5px solid #D0D5DD"
                  borderRadius="6px"
                  padding="22px 17px 18.66px 31px"
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      fontWeight="600"
                      variant="body1"
                      marginBottom={2}
                      display="inline-block"
                    >
                      Skills
                    </Typography>
                    <Box display="inline-block">
                      <Typography
                        fontWeight="400"
                        variant="body2"
                        display="inline-block"
                      >
                        <Box
                          width="10px"
                          height="10px"
                          borderRadius="50%"
                          display="inline-block"
                          marginRight={1}
                          marginLeft={1}
                          sx={{ background: '#009FFF' }}
                        ></Box>
                        Senior
                      </Typography>
                      <Typography
                        fontWeight="400"
                        variant="body2"
                        display="inline-block"
                      >
                        <Box
                          width="10px"
                          height="10px"
                          borderRadius="50%"
                          display="inline-block"
                          marginRight={1}
                          marginLeft={1}
                          sx={{ background: 'rgba(0,159,255,0.7)' }}
                        ></Box>
                        intermediate
                      </Typography>
                      <Typography
                        fontWeight="400"
                        variant="body2"
                        display="inline-block"
                      >
                        <Box
                          width="10px"
                          height="10px"
                          borderRadius="50%"
                          display="inline-block"
                          marginRight={1}
                          marginLeft={1}
                          sx={{ background: 'rgba(0,159,255,0.4)' }}
                        ></Box>
                        jonior
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" flexWrap="wrap">
                    <Skills skills={record.skills} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} height="100%" sx={{ height: '100%' }}>
                <Box
                  border="0.5px solid #D0D5DD"
                  borderRadius="6px"
                  padding="22px 17px 26.66px 31px"
                  sx={{ height: '100%' }}
                >
                  <Box>
                    <Typography
                      fontWeight="600"
                      variant="body1"
                      marginBottom={2}
                      display="inline-block"
                    >
                      Interests
                    </Typography>
                  </Box>
                  <Box display="flex" flexWrap="wrap">
                    {record.interests.map((item) => {
                      return (
                        <Tag
                          background="rgba(255,184,0,0.1)"
                          color="#FFB800"
                          key={item}
                          text={item}
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box marginTop={3}>
            <Box>
              <Typography fontWeight="600" variant="body1" marginBottom={2}>
                Project
              </Typography>
            </Box>
            <Box display="flex" marginTop={4}>
              {projects.length ? (
                <Grid container spacing={4}>
                  {projects.map((project) => {
                    return (
                      <Grid item xs={12} md={6} key={project.id}>
                        <Project data={project} />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  alignItems="center"
                  paddingY={4}
                >
                  <img width="80px" src="/icons/no-records.png" />
                  <Typography marginTop={4} color="#D0D5DD" fontSize="16px">
                    You have not participated in any project
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box marginTop={3}>
            <Box>
              <Typography fontWeight="600" variant="body1" marginBottom={2}>
                Working Group
              </Typography>
            </Box>
            <Box display="flex" marginTop={4}>
              {workingGroupsData.length ? (
                <Box width="100%">
                  <Grid container spacing={3}>
                    {workingGroupsData.length > 0 &&
                      workingGroupsData.map((group, index) => {
                        return (
                          <WorkingGroupCard hasBorder key={index} {...group} />
                        );
                      })}
                  </Grid>
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  alignItems="center"
                  paddingY={4}
                >
                  <img width="80px" src="/icons/no-records.png" />
                  <Typography marginTop={4} color="#D0D5DD" fontSize="16px">
                    You have not participated in any project
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
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
          <ProfileForm
            updating={updating}
            values={_.cloneDeep(
              _.pick(record, [
                'avatar',
                'name',
                'description',
                'skills',
                'interests',
                'contacts',
              ])
            )}
            saveProfileHandler={saveProfileHandler}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

// todo load builder on nodejs Muxin
export default function Buidler() {
  const router = useRouter();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestDetail = async (address) => {
    setLoading(true);
    try {
      const data = await API.get(`/buidler/${address}`);
      const result = data?.data;
      if (result.status !== 'SUCCESS') {
        // error
        throw new Error('Cannot get buidler detail');
      }
      setRecord(result.data);
    } catch (error) {
      // todo Muxin common error
      console.log(error);
    }

    setLoading(false);
  };

  const address = router.query.address;
  useEffect(() => {
    if (address) {
      requestDetail(address);
    }
  }, [address]);

  return (
    <Layout>
      {loading ? null : record ? (
        <BuidlerDetails
          refresh={() => {
            requestDetail(address);
          }}
          record={record}
        />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
          paddingY={20}
        >
          <img width="80px" src="/icons/no-records.png" />
          <Typography marginTop={4} color="#D0D5DD" fontSize="16px">
            No Buidler found with the address {address}
          </Typography>
        </Box>
      )}
    </Layout>
  );
}
