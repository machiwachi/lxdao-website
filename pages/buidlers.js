/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Link, CircularProgress } from '@mui/material';

import Layout from '@/components/Layout';
import SingleSelect from '@/components/Select';
import DebouncedInput from '@/components/DebouncedInput';
import Container from '@/components/Container';
import API from '@/common/API';
import Tag from '@/components/Tag';
import Skills from '@/components/Skills';
import BuidlerContacts from '@/components/BuidlerContacts';
import Button from '@/components/Button';

import { convertIpfsGateway } from '@/utils/utility';
import Button from '@/components/Button';

export function BuidlerCard(props) {
  const record = props.record;
  const skills = record.skills ? record.skills : [];

  return (
    <Box
      border="0.5px solid #D0D5DD"
      borderRadius="6px"
      padding={3}
      position="relative"
      paddingBottom={7}
      height="100%"
    >
      <Link
        href={`/buidlers/${record.address}`}
        target="_blank"
        color={'inherit'}
        sx={{
          textDecoration: 'none',
        }}
      >
        <Box display="flex">
          <Box
            flexBasis="80px"
            flexShrink={0}
            width="80px"
            height="80px"
            borderRadius="6px"
            overflow="hidden"
            border="0.5px solid #E5E5E5"
            marginRight={3}
          >
            <img
              style={{ display: 'block', width: 80 }}
              src={
                convertIpfsGateway(record.avatar) || '/images/placeholder.jpeg'
              }
              alt=""
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              sx={{
                lineHeight: '24px',
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              {record.name}
            </Typography>
            <Box width="36px" height="36px">
              <BuidlerContacts contacts={record.contacts} />
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap" marginTop={2}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: '24px',
              color: '#666F85',
            }}
          >
            {record.description}
          </Typography>
        </Box>

        <Box display="flex" flexWrap="wrap" marginTop={2}>
          {record.role.map((item) => {
            return <Tag key={item} text={item}></Tag>;
          })}
        </Box>
        {skills.length > 0 && (
          <Box marginTop={2}>
            <Typography fontWeight="600" marginBottom={2} variant="body1">
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap">
              <Skills skills={skills} />
            </Box>
          </Box>
        )}
        {record.projects.filter((project) => project.status !== 'PENDING')
          .length > 0 && (
          <Box marginTop={2}>
            <Typography fontWeight="600" marginBottom={2} variant="body1">
              Projects
            </Typography>
            <Box display="flex">
              {record.projects
                .filter((project) => project.status !== 'PENDING')
                .map((project) => (
                  <Box
                    key={project.id}
                    width="60px"
                    height="60px"
                    borderRadius="6px"
                    overflow="hidden"
                    border="0.5px solid #E5E5E5"
                    marginRight={1.25}
                  >
                    <img
                      style={{ display: 'block', width: 60 }}
                      src={project.project?.logo || '/images/placeholder.jpeg'}
                      alt=""
                    />
                  </Box>
                ))}
            </Box>
          </Box>
        )}
      </Link>
    </Box>
  );
}

const roleNames = [
  'All',
  'Buidler',
  'Core',
  'Project Manager',
  'Investor',
  'Onboarding Committee',
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  const searchList = async (search = '', role = '') => {
    let query = `/buidler?`;
    let params = [];
    const trimmedSearch = search.trim();
    const trimmedRole = role === 'All' ? '' : role.trim();
    if (trimmedSearch) {
      params.push('search=' + trimmedSearch);
    }
    if (trimmedRole) {
      params.push('role=' + trimmedRole);
    }
    params.push('per_page=50');
    params.push('status=ACTIVE');
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

      setList(tempList);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // todo Muxin add pagination later with many buidlers
  useEffect(() => {
    searchList();
  }, []);

  return (
    <Layout>
      <Container paddingY={10} maxWidth={1216}>
        <Box
          display="flex"
          flexDirection="column"
          gap={6}
          alignItems={{ lg: 'center', xs: 'center' }}
          textAlign={{ lg: 'center', xs: 'center' }}
        >
          <Box textAlign="center" gap={6}>
            <Typography variant="h1" lineHeight="70px">
              LXDAO Buidlers
            </Typography>
            <Typography
              variant="subtitle1"
              lineHeight="30px"
              color="#667085"
              marginTop={4}
            >
              Welcome to Join Us, let's buidl more valuable Web3 products
              together!
            </Typography>
          </Box>
          <Button variant="gradient" width="200px" marginBottom={2}>
            <Link
              href={`/joinus`}
              color="#ffffff"
              sx={{
                textDecoration: 'none',
              }}
            >
              JOIN US
            </Link>
          </Button>
        </Box>

        <Grid marginTop={10} container spacing={2}>
          <Grid xs={2} />
          <Grid item xs={4}>
            <DebouncedInput
              value={search}
              onChange={(value) => {
                setSearch(value);
                searchList(value, role);
              }}
              label="Search"
              placeholder="Search buidlers"
            />
          </Grid>
          <Grid item xs={4}>
            <SingleSelect
              value={role}
              label="Role"
              dropdown={roleNames}
              onChange={(value) => {
                setRole(value);
                searchList(search, value);
              }}
            />
          </Grid>
        </Grid>

        {loading ? (
          <Box marginTop={10} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box marginTop={6.25}>
            {list.length === 0 ? (
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                alignItems="center"
                paddingY={4}
              >
                <img width="80px" src="/icons/no-records.png" />
                <Typography marginTop={4} color="#D0D5DD" fontSize="16px">
                  No builders found with the search criteria
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {list.map((item) => {
                  return (
                    <Grid key={item.id} item xs={12} md={6} lg={4}>
                      <BuidlerCard record={item} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        )}
      </Container>
    </Layout>
  );
}
