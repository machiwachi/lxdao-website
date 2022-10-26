import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Container from '@/components/Container';
import coreTeamData from '@/common/content/coreTeam';
import { convertIpfsGateway } from '@/utils/utility';

const useStyles = makeStyles(() => ({
  memberCardWrapper: {
    cursor: 'pointer',
    '& .memberInfoWrapper': {
      visibility: 'hidden',
      opacity: 0,
      transition: 'visibility 0s, opacity 0.3s linear',
      fontSize: '14px',
    },
    '& .memberAvatar': {
      width: '80px',
      height: '80px',
      transition: 'width 0.1s, height 0.1s linear',
    },
    '& .memberTwitter': {
      display: 'none',
    },
    '&:hover': {
      '& .memberInfoWrapper': {
        visibility: 'visible',
        opacity: 1,
      },
      '& .memberAvatar': {
        width: '50px',
        height: '50px',
      },
      '& .memberTwitter': {
        display: 'block',
      },
    },
  },
}));

const TeamMemberCard = ({ data }) => {
  const styles = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      className={styles.memberCardWrapper}
    >
      <Box marginBottom="12px">
        <img
          src={convertIpfsGateway(data.avatarUrl)}
          style={{ borderRadius: '50%' }}
          className="memberAvatar"
        />
      </Box>
      <Box display="flex" gap="5px">
        <Typography
          variant="body"
          lineHeight="28px"
          color="#101828"
          className="memberName"
          fontWeight={700}
        >
          {data.name}
        </Typography>
        {data.twitter && (
          <Typography
            marginTop="4px"
            target="_blank"
            component="a"
            href={'https://twitter.com/' + data.twitter}
            color="primary"
            className="memberTwitter"
          >
            <Box width="15px" component={'img'} src={'/icons/twitter.svg'} />
          </Typography>
        )}
      </Box>

      <Box className="memberInfoWrapper">
        <Typography marginTop={1} color="#305FE8">
          {data.title}
        </Typography>
        <Typography>{data.description}</Typography>
      </Box>
    </Box>
  );
};

const SectionCoreTeam = () => {
  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="CoreTeam-Section"
      maxWidth="1200px"
    >
      <Typography variant="h4">LXDAO Foundation Team</Typography>
      <Typography fontSize="20px" marginTop={2}>
        The LXDAO Foundation Team is responsable for the LXDAO infrastructure
        and acting as a backup to buidl with LXDAO buidlers.
      </Typography>
      <Box marginTop="96px">
        <Grid
          container
          spacing={{ xs: 4, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {coreTeamData.map((data, index) => {
            return (
              <Grid item xs={2} sm={2} md={2} key={index}>
                <TeamMemberCard data={data} key={index} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default SectionCoreTeam;
