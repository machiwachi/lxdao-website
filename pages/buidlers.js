/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Link } from '@mui/material';
import _ from 'lodash';

import Layout from '@/components/Layout';

import DebouncedInput from '@/components/DebouncedInput';
import Container from '@/components/Container';
import API from '@/common/API';
import BuidlerContacts from '@/components/BuilderContacts';

const levelColors = {
  Junior: '#4CDBE4',
  Intermediate: '#4CE4C9',
  Senior: '#7CD89B',
};

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
                return (
                  <Box
                    key={item}
                    paddingX={1}
                    marginRight={0.5}
                    marginBottom={0.5}
                    sx={{
                      border: '1px solid #ccc',
                      fontSize: '14px',
                    }}
                  >
                    {item}
                  </Box>
                );
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
              {skills
                .sort((a, b) => {
                  if (a.level === 'Senior' && b.level !== 'Senior') {
                    return -1;
                  }
                  if (a.level === 'Intermediate' && b.level === 'Junior') {
                    return -1;
                  }
                  if (a.level === 'Junior' && b.level !== 'Junior') {
                    return 1;
                  }
                  return 0;
                })
                .map((skill) => {
                  return (
                    <Box
                      key={skill.name}
                      paddingX={1}
                      marginRight={0.5}
                      marginBottom={0.5}
                      sx={{
                        background: levelColors[skill.level],
                        color: '#fff',
                        borderRadius: 1,
                      }}
                    >
                      <Typography>{skill.name}</Typography>
                    </Box>
                  );
                })}
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

  // todo khan support address
  // todo support case insensitive search
  const searchList = async (name) => {
    let query = `/buidler/list`;
    if (name && name.length > 0) {
      query = `${query}?name=${name}`;
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
    searchList('');
  }, []);

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
