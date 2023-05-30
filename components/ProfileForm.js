/* eslint-disable no-undef */
import React from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';

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
  const router = useRouter();
  const { values, saveProfileHandler } = props;

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
      privateContacts: '',
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

  return (
    <Box>
      <Box style={props.innerContainerStyle || {}}>
        <Box marginBottom={4} textAlign="left">
          <Controller
            name={'avatar'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return <Avatar avatarValue={value} onChange={onChange}></Avatar>;
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
                  helperText={
                    errors.description ? 'Description is required' : ''
                  }
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
              color: 'rgb(30, 32, 34)',
              textAlign: 'left',
            }}
          >
            Skills <span style={{ color: 'red' }}>*</span>
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
              color: 'rgb(30, 32, 34)',
              textAlign: 'left',
            }}
          >
            Interests <span style={{ color: 'red' }}>*</span>
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
              color: 'rgb(30, 32, 34)',
              textAlign: 'left',
            }}
          >
            Public contacts {` `}
            <span
              style={{
                fontSize: 14,
                display: 'inline',
              }}
            >
              (
              <span style={{ color: 'red' }}>
                At least one contact is required.
              </span>
              )
            </span>
          </Typography>
          <Controller
            name={'contacts'}
            control={control}
            rules={{
              validate: (value) => {
                const isValid =
                  value?.email &&
                  value?.email?.length > 0 &&
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
              color: 'rgb(30, 32, 34)',
              textAlign: 'left',
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
                return value?.email?.length !== 0 && isValidEmail(value?.email);
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <TextField
                  required
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
              Please fill in the required fields above.
            </Alert>
          </Box>
        )}
        {!props.isOnboardingProcess && (
          <Box marginTop={2}>
            <SubmitButton />
          </Box>
        )}
      </Box>
      {props.isOnboardingProcess && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Box
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              router.push(props.backUrl);
            }}
            sx={{
              display: 'flex',
              visibility: 'visibility',
              width: '223px',
              cursor: 'pointer',
              color: '#666F85',
              borderRadius: '6px',
              outline: 'none',
              padding: '12px 20px',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '600',
              mb: { xs: '8px' },
              background: '#F4F6F8',
              mb: { xs: '10px', md: 0 },
              '&:hover': {
                backgroundColor: '#ebebeb',
              },
            }}
          >
            Back
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            visibility="visible"
            onClick={handleSubmit(onSubmit)}
            sx={{
              width: '223px',
              cursor: 'pointer',
              color: '#ffffff',
              borderRadius: '6px',
              outline: 'none',
              padding: '12px 20px',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: '600',
              pointerEvents:
                JSON.stringify(errors) !== '{}' || props.updating
                  ? 'none'
                  : 'normal',
              background:
                JSON.stringify(errors) !== '{}' || props.updating
                  ? 'linear-gradient(89.57deg, rgba(41,117,223,0.5) 0.27%, rgba(58,207,227,0.5) 105.82%)'
                  : 'linear-gradient(90deg, #305FE8 0%, #3AD9E3 100%)',
            }}
          >
            {props.updating ? 'Updating' : 'Next'}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProfileForm;
