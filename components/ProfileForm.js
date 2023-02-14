/* eslint-disable no-undef */
import React from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { removeEmpty } from '@/utils/utility';

import SkillsField from './SkillsField';
import ContactsField from './ContactsField';
import MultiSelect from './MultiSelect';
import TextInput from './TextInput';
import Avatar from './Avatar';

const interestNames = [
  'UI/UX Design',
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
  const values = props.values;

  const saveProfileHandler = props.saveProfileHandler;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: '',
      name: '',
      description: '',
      skills: [],
      interests: [],
      control: {},
      ...values,
    },
  });

  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const onSubmit = (data) => {
    if (saveProfileHandler) {
      saveProfileHandler(data);
    }
  };

  function SubmitButton() {
    if (JSON.stringify(errors) !== '{}') {
      return (
        <Button variant="contained" size="large" disabled={true}>
          Update Profile
        </Button>
      );
    }

    // todo add more steps and tips, like uploading to IPFS etc.
    if (props.updating) {
      return (
        <Button variant="contained" size="large" disabled={true}>
          Updating Profile...
        </Button>
      );
    }

    return (
      <Button variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
        Update Profile
      </Button>
    );
  }

  //dissey to do change acatar
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
                required
                fullWidth
                label="Name"
                placeholder="Your nick name"
                onChange={onChange}
                value={value}
                error={!!errors.name}
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
                required
                multiline
                rows={2}
                placeholder="Self introduction"
                fullWidth
                label="Description"
                onChange={onChange}
                value={value}
                error={!!errors.description}
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
                onChange={(values) => {
                  let lastValue = values.pop();
                  if (lastValue === 'Others') {
                    lastValue = window.prompt('Please input your interest');
                  }
                  onChange([...values, lastValue]);
                }}
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
      <Box marginBottom={2.5}>
        <Typography
          marginBottom={2}
          sx={{
            fontSize: '20px',
          }}
        >
          Contacts{' '}
          <span
            style={{
              fontSize: 14,
              display: 'inline',
            }}
          >
            (the following contacts will be publicly available)
          </span>
        </Typography>
        <Controller
          name={'contacts'}
          control={control}
          rules={{
            validate: (value) => {
              const isValid =
                value?.email &&
                value?.email.length > 0 &&
                isValidEmail(value.email);

              const isEmpty = JSON.stringify(removeEmpty(value)) === '{}';

              if (isEmpty) {
                return false;
              } else {
                return isValid;
              }
            },
          }}
          render={({ field: { onChange, value } }) => {
            return <ContactsField value={value || {}} onChange={onChange} />;
          }}
        />
        {errors.contacts && (
          <Typography
            fontSize="0.75rem"
            color="#d32f2f"
            marginTop={1}
            marginLeft={2}
          >
            At least one contacts are required, Email must be valid.
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
          Private Contacts{' '}
          <span
            style={{
              fontSize: 14,
              display: 'inline',
            }}
          >
            (will be displayed only for LXDAO buidler)
          </span>
        </Typography>
        <Controller
          name={'privateContacts'}
          control={control}
          rules={{
            validate: (value) => {
              return value?.email.length !== 0 && isValidEmail(value?.email);
            },
          }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextField
                fullWidth
                label="Private Email"
                value={value?.email}
                placeholder="your@email.com"
                onChange={(event) => {
                  onChange({ email: event.target.value });
                }}
              />
            );
          }}
        />
        {errors.privateContacts && (
          <Typography
            fontSize="0.75rem"
            color="#d32f2f"
            marginTop={1}
            marginLeft={2}
          >
            private email are required, Please input a valid email
          </Typography>
        )}
      </Box>
      {JSON.stringify(errors) !== '{}' && (
        <Box marginTop={2}>
          <Alert severity="error">
            Found errors on the form, please check.
          </Alert>
        </Box>
      )}
      <Box marginTop={2}>
        <SubmitButton />
      </Box>
    </Box>
  );
}

export default ProfileForm;
