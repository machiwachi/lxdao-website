import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';

import API from '@/common/API';
import { getRandom } from '@/utils/utility';

import Container from '@/components/Container';
import Button from '@/components/Button';
import DebouncedInput from '@/components/DebouncedInput';
import ProjectCard from '@/components/ProjectCard';

const SectionProjects = () => {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const route = router.route;
  const isHomepage = route === '/';

  useEffect(() => {
    searchList();
  }, []);

  const realProjects = isHomepage ? getRandom(projects, 3) : projects;

  const searchList = async (
    search = '',
    currentPage = 0,
    isAddMore = false
  ) => {
    let query = `/project?`;
    let params = [];
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      params.push('search=' + trimmedSearch);
    }
    params.push('page=' + (currentPage || current));
    params.push('per_page=6');
    query += params.join('&');

    if (!isAddMore) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
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
      setHasMore(tempList.length === 6);

      isAddMore
        ? setProjects([...projects, ...tempList])
        : setProjects(tempList);
    } catch (err) {
      console.error(err);
    }
    if (!isAddMore) {
      setLoading(false);
    } else {
      setLoadingMore(false);
    }
  };

  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="Projects-Section"
      maxWidth="1200px"
      width="auto"
    >
      <Typography
        fontWeight={600}
        lineHeight="44px"
        sx={{
          fontSize: { xs: '30px', md: '70px' },
        }}
      >
        LXDAO Projects
      </Typography>
      <Typography
        fontSize="20px"
        lineHeight="24px"
        marginTop={3}
        color="#666F85"
      >
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
        buidl your OWN
      </Box>
      <Box marginTop={12}>
        <DebouncedInput
          value={search}
          onChange={(value) => {
            setCurrent(1);
            setSearch(value);
            searchList(value, 1);
          }}
          label="Search"
          placeholder="Search project"
          sx={{ maxWidth: '389px', height: '54px' }}
        />
      </Box>
      {loading ? (
        <Box marginTop={10} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
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
      )}
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
      ) : (
        <Box
          marginTop={{ md: 8, xs: 4 }}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          {loadingMore ? (
            <Box marginTop={10} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : hasMore ? (
            <Button
              variant="outlined"
              onClick={() => {
                setCurrent(current + 1);
                searchList(search, current + 1, true);
              }}
            >
              View More
            </Button>
          ) : null}
        </Box>
      )}
    </Container>
  );
};

export default SectionProjects;
