/* eslint-disable no-undef */
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import SkillsField from './SkillsField';
import ContactsField from './ContactsField';
import MultiSelect from './MultiSelect';
import TextInput from './TextInput';
import Avatar from './Avatar';

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
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    // todo send api request
    console.log(data);
  };

  return (
    <Box>
      <Box marginBottom={4}>
        <Controller
          name={'avatar'}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Avatar width="150px" value={value} onChange={onChange}></Avatar>
            );
          }}
        />
      </Box>
      <Box marginBottom={2.5}>
        <Controller
          name={'name'}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                fullWidth
                label="Name"
                placeholder="Your nick name"
                onChange={onChange}
                value={value}
              />
            );
          }}
        />
      </Box>
      <Box marginBottom={2.5}>
        <Controller
          name={'description'}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                multiline
                rows={2}
                placeholder="Self introduction"
                fullWidth
                label="Description"
                onChange={onChange}
                value={value}
              />
            );
          }}
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
        <Controller
          name={'skills'}
          control={control}
          render={({ field: { onChange, value } }) => {
            return <SkillsField value={value || []} onChange={onChange} />;
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
        <Controller
          name={'interests'}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <MultiSelect
                value={value || []}
                onChange={onChange}
                dropdown={interestNames}
              />
            );
          }}
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
        <Controller
          name={'contacts'}
          control={control}
          render={({ field: { onChange, value } }) => {
            return <ContactsField value={value || {}} onChange={onChange} />;
          }}
        />
      </Box>
      <Box marginTop={2}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          Save Profile
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileForm;
