import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import { Box, Typography, Link } from '@mui/material';
import API from '@/common/API';

import SimpleProjectCard from '@/components/SimpleProjectCard';

const WorkDetailItem = ({ title, data, ...rest }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="22px"
      sx={{ backgroundColor: '#ffffff' }}
      borderRadius="6px"
      gap="100px"
      {...rest}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography
          variant="body1"
          lineHeight="19px"
          fontWeight={600}
          color="#101828"
        >
          {data?.title}
        </Typography>
        <Box display="flex" gap={2}>
          <Box display="flex" gap="3px">
            <Typography
              variant="body2"
              lineHeight="17px"
              fontWeight={400}
              color="#666F85"
            >
              Views
            </Typography>
            <Typography
              variant="body2"
              lineHeight="17px"
              fontWeight={600}
              color="#36AFF9"
            >
              {data?.views}
            </Typography>
          </Box>
          <Box display="flex" gap="3px">
            <Typography
              variant="body2"
              lineHeight="17px"
              fontWeight={400}
              color="#666F85"
            >
              Replies
            </Typography>
            <Typography
              variant="body2"
              lineHeight="17px"
              fontWeight={600}
              color="#36AFF9"
            >
              {data?.reply_count}
            </Typography>
          </Box>
          <Box display="flex" gap="3px">
            <Typography
              variant="body2"
              lineHeight="17px"
              fontWeight={400}
              color="#666F85"
            >
              Likes
            </Typography>
            <Typography
              variant="body2"
              lineHeight="17px"
              fontWeight={600}
              color="#36AFF9"
            >
              {data?.like_count}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Link
        href={`https://forum.lxdao.io/t/${data?.slug}/${data.id}`}
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <Typography
          variant="subtitle1"
          lineHeight="24px"
          fontWeight={600}
          color="#36AFF9"
        >
          →
        </Typography>
      </Link>
    </Box>
  );
};

const WorkDetailSection = ({
  title,
  data,
  bottomButtonText,
  bottomButtonLink,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      marginX={{ lg: 0, md: '20px', xs: '20px' }}
    >
      <Typography
        variant="h5"
        lineHeight="34px"
        fontWeight={800}
        color="#ffffff"
      >
        {title}
      </Typography>
      <Box display="flex" gap={2} flexDirection="column">
        {data.length &&
          data.map((item, index) => (
            <WorkDetailItem key={index} title={item.content} data={item} />
          ))}
      </Box>
      <Link
        href={bottomButtonLink}
        target="_blank"
        sx={{ textDecoration: 'none' }}
      >
        <Box
          padding="22px"
          sx={{ backgroundColor: '#ffffff' }}
          borderRadius="6px"
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Box component={'img'} src={'/icons/add.svg'} />
          <Typography
            variant="subtitle2"
            lineHeight="22px"
            fontWeight={800}
            color="#101828"
          >
            {bottomButtonText}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

const WorkStep = ({
  leftBgColor,
  rightBgColor,
  stepIcon,
  stepTitle,
  stepDes,
  rightSection,
}) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ lg: 'row', md: 'column', xs: 'column' }}
      position={{ lg: 'sticky', md: 'relative', xs: 'relative' }}
      top={0}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={{ lg: '50%', md: '100%', xs: '100%' }}
        height="100vh"
        position={{ lg: 'relative', md: 'sticky', xs: 'sticky' }}
        top={0}
        sx={{ backgroundColor: leftBgColor }}
      >
        <Box maxWidth="360px" display="flex" flexDirection="column" gap="20px">
          <Box component={'img'} width="125px" src={stepIcon} />
          <Typography
            variant="h5"
            lineHeight="34px"
            fontWeight={800}
            color="#101828"
          >
            {stepTitle}
          </Typography>
          <Typography
            variant="body1"
            lineHeight="24px"
            fontWeight={400}
            color="#666F85"
          >
            {stepDes}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width={{ lg: '50%', md: '100%', xs: '100%' }}
        position={{ lg: 'relative', md: 'sticky', xs: 'sticky' }}
        top={0}
        sx={{ backgroundColor: rightBgColor }}
      >
        {rightSection}
      </Box>
    </Box>
  );
};

