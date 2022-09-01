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
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

import BuidlerContacts from '@/components/BuidlerContacts';
import Tag from '@/components/Tag';
import Project from '@/components/Project';

function totalLXPoints(record) {
  if (record.lxPoints === null) {
    return 0;
  }

  return record.lxPoints.reduce((total, point) => {
    return total + point.value;
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
            {point.reason} (+{point.value})
          </Box>
        );
      })}
    </Box>
  );
}

function BuidlerDetails(props) {
  const record = props.record;
  console.log('record: ', record);

  const { address, isConnected } = useAccount();
  console.log('address: ', address);

  const { data: signer } = useSigner();

  const contract = useContract({
    ...contractInfo(),
    signerOrProvider: signer,
  });

  const [details, setDetails] = useState('buidlerCard');
  const [visible, setVisible] = useState(false);

  // backend status
  const [status, setStatus] = useState('');

  // backend metaData
  const [metaData, setMetaData] = useState(null);

  // tokenId on chain
  const [tokenId, setTokenId] = useState(null);

  // ipfsURL on chain
  const [ipfsURL, setIpfsURL] = useState(null);

  // mint tx
  const [tx, setTx] = useState(null);

  useEffect(async () => {
    if (!signer) {
      return;
    }
    setStatus(record.status);

    if (isConnected && address === record.address) {
      await getToken(address);
    }
  }, [isConnected, signer]);

  const getToken = async (address) => {
    let result = await contract.balanceOf(address);
    console.log('contract balanceOf:', result);
    if (result.toNumber() === 0) {
      console.log('has no token.');
      return;
    }

    const tokenId = await contract.tokenOfOwnerByIndex(address, 0);
    console.log('contract tokenOfOwnerByIndex:', tokenId);
    // token
    setTokenId(tokenId.toNumber());
    // ipfs
    await getIpfsURL(tokenId);
  };

  const getIpfsURL = async (tokenId) => {
    const result = await contract.tokenURI(tokenId);
    console.log('contract tokenURI:', result);
    if (result && result.length > 0) {
      console.log('ipfs:', result);
      setIpfsURL(result);
    }
  };

  const mint = async (signature) => {
    // test
    signature =
      '0x40c835598d05ba1d0ff10a89e87a7a181a1d8be68dae3e808f486166cf5bdf274ce9fe6698391bae2261877bf127381df5646e369e64c92d64565972af10ed351c';

    const tx = await contract.mint(signature);
    setTx(tx);
    const response = await tx.wait();
    console.log(response);
  };

  const saveProfileHandler = async (newMetaData) => {
    console.log('saveProfile:', newMetaData);

    // 1. backend uploadIPFS
    let response = await API.post(`/buidler/uploadIPFS`, {
      metaData: JSON.stringify(newMetaData),
    });
    // console.log('backend uploadIPFS:', response);
    let result = response?.data;
    if (result.status !== 'SUCCESS') {
      return;
    }
    const { ipfsURI, signature } = result.data;

    // 2. contract updateMetaData
    const updateMetaData = contract[`updateMetaData(string,bytes)`];
    const tx = await updateMetaData(ipfsURI, signature);
    const contractUpdateMetaData = await tx.wait();
    // console.log('contract updateMetaData:', contractUpdateMetaData);

    // 3. backend updateMetaData
    response = await API.post(`/buidler/updateMetaData`, {
      id: record.id,
      ipfsURI: ipfsURI,
      metaData: newMetaData,
    });
    // console.log('backend updateMetaData:', response);
    result = response?.data;
    if (result.status !== 'SUCCESS') {
      return;
    }
    // update meta data success.
    setVisible(false);
    alert('Update success.');
  };

  const [copyTip, setCopyTip] = useState('Copy to Clipboard');

  if (record.status === 'PENDING') {
    return (
      <Container paddingY={10}>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Box marginBottom={2}>
            <Alert severity="info">
              Welcome LXDAO, please click the Mint Builder Card button to get
              your LXDAO Builder CARD{' '}
            </Alert>
          </Box>

          <Box textAlign="center">
            <Button
              onClick={() => {
                mint();
              }}
              variant="outlined"
            >
              Mint Builder Card
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

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
        <Box>
          <Box
            marginTop={4}
            marginBottom={6}
            display="flex"
            flexWrap="wrap"
            alignItems="flex-start"
          >
            <Box flex="1 1 500px" marginBottom={2}>
              <Typography variant="h4" fontWeight="bold" marginBottom={2}>
                {record.name}
              </Typography>
              <Typography>{record.description}</Typography>
            </Box>
            <Box flex="1 1 auto" display="flex" marginTop={2}>
              <Box
                marginRight={4}
                paddingRight={4}
                borderRight="1px solid #D0D5DD"
              >
                <BuidlerContacts space={4} contacts={record.contacts} />
              </Box>
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
      <Box marginTop={10}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value="project">
            <Tab label={`Project ${record.projects.length}`} value="project" />
          </Tabs>
        </Box>
        <Box display="flex" marginTop={4}>
          {record.projects.length ? (
            <Grid container spacing={4}>
              {record.projects.map((project) => {
                return (
                  <Grid item xs={6} key={project.id}>
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
                src={`${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/card/${record.address}`}
                alt=""
              />
            </Box>
          )}
          {details === 'lxPoints' && (
            <Box display="flex" marginTop={4}>
              <Box flex="0 1 240px" marginRight={3}>
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
            metaData={metaData}
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

  return <Layout>{record && <BuidlerDetails record={record} />}</Layout>;
}
