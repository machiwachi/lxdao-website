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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import _ from 'lodash';
import SyncIcon from '@mui/icons-material/Sync';
import { useContract, useAccount, useSigner } from 'wagmi';

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

function LXPointsTimeline({ points }) {
  return (
    <Box marginTop={3} marginLeft={2}>
      {points.map((point, index) => {
        const isLastOne = index === points.length - 1;
        return (
          <Box
            key={index}
            paddingLeft={3}
            paddingBottom={3}
            sx={{
              position: 'relative',
              '&::before': {
                position: 'absolute',
                content: '" "',
                top: '8px',
                left: 0,
                width: '6px',
                height: '6px',
                backgroundColor: '#D0D5DD',
                borderRadius: '50%',
              },
              '&::after': {
                position: 'absolute',
                display: isLastOne ? 'none' : 'block',
                content: '" "',
                top: '12px',
                left: '2px',
                bottom: '-10px',
                width: '2px',
                backgroundColor: '#D0D5DD',
              },
            }}
          >
            <Typography>
              {point.reason} ({point.operator}
              {point.value})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {point.createdAt}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function BuidlerDetails(props) {
  const record = props.record;
  const signature = props.signature;

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const router = useRouter();

  const [details, setDetails] = useState('buidlerCard');
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

    const tokenId = await contract.tokenOfOwnerByIndex(address, 0);
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
      // todo replace with new contract
      const tx = await contract.mint(record.ipfsURI, signature);
      setTx(tx);
      const response = await tx.wait();
      setTxRes(response);

      if (response) {
        await API.post('/buidler/activate');
        // remove signature and buddy from URL
        router.push(`/buidlers/${record.address}`);
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

  const saveProfileHandler = async (newMetaData) => {
    setUpdating(true);
    const userProfile = {
      ...newMetaData,
      role: ['Buidler'],
      // set the NFT image
      image: `${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`,
      buddyAddress: props.buddy,
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
    return project.status !== 'PENDING';
  });

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
                    const updateMetaData =
                      contract[`updateMetaData(string,bytes)`];
                    const tx = await updateMetaData(ipfsURI, signature);
                    await tx.wait();
                    await getToken(address);
                    // todo add tx
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
      {record.status === 'PENDING' && (
        <Box marginTop={4}>
          {!signature && (
            <Alert severity="error">
              We cannot get the mint signature, please contact LXDAO Onboarding
              committee before you Mint your Builder Card.
            </Alert>
          )}
          <Alert severity="info">
            Welcome LXDAO. Your Buidler Card is Pending, please fill up your
            profile, and click{' '}
            <Button
              disabled={!signature}
              onClick={() => {
                mint();
              }}
              size="small"
              variant="outlined"
            >
              {minting ? 'Minting Builder Card...' : 'Mint Builder Card'}
            </Button>
          </Alert>
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
        marginTop={6}
        flexDirection={{
          md: 'row',
          xs: 'column',
        }}
      >
        <Box marginRight={6}>
          <Box width="150px" borderRadius="50%" overflow="hidden">
            <img
              style={{ display: 'block', width: 150 }}
              src={record.avatar || '/images/placeholder.jpeg'}
              alt=""
            />
          </Box>
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
          </Box>
        </Box>
        <Box flex="1 1 auto">
          <Box
            marginTop={4}
            marginBottom={6}
            display="flex"
            flexWrap="wrap"
            alignItems="flex-start"
          >
            <Box flex="1 1 40%" marginBottom={2}>
              <Typography variant="h4" fontWeight="bold" marginBottom={2}>
                {record.name}
              </Typography>
              <Typography>{record.description}</Typography>
            </Box>
            <Box
              flex="1 1 auto"
              display="flex"
              marginTop={2}
              flexWrap="wrap"
              flexDirection={{ xs: 'column', md: 'row' }}
            >
              <Box
                marginRight={4}
                paddingRight={4}
                marginBottom={4}
                borderRight={{
                  md: '1px solid #D0D5DD',
                }}
                marginLeft={{ xs: 0, md: 'auto' }}
              >
                <BuidlerContacts space={4} contacts={record.contacts} />
              </Box>
              <Box>
                <CopyText
                  copyTextOriginal={record.address}
                  copyText={formatAddress(record.address)}
                />
              </Box>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography fontWeight="bold" variant="h6" marginBottom={2}>
                Role
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {record.role.map((item) => {
                  return <Tag key={item} text={item} />;
                })}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography fontWeight="bold" variant="h6" marginBottom={2}>
                Skills
              </Typography>
              <Box display="flex" flexWrap="wrap">
                <Skills skills={record.skills} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
      <Box marginTop={10}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value="project">
            <Tab label={`Project ${record.projects.length}`} value="project" />
          </Tabs>
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
        <Box paddingY={2}>
          {details === 'buidlerCard' && (
            <Box>
              <img
                crossOrigin="anonymous"
                style={{ display: 'block', width: 300 }}
                src={`${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`}
                alt=""
              />
            </Box>
          )}
          {details === 'lxPoints' && (
            <Box
              display="flex"
              marginTop={4}
              marginBottom={4}
              flexDirection={{
                xs: 'column',
                md: 'row',
              }}
            >
              <Box marginRight={3} marginBottom={3}>
                <Typography fontWeight="bold" variant="h6">
                  Accumulated LXPoints
                </Typography>
                <Typography marginTop={2} fontSize="48px" fontWeight="bold">
                  {totalLXPoints(record)}
                </Typography>
              </Box>
              {record.lxPoints && record.lxPoints.length > 0 && (
                <Box>
                  <Typography fontWeight="bold" variant="h6">
                    Reason
                  </Typography>
                  <LXPointsTimeline points={record.lxPoints} />
                </Box>
              )}
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

export default function Buidler() {
  const router = useRouter();
  const [record, setRecord] = useState(null);

  const requestDetail = async (address) => {
    API.get(`/buidler/${address}`).then((data) => {
      const result = data?.data;
      if (result.status !== 'SUCCESS') {
        // error
        return;
      }
      setRecord(result.data);
    });
  };

  const address = router.query.address;
  useEffect(() => {
    if (address) {
      requestDetail(address);
    }
  }, [address]);

  return (
    <Layout>
      {record && (
        <BuidlerDetails
          refresh={() => {
            requestDetail(address);
          }}
          record={record}
          signature={router.query.signature}
          buddy={router.query.buddy}
        />
      )}
    </Layout>
  );
}
