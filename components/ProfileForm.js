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

function ProfileForm(props) {
  // show
  const metaData = props.metaData;
  console.log(metaData);

  const saveProfileHandler = props.saveProfileHandler;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('data: ', data);
    if (saveProfileHandler) {
      saveProfileHandler(data);
    }
  };

  return (
    <Box>
      <Box marginBottom={4}>
        <Controller
          name={'avatar'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <Avatar
                error={errors.avatar}
                width="150px"
                value={value}
                onChange={onChange}
              ></Avatar>
            );
          }}
        />
        {errors.avatar && (
          <Typography
            fontSize="0.75rem"
            color="#d32f2f"
            marginTop={2}
            marginLeft={3}
          >
            Avatar is required
          </Typography>
        )}
      </Box>
      <Box marginBottom={2.5}>
        <Controller
          name={'name'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                fullWidth
                label="Name"
                placeholder="Your nick name"
                onChange={onChange}
                value={value}
                error={errors.name}
                helperText={errors.name ? 'Name is required' : ''}
              />
            );
          }}
        />
      </Box>
      <Box marginBottom={2.5}>
        <Controller
          name={'description'}
          control={control}
          rules={{ required: true }}
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
                error={errors.description}
                helperText={errors.description ? 'Description is required' : ''}
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
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return <SkillsField value={value || []} onChange={onChange} />;
          }}
        />
        {errors.skills && (
          <Typography
            marginTop={-2}
            fontSize="0.75rem"
            color="#d32f2f"
            marginLeft={2}
          >
            Skills are required
          </Typography>
        )}
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
          rules={{ required: true }}
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
        {errors.interests && (
          <Typography
            fontSize="0.75rem"
            color="#d32f2f"
            marginTop={1}
            marginLeft={2}
          >
            Interests are required
          </Typography>
        )}
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
          disabled={JSON.stringify(errors) === '{}' ? false : true}
        >
          Save Profile
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileForm;
