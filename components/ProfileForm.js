/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

import SkillsField from './SkillsField';
import ContactsField from './ContactsField';
import MultiSelect from './MultiSelect';

const interestNames = [
  'Design',
  'Project Management',
  'Product Management',
  'FrontEnd',
  'FullStack',
  'BackEnd',
  'Operation',
  'DAO',
  'Solidity',
  'Blockchain',
  'Others',
];

function ProfileForm() {
  const [interests, setInterests] = useState([]);

  return (
    <Box>
      <Box marginBottom={6}>
        <Box width="150px" borderRadius="50%" overflow="hidden">
          <img
            style={{ display: 'block', width: 150 }}
            src="/images/kuncle.jpeg"
            alt=""
          />
        </Box>
      </Box>
      <Box marginBottom={2.5}>
        <TextField fullWidth label="Name" placeholder="Your nick name" />
      </Box>
      <Box marginBottom={2.5}>
        <TextField
          multiline
          rows={2}
          placeholder="Self introduction"
          fullWidth
          label="Description"
        />
      </Box>
      <Box>
        <Typography
          marginBottom={2}
          sx={{
            fontSize: '20px',
          }}
        >
          Skills
        </Typography>
        <SkillsField
          value={[
            {
              name: 'Design',
              level: 'Senior',
            },
            {
              name: 'Project Management',
              level: 'Junior',
            },
          ]}
          onChange={(value) => {
            console.log('value: ', value);
          }}
        />
      </Box>
      <Box marginBottom={2.5}>
        <Typography
          marginBottom={2}
          sx={{
            fontSize: '20px',
          }}
        >
          Interests
        </Typography>
        <MultiSelect
          value={interests}
          onChange={(value) => {
            setInterests(value);
          }}
          dropdown={interestNames}
        />
      </Box>
      <Box>
        <Typography
          marginBottom={2}
          sx={{
            fontSize: '20px',
          }}
        >
          Contacts
        </Typography>
        <ContactsField
          value={{
            twitter: '@kuncle',
            github: 'kuncle',
            wechat: 'kuncle',
            telegram: 'kuncle',
            email: 'kuncle@lxdao.io',
            discord: 'kuncle@lxdao.io',
          }}
          onChange={(value) => {
            console.log('value: ', value);
          }}
        />
      </Box>
      <Box marginTop={2}>
        <Button variant="contained" size="large">
          Save Profile
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileForm;
