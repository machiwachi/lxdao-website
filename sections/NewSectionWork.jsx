import { useEffect, useState } from 'react';

import { Box, Card, Link, Typography } from '@mui/material';

import Container from '@/components/Container';

import { erc20Abi } from 'viem';

import { useReadContracts } from 'wagmi';

import API from '@/common/API';
import { SNAPSHOTURL, queryProposals } from '@/graphql/snapshot';

import { request } from 'graphql-request';

export default function NewSectionWork({ projectAmount, buidlerAmount }) {
  const usdtAmount = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: ['0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2'],
      },
    ],
  });

  const usdcAmount = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: ['0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2'],
      },
    ],
  });

  const daiAmount = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: ['0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2'],
      },
    ],
  });

  const [totalTreasury, setTotalTreasury] = useState(0);

  useEffect(() => {
    if (usdtAmount.data && usdcAmount.data && daiAmount.data) {
      const sum =
        parseFloat(usdtAmount.data[0]) / 1e6 +
        parseFloat(usdcAmount.data[0]) / 1e6 +
        parseFloat(daiAmount.data[0]) / 1e18;
      setTotalTreasury(sum);
    }
  }, [usdtAmount.data, usdcAmount.data, daiAmount.data]);

  return (
    <Container py="120px">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          variant="h2"
          color="#101828"
          fontSize="48px!important"
          fontWeight="bold"
          lineHeight="44px"
          textTransform="uppercase"
          mr="53px"
        >
          LXDAO Now
        </Box>
        <Box
          sx={{
            width: '660px',
            fontSize: '18px',
            lineHeight: '140%',
          }}
        >
          Check out what is going on in LXDAO community. <br />
          Join the events, meetings, and share your thoughts in our online
          discussions.
        </Box>
      </Box>
      <Box
        sx={{
          overflow: 'scroll',
          width: '1218px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            paddingY: '40px',
            width: 'fit-content',
            mt: '52px',
          }}
        >
          <EventsCard />
          <MeetingsCard />
          <DiscussionsCard />
          <VotesCard />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            height: '20px',
            width: 'calc(100% - 260px)',
            background:
              'linear-gradient(135deg, #2975DF 0%, #32A5E1 50%, #3ACFE3 100%)',
            mr: '24px',
          }}
        ></Box>
        <Typography fontSize="24px" fontWeight={700} noWrap>
          LXDAO in Numbers
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mt: '48px',
          justifyContent: 'space-between',
        }}
      >
        <DataBox value="16K+" title="Twitter Followers & TG Members" />
        <DataBox value={buidlerAmount} title="Registered member" />
        <DataBox value={projectAmount} title="Supported projects" />
        <DataBox value={totalTreasury} title="Treasury" />
      </Box>
    </Container>
  );
}
function DataBox({ value, title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        py: '48px',
        gap: '32px',
        width: '250px',
      }}
    >
      <Typography fontSize="36px" fontWeight="700">
        {value}
      </Typography>
      <Typography maxWidth="200px">{title}</Typography>
    </Box>
  );
}

function VotesCard() {
  const [proposalData, setProposalData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await request(SNAPSHOTURL, queryProposals);
      const latest3Result = result.proposals.slice(0, 3);
      const proposals = latest3Result?.map((item) => ({
        id: item.id,
        title: item.title,
        choices: item.choices,
        scores: item.scores,
      }));
      setProposalData(proposals);
    })();
  }, []);
  return (
    <LXCard index={2} title="Discussions" footer="Snapshot ->" link="/">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {!!proposalData.length &&
          proposalData.map((item, index) => (
            <WorkDetailItem
              key={index}
              title={item.content}
              type={'vote'}
              data={item}
            />
          ))}
      </Box>
    </LXCard>
  );
}

