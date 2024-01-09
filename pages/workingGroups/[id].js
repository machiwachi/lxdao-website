import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import _ from 'lodash';

import {
  Box,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import API from '@/common/API';

import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Container from '@/components/Container';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';
import WorkingGroupForm from '@/components/WorkingGroupForm';
import { Img3 } from '@lxdao/img3';
import { getImg3DidStrFromUrl } from '@/utils/utility';

function LinkItem({ title, link, description }) {
  return (
    <Link
      href={link}
      target="_blank"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        textDecoration: 'none',
        padding: '24px 32px',
        borderRadius: '5px',
        border: '0.5px solid #eaebf0',
        alignItems: 'center',
      }}
    >
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography fontSize="18px" fontWeight={600} color="#272D37">
          {title}
        </Typography>
        {description && (
          <Typography
            fontSize="16px"
            fontWeight={400}
            color="#5F6D7E"
            letterSpacing="-0.1rem"
          >
            {description}
          </Typography>
        )}
      </Box>
      <Box
        width="40px"
        height="40px"
        component="img"
        src="/icons/link-arrow.svg"
      />
    </Link>
  );
}

export default function WorkingGroupDetail() {
  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);
  const router = useRouter();
  const workingGroupId = router.query.id;

  const [data, setData] = useState({});
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);

  const teamLeaderAddress = data?.membersInWorkingGroup?.find((member) =>
    member.role.includes('Working Group Leader')
  )?.member?.address;

  const normalMembers = data?.membersInWorkingGroup?.filter(
    (member) => !member?.role?.includes('Working Group Leader')
  );
  const leader = data?.membersInWorkingGroup?.filter((member) =>
    member?.role?.includes('Working Group Leader')
  );

  const updateWorkingGroupHandler = async (values) => {
    const formattedValues = values?.leaderId?.id
      ? { ...values, leaderId: values?.leaderId?.id }
      : values;
    try {
      const response = await API.put(`/workinggroup/${workingGroupId}`, {
        ...formattedValues,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      } else {
        router.reload();
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to create a working group',
        body: err.message,
      });
    }
  };

  useEffect(async () => {
    try {
      if (!workingGroupId) return;
      const res = await API.get(`/workinggroup/${workingGroupId}`);
      const result = res?.data;
      if (result?.status === 'SUCCESS') {
        setData(result?.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to get the working group data',
        body: err.message,
      });
    }
  }, [workingGroupId]);

  if (!workingGroupId) return null;

  return (
    <Layout title={'LXDAO Working Group: ' + data?.name + ' | LXDAO'}>
      <Container maxWidth="778px" marginX={{ md: 'auto', xs: '20px' }}>
        <Box display="flex" flexDirection="column" gap="16px">
          <Box
            height="320px"
            width="100%"
            border="0.5px solid #d0d5dd"
            borderRadius="6px"
            marginBottom="32px"
            sx={{
              backgroundImage: `url(${data?.bannerURI})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="16px"
            >
              <Typography fontSize="32px" fontWeight={600} color="#101828">
                {data?.name}
              </Typography>
              {((currentViewer &&
                currentViewer?.role?.includes('Administrator')) ||
                address === teamLeaderAddress) && (
                <Button
                  variant="gradient"
                  width="145px"
                  onClick={() => {
                    setUpdateDialogVisible(true);
                  }}
                >
                  Edit
                </Button>
              )}
            </Box>
            <Typography
              variant="body1"
              letterSpacing="-0.002rem"
              lineHeight="24px"
              color="#666F85"
            >
              {data?.description}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize="16px" fontWeight={600} color="#101828">
              Members
            </Typography>
            <Box display="flex" gap="10px" marginTop="15px">
              {leader &&
                leader.map((member, index) => (
                  <Link
                    sx={{
                      border: '0.5px solid #d0d5dd',
                      borderRadius: '2px',
                      width: '60px',
                      height: '60px',
                      position: 'relative',
                    }}
                    target="_blank"
                    href={`/buidlers/${member?.member?.address}`}
                    key={index}
                  >
                    <Img3
                      src={getImg3DidStrFromUrl(member?.member?.avatar)}
                      style={{
                        width: '59px',
                        height: '59px',
                      }}
                    />

                    <Typography
                      position="absolute"
                      sx={{
                        right: 0,
                        bottom: 0,
                        fontSize: '10px',
                        lineHeight: '12px',
                        color: '#fff',
                        background: '#36AFF9',
                        width: '28px',
                        zIndex: 3,
                        textAlign: 'center',
                      }}
                    >
                      Lead
                    </Typography>
                  </Link>
                ))}
              {normalMembers &&
                normalMembers.map((member, index) => (
                  <Link
                    sx={{
                      border: '0.5px solid #d0d5dd',
                      borderRadius: '2px',
                      width: '60px',
                      height: '60px',
                      position: 'relative',
                    }}
                    target="_blank"
                    href={`/buidlers/${member?.member?.address}`}
                    key={index}
                  >
                    <Img3
                      src={getImg3DidStrFromUrl(member?.member?.avatar)}
                      style={{
                        width: '59px',
                        height: '59px',
                      }}
                    />
                  </Link>
                ))}
            </Box>
          </Box>
          {(data?.weeklyMeetingLink ||
            data?.weeklyUpdateLink ||
            data?.bountyTaskLink ||
            data?.roadmapLink) && (
            <Box marginBottom="120px">
              <Typography
                fontSize="16px"
                fontWeight={600}
                color="#101828"
                lineHeight="20px"
              >
                Links
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap="24px"
                marginTop="16px"
              >
                {data?.weeklyMeetingLink && (
                  <LinkItem
                    title="Weekly meeting"
                    link={data?.weeklyMeetingLink}
                    description={data?.weeklyMeetingTime}
                  />
                )}
                {data?.weeklyUpdateLink && (
                  <LinkItem
                    title="Weekly update"
                    link={data?.weeklyUpdateLink}
                  />
                )}
                {data?.bountyTaskLink && (
                  <LinkItem title="Bounty task" link={data?.bountyTaskLink} />
                )}
                {data?.roadmapLink && (
                  <LinkItem title="Roadmap" link={data?.roadmapLink} />
                )}
              </Box>
            </Box>
          )}
        </Box>
        <Dialog
          fullWidth={true}
          maxWidth={'md'}
          onClose={(event, reason) => {
            if (reason && reason == 'backdropClick') return;
            setUpdateDialogVisible(false);
          }}
          open={updateDialogVisible}
        >
          <Box
            onClick={() => {
              setUpdateDialogVisible(false);
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
          <DialogTitle sx={{ marginBottom: '40px' }}>
            Working Group Details
          </DialogTitle>
          <DialogContent>
            <WorkingGroupForm
              isUpdate={true}
              values={_.cloneDeep(
                _.pick(data, [
                  'name',
                  'description',
                  'shortDescription',
                  'weeklyMeetingLink',
                  'weeklyMeetingTime',
                  'weeklyUpdateLink',
                  'bountyTaskLink',
                  'roadmapLink',
                  'bannerURI',
                  'badgeName',
                  'membersInWorkingGroup',
                ])
              )}
              saveWorkingGroupHandler={updateWorkingGroupHandler}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Layout>
  );
}
