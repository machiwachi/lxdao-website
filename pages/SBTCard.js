import CustomButton from '@/components/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; /* eslint-disable no-undef */
import WorkingGroupCard from '@/components/WorkingGroupCard';
import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import {
  Box,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  Container,
  Grid,
} from '@mui/material';
import workingGroupsData from '@/common/content/workingGroups';
import API from '@/common/API';
import LXButton from '@/components/Button';
// import { Button as LXButton } from '@/components/Button';

import Layout from '@/components/Layout';

export default function FirstBadge() {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    API.get(`/project?page=1&per_page=30`)
      .then((res) => {
        if (res?.data?.status === 'SUCCESS') {
          setProjects(res?.data?.data);
        } else {
          // todo Muxin common error handling, function invocation
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <Layout>
      <Container
        sx={{
          maxWidth: 1216,
          display: 'flex',
          flexDirection: 'column',
          mb: '55px',
        }}
      >
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="/">
              <Typography variant="body1">Member profile</Typography>
            </Link>
            <Link underline="none" color="#437EF7" aria-current="page">
              <Typography variant="body1">Earn your first badge</Typography>
            </Link>
          </Breadcrumbs>
        </Box>
        <Stack
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: { xs: 'center', md: 'left' },
            gap: 3,
            py: 6,
          }}
        >
          <Box position="relative">
            <Box
              sx={{
                position: 'absolute',
                width: '145.8px',
                borderBottom: '28.28px solid #d0d5dd',
                borderLeft: '28.28px solid transparent',
                borderRight: '28.28px solid transparent',
                textAlign: 'center',
                transform: 'rotate(-45deg)',
                top: 27.5,
                left: -31.5,
              }}
            ></Box>
            <Box
              sx={{
                position: 'absolute',
                width: '145.8px',
                height: '28.28px',
                textAlign: 'center',
                transform: 'rotate(-45deg)',
                top: 27.5,
                left: -31.5,
              }}
            >
              <Typography color="#fff" variant="body2" lineHeight="28.28px">
                To be earned
              </Typography>
            </Box>

            <Box
              component="img"
              src="/images/card.png"
              width="368px"
              //   height="180px"
            ></Box>
          </Box>

          <Typography
            fontFamily="Inter"
            fontSize="48px"
            lineHeight="44px"
            fontWeight="800"
          >
            Earn your SBT Card
          </Typography>
          <Typography fontSize="20px" color="#666F85">
            Governance rights entitled
          </Typography>
          <LXButton width="227px" variant="gradient">
            Mint
          </LXButton>
          <Typography fontSize="16px" color="#666F85">
            Contribute in projects or working groups to earn up to 600 USDC
            reward. Then request a current member with SBT held to initialize a
            proposal.
          </Typography>
        </Stack>
        <Stack gap={3} mb={3}>
          <Typography variant="subtitle2" fontWeight="800">
            Working groups
          </Typography>
          <Grid container spacing={2}>
            {workingGroupsData.length > 0 &&
              workingGroupsData.map((group, index) => {
                return (
                  <WorkingGroupCard hasBorder={true} key={index} {...group} />
                );
              })}
          </Grid>
        </Stack>
        <Stack gap={3}>
          <Typography variant="subtitle2" fontWeight="800">
            Projects
          </Typography>
          <Box overflow="scroll">
            <Box
              display="flex"
              flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
              alignItems="stretch"
              flexWrap="nowrap"
              gap={3}
            >
              {projects.map((project, index) => {
                return (
                  <Box
                    width={{
                      md: '500px',
                      sm: 'calc(100% - 40px)',
                      xs: 'calc(100% - 40px)',
                    }}
                    key={index}
                    flexShrink={0}
                    marginLeft={{
                      sm: 'auto',
                      xs: 'auto',
                    }}
                    marginRight={{

                      sm: 'auto',
                      xs: 'auto',
                    }}
                  >
                    <ProjectCard project={project} />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <CustomButton variant="outlined" width="200px">
            <Link
              href="/projects"
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              View all projects
            </Link>
          </CustomButton>
        </Stack>
      </Container>
    </Layout>
  );
}
