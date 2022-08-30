/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Link } from '@mui/material';

import Layout from '@/components/Layout';

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

export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  const searchList = async (search, role) => {
    let query = `/buidler/list`;
    if (search && search.length > 0) {
      query = `${query}?search=${search}`;

      if (role && role.length > 0) {
        query = query + `&role=${role}`;
      }
    } else {
      if (role && role.length > 0) {
        query = `${query}?role=${role}`;
      }
    }

    API.get(query).then((data) => {
      const result = data?.data;
      if (result.status !== 'SUCCESS') {
        // error todo alert
        return;
      }
      const records = result.data;

      let tempList = [];
      records.forEach((record) => {
        tempList.push(record);
      });

      setList(tempList);
    });
  };

  useEffect(() => {
    searchList(search);
  }, [search]);

  return (
    <Layout>
      <Container paddingY={10}>
        <Box textAlign="center">
          <Typography variant="h3">LXDAO Buidlers</Typography>
          <Typography fontSize="20px" marginTop={2}>
            Here are registered LXDAO Buidlers. Join Us(TODO).
          </Typography>
        </Box>
        <Box marginTop={6.25}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DebouncedInput
                value={search}
                onChange={(value) => {
                  setSearch(value);
                }}
                label="Search"
                placeholder="Search buidlers"
              />
            </Grid>
            {/* <Grid item xs={4}>
              <SingleSelect
                value={skill}
                label="Skill"
                dropdown={skillNames}
                onChange={(value) => {
                  setSkill(value);
                  searchList('', value);
                }}
              />
            </Grid> */}
          </Grid>
        </Box>
        <Box marginTop={6.25}>
          {list.length === 0 ? (
            <Box>404 todo not found</Box>
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
      </Container>
    </Layout>
  );
}
