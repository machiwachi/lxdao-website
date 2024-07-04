/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { mainnet } from 'wagmi/chains';
import {
  createPublicClient,
  parseAbiItem,
  http,
  fallback,
  getAddress,
} from 'viem';
import {
  Box,
  Typography,
  Link,
  Button,
  Grid,
  Dialog,
  Divider,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from '@mui/material';
import { myFirstNFT } from '@/abi/index';
import Confetti from 'react-confetti';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useRouter } from 'next/router';
import AirdropDialog from '../../components/buidlers/AirdropDialog';
import _ from 'lodash';
import { useAccount } from 'wagmi';
import API from '@/common/API';
import {
  formatAddress,
  totalLXPoints,
  totalStableCoins,
} from '@/utils/utility';

import Layout from '@/components/Layout';
import CopyText from '@/components/CopyText';
import Container from '@/components/Container';

import useBuidler from '@/components/useBuidler';
import Skills from '@/components/Skills';
import BuidlerContacts from '@/components/BuidlerContacts';
import Tag from '@/components/Tag';
import showMessage from '@/components/showMessage';
import Project from '@/components/Project';
import LXButton from '@/components/Button';
import WorkingGroupSimpleCard from '@/components/WorkingGroupSimpleCard';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import BadgeCard from '@/components/BadgeCard';
import ProfileEditDialog from '../../components/buidlers/ProfileEditDialog';
import LXPointsTable from '../../components/buidlers/LXPointsTable';
import StableCoinsTable from '../../components/buidlers/StableCoinsTable';