function DiscussionsCard() {
  const [ideaData, setIdeasData] = useState([]);
  useEffect(() => {
    API.get(`/community/ideas.json`)
      .then((res) => {
        if (res?.data?.data) {
          setIdeasData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <LXCard index={2} title="Discussions" footer="Forum ->" link="/">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {!!ideaData.length &&
          ideaData.map((item, index) => (
            <WorkDetailItem
              key={index}
              title={item.content}
              type={'idea'}
              data={item}
            />
          ))}
      </Box>
    </LXCard>
  );
}

function LXCard({ children, index, title, footer, footerLink }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '332px',
        height: '520px',
        backgroundImage: `url(/images/new/card${index + 1}.png)`,
        backgroundSize: 'cover',
        py: '40px',
        px: '24px',
      }}
    >
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: '500',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          height: '304px',
          mt: '20px',
        }}
      >
        {children}
      </Box>
      <Link
        href={footerLink}
        sx={{
          textDecoration: 'none',
          fontSize: '32px',
          textAlign: 'right',
          fontWeight: '700',
          mt: '20px',
        }}
      >
        {footer}
      </Link>
    </Box>
  );
}
function MeetingsCard() {
  return (
    <LXCard index={1} title="Space & Meetings" footer="Calendar ->" link="/">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <MeetingDetailCard title="Intensive Co-learning" key={index} />
        ))}
      </Box>
    </LXCard>
  );
}

function EventsCard() {
  return (
    <LXCard index={0} title="Event" footer="Luma ->" link="/">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <EventDetailCard title="Intensive Co-learning" key={index} />
        ))}
      </Box>
    </LXCard>
  );
}

function MeetingDetailCard({ title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        py: '12px',
        bgcolor: 'transparent',
      }}
    >
      <Typography fontSize="14px" mr="20px">
        Sept 18
      </Typography>
      <Typography
        fontSize="14px"
        lineHeight="19px"
        fontWeight={600}
        color="#101828"
        maxWidth={{ sm: '250px', xs: '180px' }}
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          wordWrap: 'break-word',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

function EventDetailCard({ title }) {
  return (
    <Card
      sx={{
        py: '22px',
        px: '23px',
      }}
    >
      <Typography
        fontSize="14px"
        lineHeight="19px"
        fontWeight={600}
        color="#101828"
        maxWidth={{ sm: '250px', xs: '180px' }}
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          wordWrap: 'break-word',
        }}
      >
        {title}
      </Typography>
      <Box display="flex" gap={4} color="#666F85" mt="8px">
        <Typography fontSize="12px">Sept 18</Typography>
        <Typography fontSize="12px">Shanghai, China</Typography>
      </Box>
    </Card>
  );
}

const WorkDetailItem = ({ type, data, ...rest }) => {
  return (
    <Link
      href={
        type === 'idea'
          ? `https://forum.lxdao.io/t/${data?.slug}/${data.id}`
          : `https://snapshot.org/#/lxdao.eth/proposal/${data.id}`
      }
      target="_blank"
      sx={{ textDecoration: 'none' }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="22px"
        sx={{ backgroundColor: '#ffffff' }}
        borderRadius="6px"
        gap="100px"
        width={{ sm: '284px', xs: '350px' }}
        {...rest}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography
            fontSize="14px"
            lineHeight="19px"
            fontWeight={600}
            color="#101828"
            maxWidth={{ sm: '250px', xs: '180px' }}
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              wordWrap: 'break-word',
            }}
          >
            {data?.title}
          </Typography>
          <Box display="flex" gap={2}>
            <Box display="flex" gap="3px">
              <Typography
                fontSize="12px"
                lineHeight="17px"
                fontWeight={400}
                color="#666F85"
              >
                {type === 'idea' ? 'Views' : data?.choices[0]}
              </Typography>
              <Typography
                variant="body2"
                lineHeight="17px"
                fontWeight={600}
                color="#36AFF9"
              >
                {type === 'idea' ? data?.views : data?.scores[0]}
              </Typography>
            </Box>
            <Box display="flex" gap="3px">
              <Typography
                variant="body2"
                lineHeight="17px"
                fontWeight={400}
                color="#666F85"
              >
                {type === 'idea' ? 'Replies' : data?.choices[1]}
              </Typography>
              <Typography
                variant="body2"
                lineHeight="17px"
                fontWeight={600}
                color="#36AFF9"
              >
                {type === 'idea' ? data?.reply_count : data?.scores[1]}
              </Typography>
            </Box>
            <Box display="flex" gap="3px">
              <Typography
                variant="body2"
                lineHeight="17px"
                fontWeight={400}
                color="#666F85"
              >
                {type === 'idea' ? 'Likes' : data?.choices[2]}
              </Typography>
              <Typography
                variant="body2"
                lineHeight="17px"
                fontWeight={600}
                color="#36AFF9"
              >
                {type === 'idea' ? data?.like_count : data?.scores[2]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
