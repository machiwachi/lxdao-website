import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, Card, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import API from '@/common/API';
import { getRandom } from '@/utils/utility';

import Container from '@/components/Container';
import Button from '@/components/Button';
import DebouncedInput from '@/components/DebouncedInput';
import ProjectCard from '@/components/ProjectCard';

const SectionProjects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [finished, seFinished] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const route = router.route;
  const isHomepage = route === '/';

  useEffect(() => {
    loadList();
  }, []);

  const realProjects = isHomepage ? getRandom(projects, 3) : projects;

  const searchList = async (search = '') => {
    let query = `/project?page=1&`;
    let params = [];
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      params.push('search=' + trimmedSearch);
    }
    params.push('per_page=6');
    query += params.join('&');

    setLoading(true);
    try {
      const res = await API.get(query);
      const result = res.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      const records = result.data;

      let tempList = [];
      records.forEach((record) => {
        tempList.push(record);
      });

      setProjects(tempList);
    } catch (err) {
      console.error(err);
    }
  };

  const loadList = async (_page = 1) => {
    if (finished) {
      return;
    }
    setLoading(true);
    API.get(`/project?page=${_page}&per_page=6`)
      .then((res) => {
        if (res?.data?.status === 'SUCCESS') {
          if (res?.data?.data?.length < 6) {
            seFinished(true);
          }
          let _project = [...projects];
          _project = _project.concat(res?.data?.data);
          setProjects(_project);
          setLoading(false);
        } else {
          // todo Muxin common error handling, function invocation
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="Projects-Section"
      maxWidth="1200px"
      width="auto"
    >
      <Typography variant="h4">Projects</Typography>
      <Typography fontSize="20px" marginTop={2}>
        We buidl good, valuable, and useful things.If you have a perfect idea
        want to become true, please write a proposal first.
      </Typography>
      <Box
        sx={{
          width: '200px',
          height: '48px',
          background:
            'linear-gradient(89.57deg, #2975DF 0.27%, #3ACFE3 105.82%)',
          /* Shadow/xs */
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          /* identical to box height, or 150% */
          textTransform: 'capitalize',
          /* Base/White */
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          marginTop: '48px',
          cursor: 'pointer',
        }}
        onClick={() => {}}
      >
        buld your OWN
      </Box>
      <Box marginTop={8}>
        <DebouncedInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            searchList(value);
          }}
          label="Search"
          placeholder="Search project"
          sx={{ width: '389px', height: '54px' }}
        />
      </Box>
      <Box marginTop={6}>
        <Grid container spacing={3} alignItems="stretch">
          {realProjects.map((project, index) => {
            return (
              <Grid
                key={index}
                item
                sm={6}
                xs={12}
                md={4}
                display="flex"
                alignItems="stretch"
              >
                <ProjectCard project={project} index={index} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {isHomepage ? (
        <Box
          marginTop={{ md: 8, xs: 4 }}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={() => {
              router.push('/projects');
            }}
          >
            View More
          </Button>
        </Box>
      ) : finished ? null : (
        <Box
          marginTop={{ md: 8, xs: 4 }}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={() => {
              let pp = page + 1;
              setPage(pp);
              loadList(pp);
            }}
          >
            View More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SectionProjects;
