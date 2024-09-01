/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

import { useRouter } from 'next/router';

import { Box, Dialog, Divider, Grid, Link, Typography } from '@mui/material';

import BuidlerContacts from '@/components/BuidlerContacts';
import Button from '@/components/Button';
import Container from '@/components/Container';
import CopyText from '@/components/CopyText';
import Layout from '@/components/Layout';
import Tag from '@/components/Tag';
import BadgeBox from '@/components/buidlers/Box/BadgeBox';
import BadgesToBeEarnedBox from '@/components/buidlers/Box/BadgesToBeEarnedBox';
import LxpRewardBox from '@/components/buidlers/Box/LxpRewardBox';
import ProjectsBox from '@/components/buidlers/Box/ProjectsBox';
import SkillsBox from '@/components/buidlers/Box/SkillsBox';
import StableCoinsRewardBox from '@/components/buidlers/Box/StableCoinsRewardBox';
import WorkingGroupsBox from '@/components/buidlers/Box/WorkingGroupsBox';
import ProfileEditDialog from '@/components/buidlers/ProfileEditDialog';
import OnBoardingLayout from '@/components/onboarding/OnBoardingLayout';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';

import { useAccount } from 'wagmi';

import API from '@/common/API';
import { formatAddress } from '@/utils/utility';

import EditBuilderRole from '../../components/buidlers/EditBuilderRole';

import _ from 'lodash';

function BuidlerDetails({ record, refresh }) {
  const { address } = useAccount();
  const [viewerLoading, builder, viewerError, viewerRefresh] =
    useBuidler(address);
  const router = useRouter();
  const isFromOnboarding = router?.query?.isFromOnboarding;
  const [onboarding, setOnboarding] = useState(false);

  const [isEditRole, setIsEditRole] = useState(false);

  const handleEditRole = async (roles) => {
    try {
      const res = await API.post('/buidler/updateRole', {
        id: record.id,
        roles: roles,
      });
      const result = res?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      } else {
        window.location.reload();
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to create a project',
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
                This member has not yet completed the onboarding process. Please
                attend a community call to introduce yourself and receive your
                member badge.
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
                    href={`https://opensea.io/collection/lxdaobuidler-1`}
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
                    <Box display="flex" flexWrap="wrap" marginBottom={2}>
                      {record.role.map((item) => {
                        return <Tag key={item} text={item} />;
                      })}
                    </Box>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setIsEditRole(true);
                      }}
                    >
                      {'Edit'}
                    </Button>
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
        <EditBuilderRole
          role={record?.role}
          open={isEditRole}
          onClose={() => setIsEditRole(false)}
          onSave={handleEditRole}
        />
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
