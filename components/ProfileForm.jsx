/* eslint-disable no-undef */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Alert, Box, Button, TextField, Typography } from '@mui/material';

import showMessage from '@/components/showMessage';

import { removeEmpty } from '@/utils/utility';

import LXButton from './Button';
import ContactsField from './ContactsField';
import MultiSelect from './MultiSelect';
import SkillsField from './SkillsField';
import TextInput from './TextInput';
import UploadImg from './UploadImg';

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
    if (!data.avatar) {
      showMessage({
        type: 'info',
        title: 'Please upload avatar',
      });
      return;
    }
    if (saveProfileHandler) {
      saveProfileHandler(data);
    }
  };

  function SubmitButton() {
    if (JSON.stringify(errors) !== '{}') {
      return (
        <LXButton variant="gradient" width="200px" disabled={true}>
          Update Profile
        </LXButton>
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
      <LXButton
        variant="gradient"
        width="200px"
        onClick={handleSubmit(onSubmit)}
      >
        Update Profile
      </LXButton>
    );
  }

  return (
    <Box>
      <Box style={props.innerContainerStyle || {}}>
        <Box marginBottom={4} textAlign="left">
          <Controller
            name={'avatar'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return <UploadImg avatarValue={value} onChange={onChange} />;
              // return <Avatar avatarValue={value} onChange={onChange}></Avatar>;
            }}
          />
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
                  label="Bio"
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
                      if (!lastValue) return;
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
                At least Telegram or WeChat is required.
              </span>
              )
            </span>
          </Typography>
          <Controller
            name={'contacts'}
            control={control}
            rules={{
              validate: (value) => {
                const hasTelegram =
                  value?.telegram && value.telegram.trim().length > 0;
                const hasWeChat =
                  value?.wechat && value.wechat.trim().length > 0;

                return (
                  hasTelegram ||
                  hasWeChat ||
                  'At least Telegram or WeChat is required.'
                );
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <ContactsField value={value || {}} onChange={onChange} />
                {error && (
                  <Typography
                    fontSize="0.75rem"
                    color="#d32f2f"
                    marginTop={1}
                    marginLeft={2}
                  >
                    {error.message}
                  </Typography>
                )}
              </>
            )}
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
              A private email is required. Please input a valid email address.
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
            {props.updating ? 'Updating...' : 'Next'}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProfileForm;
