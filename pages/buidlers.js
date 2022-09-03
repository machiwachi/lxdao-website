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

function BuidlerCard(props) {
  const record = props.record;
  const skills = record.skills ? record.skills : [];

  return (
    <Box
      boxShadow={1}
      borderRadius={2}
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
            borderRadius="50%"
            overflow="hidden"
            marginRight={3}
          >
            <img
              style={{ display: 'block', width: 80 }}
              src={record.image || '/images/placeholder.jpeg'}
              alt=""
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                lineHeight: '44px',
              }}
            >
              {record.name}
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {record.role.map((item) => {
                return <Tag key={item} text={item}></Tag>;
              })}
            </Box>
          </Box>
        </Box>
        <Box marginTop={2}>
          <Typography fontWeight="bold">Skills</Typography>
          {skills.length === 0 ? (
            'No skills'
          ) : (
            <Box display="flex" flexWrap="wrap">
              <Skills skills={skills} />
            </Box>
          )}
        </Box>
        <Box marginTop={2}>
          <Typography fontWeight="bold">Projects</Typography>
          <Typography>
            <strong>{record.projects.length}</strong> Project Involved
          </Typography>
        </Box>
      </Link>

      <Box position="absolute" bottom="24px" right="24px">
        <BuidlerContacts contacts={record.contacts} />
      </Box>
    </Box>
  );
}

const roleNames = ['Buidler', 'Core', 'Project Manager', 'Investor'];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  const searchList = async (search = '', role = '') => {
    let query = `/buidler?`;
    let params = [];
    const trimmedSearch = search.trim();
    const trimmedRole = role.trim();
    if (trimmedSearch) {
      params.push('search=' + trimmedSearch);
    }
    if (trimmedRole) {
      params.push('role=' + trimmedRole);
    }
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
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchList();
  }, [search]);

  return (
    <Layout>
      <Container paddingY={10} maxWidth={1200}>
        <Box textAlign="center">
          <Typography variant="h3">LXDAO Buidlers</Typography>
          <Typography fontSize="20px" marginTop={2}>
            Here are registered LXDAO Buidlers. Welcome to{' '}
            <Link href={`/joinus`} target="_blank" color={'inherit'}>
              Join Us
            </Link>
            !
          </Typography>
        </Box>
        <Box marginTop={6.25}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <DebouncedInput
                value={search}
                onChange={(value) => {
                  setSearch(value);
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
        </Box>
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
                    <Grid key={item.id} item xs={4}>
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