const voteData = [
  {
    content: 'Investigate voting records',
    data: [
      {
        name: 'For',
        number: '0',
      },
      {
        name: 'Against',
        number: '0',
      },
      {
        name: 'Abstain',
        number: '0',
      },
    ],
    link: '',
  },
  {
    content: 'Invest data site',
    data: [
      {
        name: 'For',
        number: '0',
      },
      {
        name: 'Against',
        number: '0',
      },
      {
        name: 'Abstain',
        number: '0',
      },
    ],
    link: '',
  },
  {
    content: 'LXDAO Member NFT PFP idea collect',
    data: [
      {
        name: 'For',
        number: '0',
      },
      {
        name: 'Against',
        number: '0',
      },
      {
        name: 'Abstain',
        number: '0',
      },
    ],
    link: '',
  },
];

const SectionWorkSteps = ({ projects }) => {
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
    <Box width="100%">
      <Box
        textAlign="center"
        marginTop={{ md: '112px', sm: '48px', xs: '48px' }}
        marginBottom={{ md: '95px', sm: '48px', xs: '48px' }}
      >
        <Typography
          variant="subtitle1"
          lineHeight="60px"
          fontWeight={500}
          letterSpacing="-0.02em"
          marginBottom={{ md: 0, sm: '20px', xs: '20px' }}
        >
          LXDAO & WORK
        </Typography>
        <Typography
          variant="h2"
          lineHeight={{ md: '68px', sm: '37px', xs: '37px' }}
          fontWeight={800}
        >
          How does LXDAO work?
        </Typography>
      </Box>
      <Box position="relative">
        <WorkStep
          leftBgColor="#F1F3F5"
          rightBgColor="#10D7C4"
          stepIcon="/icons/idea.svg"
          stepTitle="IDEA"
          stepDes="Initiate creative proposals in our community Initiate creative
            proposals in our community.creative proposals in ou,creative
            proposals in ouInitiate creative proposals in our community creative
            proposals"
          rightSection={
            <WorkDetailSection
              title="In progress proposal"
              data={ideaData}
              bottomButtonText="Post an idea"
              bottomButtonLink="https://forum.lxdao.io/tag/idea"
            />
          }
        />
        <WorkStep
          leftBgColor="#ffffff"
          rightBgColor="#36AFF9"
          stepIcon="/icons/vote.svg"
          stepTitle="VOTE"
          stepDes="Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote.Discussion Proposal Vote."
          rightSection={
            <WorkDetailSection
              title="Investigate voting records"
              data={voteData}
              bottomButtonText="Create a vote"
              bottomButtonLink="https://snapshot.org/#/lxdao.eth"
            />
          }
        />
        <WorkStep
          leftBgColor="#F1F3F5"
          rightBgColor="#10D7C4"
          stepIcon="/icons/buidling.svg"
          stepTitle="BUIDLING"
          stepDes="buidling buidling buidling buidling buidling buidling buidling buidling buidling buidling"
          rightSection={
            <Box>
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {projects.map((data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <SimpleProjectCard data={data} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          }
        />
        <WorkStep
          leftBgColor="#ffffff"
          rightBgColor="#36AFF9"
          stepIcon="/icons/success.svg"
          stepTitle="Fund allocation"
          stepDes="After the product is perfected, the fund is allocated according to the contribution.After the product is perfected, the fund is allocated according to the contributionAfter the product is perfected, the fund is allocated according to the contribution"
          rightSection={
            <Box
              component="img"
              width={{ sm: '450px', xs: '320px' }}
              src="/images/workstep-success.png"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default SectionWorkSteps;