function BuidlerDetails(props) {
  const record = props.record;
  const { address } = useAccount();
  const [, currentViewer] = useBuidler(address);
  const router = useRouter();
  const isFromOnboarding = router?.query?.isFromOnboarding;
  const [onboarding, setOnboarding] = useState(false);

  const enableMint = async () => {
    try {
      await API.post(`/buidler/${record.address}/enableMint`);
      // const data = enableMintRes.data.data;
      alert('Success!');
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to enable mint access',
        body: err.message,
      });
    }
  };

  const createdAt =
    record.createdAt &&
    new Date(Date.parse(record.createdAt)).toDateString().split(' ');

  const badgesToBeEarnedNumber = record?.badges?.filter(
    (badge) => badge.amount === 0
  ).length;

  const firstMemberBadgeAmount = record?.badges?.find(
    (badge) => badge.id === 'MemberFirstBadge'
  )?.amount;

  useEffect(() => {
    if (record?.status === 'PENDING' && firstMemberBadgeAmount === 0) {
      setOnboarding(true);
    }
    return () => {
      setOnboarding(false);
    };
  }, [record?.status, firstMemberBadgeAmount]);

  return (
    <>
      {onboarding && (
        <Dialog
          maxWidth="383px"
          onClose={() => {
            setOnboarding(false);
          }}
          open={onboarding}
        >
          <Box
            sx={{
              borderRadius: '6px',
              background: '#fff',
              width: '383px',
              padding: '32px',
            }}
          >
            <Typography
              component="h3"
              textAlign="center"
              fontWeight="700"
              fontSize="18px"
              marginBottom={2}
            >
              Onboarding process
            </Typography>
            <Typography variant="div" fontWeight="500" color="#000">
              <Typography variant="p">
                This member has not yet completed the onboarding，Please attend
                a community call to introduce yourself
              </Typography>
              <br />
              <Typography variant="p">
                Community call time: Every Saturday at 10am (UTC+8)
              </Typography>
              <br />
              <Typography variant="p">
                {' '}
                Community call link: ({' '}
                <Link
                  target="_blank"
                  sx={{ wordBreak: 'break-all', color: 'rgb(60, 122, 255)' }}
                  href={`https://forum.lxdao.io/c/governance/community-call/22`}
                >
                  join
                </Link>{' '}
                )
              </Typography>
            </Typography>
          </Box>
        </Dialog>
      )}
      <Container paddingY={isFromOnboarding ? {} : { md: 12, xs: 8 }}>
        {record.status === 'PENDING' &&
          address &&
          firstMemberBadgeAmount > 0 &&
          record?.role?.includes('Onboarding Committee') && (
            <Box marginTop={4}>
              <Box marginTop={2} marginBottom={2}>
                <Button
                  onClick={() => {
                    enableMint();
                  }}
                  variant="outlined"
                >
                  Enable SBT Card Mint Access
                </Button>
              </Box>
            </Box>
          )}
        <Box
          display="flex"
          flexDirection={{
            md: 'row',
            xs: 'column',
          }}
          gap="24px"
        >
          {/* left section*/}
          <Box width={{ md: '300px', sm: 'auto', xs: 'auto' }}>
            <Box
              border="0.5px solid #D0D5DD"
              borderRadius="6px"
              display="flex"
              padding={3}
            >
              <Box width="100%">
                <Box
                  width="252px"
                  height="252px"
                  border="0.5px solid #D0D5DD"
                  borderRadius="6px"
                  overflow="hidden"
                  margin="auto"
                >
                  <Box
                    component="img"
                    src={record.avatar || '/images/placeholder.jpeg'}
                    alt="avatar"
                    style={{
                      display: 'block',
                      width: 252,
                      height: 252,
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="500"
                  textAlign="center"
                  color="#000"
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
                {record.status === 'ACTIVE' ? (
                  <Link
                    target="_blank"
                    href={`https://opensea.io/collection/lxdaobuidler`}
                    sx={{
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      marginBottom={3}
                      width="auto"
                      display="flex"
                      justifyContent="center"
                    >
                      <img
                        crossOrigin="anonymous"
                        style={{
                          display: 'block',
                          maxWidth: '100%',
                        }}
                        src={`${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`}
                        alt=""
                      />
                    </Box>
                  </Link>
                ) : null}
                {record.description && (
                  <Box marginTop={3}>
                    <Typography sx={{ wordBreak: 'break-all' }}>
                      {record.description}
                    </Typography>
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
                    width="100%"
                  >
                    <BuidlerContacts
                      sx={{ flexWrap: 'wrap' }}
                      contacts={record.contacts}
                      privateContacts={record.privateContacts}
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
                {address === record.address && (
                  <Divider
                    sx={{
                      marginTop: 2,
                      marginBottom: 3,
                      borderColor: '#E5E5E5',
                    }}
                  />
                )}
                <Box
                  display="flex"
                  justifyContent="center"
                  flexWrap="wrap"
                  gap={1}
                >
                  <ProfileEditDialog record={record} />
                  {address === record.address &&
                  record.role.includes('Onboarding Committee') ? (
                    <LXButton
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
                      variant="outlined"
                    >
                      Onboarding
                    </LXButton>
                  ) : null}
                  {/* todo only show this button to Onboarding Committee */}
                  {address !== record.address && (
                    <Divider
                      sx={{
                        width: '100%',
                        marginTop: 2,
                        marginBottom: 3,
                        borderColor: '#E5E5E5',
                      }}
                    />
                  )}
                  {currentViewer &&
                    currentViewer.role.includes('Onboarding Committee') && (
                      <LXButton
                        onClick={async () => {
                          const data = await API.post(
                            `/buidler/${record.address}/uploadIPFS`
                          );
                          const result = data?.data;
                          if (result.status === 'SUCCESS') {
                            alert('Synced!');
                          }
                        }}
                        variant="outlined"
                      >
                        Sync to IPFS
                      </LXButton>
                    )}
                  <AirdropDialog record={record} />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* right senction */}
          <Box boxSizing="border-box" flex="1">
            <BadgeBox record={record} />

            {(badgesToBeEarnedNumber > 0 ||
              record?.status === 'PENDING' ||
              record?.status === 'READYTOMINT') && (
              <BadgesToBeEarnedBox record={record} address={address} />
            )}
            {/* LXEARN */}
            <LxpRewardBox record={record} />
            <StableCoinsRewardBox record={record} />
            <SkillsBox record={record} />
            <ProjectsBox record={record} />
            <WorkingGroupsBox record={record} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

//TODO: load builder on nodejs Muxin
export default function Buidler() {
  const router = useRouter();
  const currentAddress = router.query.address;
  const [open, setOpen] = useState(false);

  const { width, height } = useWindowSize();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [loading, record, , refresh] = useBuidler(currentAddress);
  const { address } = useAccount();
  const isFromOnboarding = router?.query?.isFromOnboarding;

  useEffect(() => {
    const newBuidler = sessionStorage?.getItem('newBuidler');
    if (newBuidler) {
      setOpen(true);
      sessionStorage?.removeItem('newBuidler');
    }
  }, []);
  useEffect(() => {
    setSize({
      width: width,
      height: height,
    });
  }, [width, height]);
  if (loading) return null;
  const BuidlerLayout = () => {
    return (
      <>
        {record ? (
          <>
            <Confetti
              width={size.width}
              height={size.height}
              recycle={false}
              run={open}
            />
            <BuidlerDetails
              refresh={() => {
                refresh();
              }}
              record={record}
            />
          </>
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
              No Buidler found with the address {currentAddress}
            </Typography>
          </Box>
        )}
      </>
    );
  };

  if (isFromOnboarding && address === currentAddress) {
    return (
      <OnBoardingLayout
        layoutTitle={`${record && record.name} Member Profile | LXDAO`}
        title="Profile created! Earn your first badge to finish onboarding."
        next="done"
        currentStep={3}
        hideButton={true}
      >
        <BuidlerLayout />
      </OnBoardingLayout>
    );
  }
  return (
    <Layout title={`${record && record.name} Member Profile | LXDAO`}>
      <BuidlerLayout />
    </Layout>
  );
}

function BadgeBox({ record }) {
  const [isHasOtherBadges, setIsHasOtherBadges] = useState([]);
  const infura = http(
    'https://mainnet.infura.io/v3/999c7c128542435eac32a6cdd05a31c1'
  );

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: fallback([infura]),
  });
  useEffect(() => {
    (async () => {
      if (!record) return;

      const MFNFTResult = await publicClient.getLogs({
        address: getAddress(myFirstNFT.address),
        event: parseAbiItem(
          'event Transfer(address indexed from,address indexed to,uint256 indexed tokenId)'
        ),
        args: {
          to: record.address,
        },
        fromBlock: 0n,
        toBlock: 'latest',
      });

      // console.log({ MFNFTResult });
      if (MFNFTResult.length <= 0) {
        return;
      }

      const uri = await publicClient.readContract({
        ...myFirstNFT,
        functionName: 'tokenURI',
        args: [BigInt(MFNFTResult[0]?.topics[3])],
      });

      const imgCode = uri.replace('data:application/json;base64,', '');
      const imgUrl = JSON.parse(atob(imgCode)).image;
      console.log(imgUrl, imgUrl.split('ipfs://')[1]);
      setIsHasOtherBadges([
        ...isHasOtherBadges,
        { image: imgUrl, name: 'myFirstNFT' },
      ]);
    })();
  }, [record]);
  return (
    <Box
      sx={{
        border: '0.5px solid #D0D5DD',
        borderRadius: '6px',
        padding: '30px',
        marginBottom: '24px',
      }}
    >
      <Typography
        sx={{
          fontSize: '16x',
          fontWeight: 800,
          color: '#101828',
          marginBottom: '15px',
        }}
      >
        Badges
      </Typography>
      <Box display="flex" gap="15px" alignItems="center">
        {record?.badges &&
          record?.badges.map((badge) => {
            return badge.amount > 0 ? (
              <Box
                key={badge?.image}
                component={'img'}
                src={badge?.image}
                width="60px"
                height="60px"
                maxWidth="60px"
                maxHeight="60px"
                objectFit="contain"
                flexShrink={0}
              />
            ) : null;
          })}
        {isHasOtherBadges.map((badge, index) => (
          // <Img3
          //   key={badge?.image}
          //   style={{
          //     width: '60px',
          //     height: '60px',
          //     objectFit: 'contain',
          //     minWidth: '60px',
          //     flexShrink: 0,
          //   }}
          //   src={badge.image}
          //   alt={badge.name}
          // />
          <Box
            key={index}
            component={'img'}
            src={`https://nftstorage.link/ipfs/${badge?.image.split('ipfs://')[1]}`}
            width="60px"
            height="60px"
            maxWidth="60px"
            maxHeight="60px"
            objectFit="contain"
            flexShrink={0}
          />
        ))}
      </Box>
    </Box>
  );
}

function BadgesToBeEarnedBox({ record, address }) {
  return (
    <Box
      sx={{
        border: '0.5px solid #D0D5DD',
        borderRadius: '6px',
        padding: '30px',
        marginBottom: '24px',
      }}
    >
      <Typography
        sx={{
          fontSize: '16x',
          fontWeight: 800,
          color: '#101828',
          marginBottom: '15px',
        }}
      >
        Badges to be earned
      </Typography>
      <Box display="flex" gap="15px" flexDirection="column">
        {record?.badges &&
          record?.badges.map((badge, index) => {
            if (badge?.id === 'MemberFirstBadge') {
              badge.linkText = 'Earn now';
              badge.linkUrl = '/firstBadge';
            }
            return badge.amount === 0 ? (
              <BadgeCard
                key={index}
                {...badge}
                isOneself={record.address === address}
              />
            ) : null;
          })}
        {(record?.status === 'PENDING' || record?.status === 'READYTOMINT') && (
          <BadgeCard
            isOneself={record.address === address}
            image={`/images/card.png`}
            name="Buidler card (SBT)"
            description="Governance rights entitled"
            eligible="Eligibility: Contribute in projects or working groups to earn up to 500 LXU reward."
            linkText="Contribute to earn"
            linkUrl="/SBTCard"
          />
        )}
      </Box>
    </Box>
  );
}

function LxpRewardBox({ record }) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const handleAccordionOnChange = (e, value) => {
    setAccordionOpen(value);
  };
  return (
    <Box display="flex" flexDirection="column">
      <Accordion
        onChange={handleAccordionOnChange}
        sx={{
          '&.Mui-expanded': {
            minHeight: { md: 128, sm: 200 },
          },
          '&.MuiPaper-root': {
            border: '0.5px solid #D0D5DD',
            boxShadow: 'none',
          },
        }}
      >
        <AccordionSummary
          height={{ md: '128px', sm: '200px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            '&.MuiAccordionSummary-root': {
              height: {
                sm: '128px !important',
                xs: '200px !important',
              },
              borderRadius: '6px',
              '.MuiAccordionSummary-expandIconWrapper': {
                marginTop: { sm: 0, xs: '84px' },
                display: record?.lxPoints.length ? 'block' : 'none',
              },
            },
          }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box>
              <Typography fontWeight="600" variant="body1" color="#101828">
                LXP Reward{' '}
                <Link
                  href="/reward/apply"
                  target="_blank"
                  sx={{
                    display: 'inline',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  (Apply LXP {'->'})
                </Link>
              </Typography>

              <Typography
                marginTop={1}
                fontWeight="600"
                variant="h5"
                color="#36AFF9"
              >
                {totalLXPoints(record)}
              </Typography>
            </Box>
            <Box
              textAlign={{ xs: 'right' }}
              width={{ xs: '100%', md: 'auto' }}
              paddingTop={{ xs: '24px', md: 0 }}
            >
              <Typography fontWeight="500" variant="body1" color="#0D1320">
                {record?.lxPoints.length > 0
                  ? accordionOpen
                    ? 'Put Away'
                    : 'Record List'
                  : null}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            '&.MuiAccordionDetails-root': {
              height: '235px !important',
              padding: { sm: '8px 32px 32px 32px', xs: '8px' },
              overflowY: 'auto',
              overflowX: record?.lxPoints?.length === 0 ? 'hidden' : 'auto',
              '&::-webkit-scrollbar': {
                width: '10px',
                height: '10px',
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                background: '#dfdfdf',
              },
              '&::scrollbar-track': {
                borderRadius: 0,
                background: '#dfdfdf',
              },
            },
          }}
        >
          <LXPointsTable maxHeight="235px" points={record.lxPoints} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function StableCoinsRewardBox({ record }) {
  const [stableCoinAccordionOpen, setStableCoinAccordionOpen] = useState(false);
  const handleStableCoinAccordionOnChange = (e, value) => {
    setStableCoinAccordionOpen(value);
  };
  return (
    <Box display="flex" flexDirection="column" marginTop={3}>
      <Accordion
        onChange={handleStableCoinAccordionOnChange}
        sx={{
          '&.Mui-expanded': {
            minHeight: { md: 128, sm: 200 },
          },
          '&.MuiPaper-root': {
            border: '0.5px solid #D0D5DD',
            boxShadow: 'none',
          },
        }}
      >
        <AccordionSummary
          height={{ md: '128px', sm: '200px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            '&.MuiAccordionSummary-root': {
              height: {
                sm: '128px !important',
                xs: '200px !important',
              },
              borderRadius: '6px',
              '.MuiAccordionSummary-expandIconWrapper': {
                marginTop: { sm: 0, xs: '84px' },
                display: record?.stableCoins.length ? 'block' : 'none',
              },
            },
          }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box>
              <Typography fontWeight="600" variant="body1" color="#101828">
                Stablecoin Reward{' '}
                <Link
                  href="/reward/apply"
                  target="_blank"
                  sx={{
                    display: 'inline',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  (Apply Stablecoin {'->'})
                </Link>
              </Typography>

              <Typography
                marginTop={1}
                fontWeight="600"
                variant="h5"
                color="#36AFF9"
              >
                {totalStableCoins(record)}
              </Typography>
            </Box>
            <Box
              textAlign={{ xs: 'right' }}
              width={{ xs: '100%', md: 'auto' }}
              paddingTop={{ xs: '24px', md: 0 }}
            >
              <Typography fontWeight="500" variant="body1" color="#0D1320">
                {record?.stableCoins.length > 0
                  ? stableCoinAccordionOpen
                    ? 'Put Away'
                    : 'Record List'
                  : null}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            '&.MuiAccordionDetails-root': {
              height: '235px !important',
              padding: { sm: '8px 32px 32px 32px', xs: '8px' },
              overflowY: 'auto',
              overflowX: record?.stableCoins?.length === 0 ? 'hidden' : 'auto',
              '&::-webkit-scrollbar': {
                width: '10px',
                height: '10px',
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                background: '#dfdfdf',
              },
              '&::scrollbar-track': {
                borderRadius: 0,
                background: '#dfdfdf',
              },
            },
          }}
        >
          <StableCoinsTable maxHeight="235px" points={record.stableCoins} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function SkillsBox({ record }) {
  return (
    <Box flex="1 1" marginTop={3}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        <Box
          border="0.5px solid #D0D5DD"
          borderRadius="6px"
          padding="22px 17px 26.66px 31px"
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
                Intermediate
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
                Junior
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <Skills skills={record.skills} />
          </Box>
        </Box>
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
      </Box>
    </Box>
  );
}

function ProjectsBox({ record }) {
  const projects = record.projects.filter((project) => {
    return project.status === 'ACTIVE';
  });
  return (
    <Box marginTop={3}>
      <Box>
        <Typography
          color="#101828"
          fontWeight="600"
          variant="body1"
          marginBottom={2}
        >
          Project
        </Typography>
      </Box>
      <Box display="flex" marginTop={2}>
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
            height="148px"
            alignItems="center"
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            padding={2}
          >
            <Typography
              marginTop={{ xs: 0, sm: 2 }}
              marginBottom={{ xs: '16px', sm: '21px' }}
              color="#D0D5DD"
              variant="body1"
              fontWeight="400"
            >
              You have not participated in the project, Go and choose one to
              join.
            </Typography>
            <LXButton size="small" variant="outlined">
              <Link
                href={`/projects`}
                target="_blank"
                sx={{
                  textDecoration: 'none',
                }}
              >
                View Product List
              </Link>
            </LXButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function WorkingGroupsBox({ record }) {
  return (
    <Box marginTop={3} marginBottom={3}>
      <Box>
        <Typography
          color="#101828"
          fontWeight="600"
          variant="body1"
          marginBottom={2}
        >
          Working Group
        </Typography>
      </Box>
      <Box display="flex" marginTop={2}>
        {record?.workingGroups?.length ? (
          <Box width="100%">
            <Grid container spacing={3}>
              {record?.workingGroups?.length > 0 &&
                record?.workingGroups?.map((group, index) => {
                  return (
                    <WorkingGroupSimpleCard
                      key={index}
                      id={group?.workingGroup?.id}
                      role={group.role}
                      name={group?.workingGroup?.name}
                    />
                  );
                })}
            </Grid>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="148px"
            alignItems="center"
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            padding={2}
          >
            <Typography
              marginTop={{ xs: 0, sm: 2 }}
              marginBottom={{ xs: '16px', sm: '21px' }}
              color="#D0D5DD"
              variant="body1"
              fontWeight="400"
            >
              You haven&apos;t joined the workgroup, go and choose one to join
            </Typography>
            <LXButton size="small" variant="outlined">
              <Link
                href={`https://lxdao.notion.site/95fde886aef24c9ca63b8bae95fa8456`}
                target="_blank"
                sx={{
                  textDecoration: 'none',
                }}
              >
                View Working Group
              </Link>
            </LXButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
