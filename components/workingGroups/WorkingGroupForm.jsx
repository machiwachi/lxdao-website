/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Alert,
  Autocomplete,
  Box,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import UploadImg from '@/components/UploadImg';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';
import MemberTypeField from '@/components/workingGroups/MemberTypeField';

import { useAccount } from 'wagmi';

import API from '@/common/API';
import { BuilderRole } from '@/models/builder';

function WorkingGroupForm(props) {
  const { values, saveWorkingGroupHandler, isUpdate } = props;

  const [openLeaderDropdown, setOpenLeaderDropdown] = useState(false);
  const [leaderOptions, setLeaderOptions] = useState([]);
  const leaderLoading = openLeaderDropdown && leaderOptions.length === 0;

  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      leaderId: values?.membersInWorkingGroup?.find((member) =>
        member.role.includes('Working Group Leader')
      )?.member,
      members: values?.membersInWorkingGroup
        ?.filter((member) => !member.role.includes('Working Group Leader'))
        ?.map((item) => {
          return {
            id: item?.member.id,
            name: item?.member.name,
            address: item?.member.address,
            type: item.type,
          };
        }),
      weeklyMeetingLink: '',
      weeklyMeetingTime: '',
      weeklyUpdateLink: '',
      bountyTaskLink: '',
      roadmapLink: '',
      bannerURI: '',
      badgeName: '',
      show: true,
      ...values,
    },
  });

  const onSubmit = (data) => {
    if (saveWorkingGroupHandler) {
      saveWorkingGroupHandler(data);
    }
  };

  function SubmitButton() {
    if (JSON.stringify(errors) !== '{}') {
      return (
        <Button variant="gradient" size="large" width={200} disabled={true}>
          {isUpdate ? 'Save' : 'Create'}
        </Button>
      );
    }

    // todo add more steps and tips, like uploading to IPFS etc.
    if (props.updating) {
      return (
        <Button variant="gradient" size="large" width={200} disabled={true}>
          {isUpdate ? 'Save...' : 'Create...'}
        </Button>
      );
    }

    return (
      <Button
        variant="gradient"
        size="large"
        width={200}
        onClick={handleSubmit(onSubmit)}
      >
        {isUpdate ? 'Save' : 'Create'}
      </Button>
    );
  }

  const BuilderList = async (status, type) => {
    let query = `/buidler?`;
    let params = [];
    params.push(`status=${status}`);
    params.push('per_page=1000');
    query += params.join('&');

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
        let { id, name, address } = record;
        tempList.push({ id, name, address });
      });
      if (type === 'leader') {
        setLeaderOptions(tempList);
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to fetch the member list! ',
        body: err.message,
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (!leaderLoading) {
        return;
      }
      await BuilderList('ACTIVE', 'leader');
    })();
  }, [leaderLoading]);

  function Label({ required, value }) {
    return (
      <Box
        textAlign={{ xs: 'left', sm: 'right' }}
        sx={{
          fontWeight: 'bold',
          color: '#101828',
          lineHeight: '56px',
          width: '190px',
        }}
      >
        {required && <span style={{ color: '#DC0202' }}>* </span>}
        {value}
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label required={true} value={'Name: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'name'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  required
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!errors.name}
                  helperText={errors.name ? 'Name is required' : ''}
                />
              );
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label required={true} value={'Description: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'description'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  required
                  multiline
                  rows={4}
                  placeholder="Working Group introduction"
                  fullWidth
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
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label required={true} value={'Short Description: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'shortDescription'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  required
                  multiline
                  placeholder="Introduction of the working group in one sentence."
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!errors.description}
                  helperText={
                    errors.description ? 'Short Description is required' : ''
                  }
                />
              );
            }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label required={true} value={'Leader: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'leaderId'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, onBlur } }) => {
              const isAdmin =
                currentViewer && currentViewer?.role?.includes(BuilderRole.Mod);

              return (
                <>
                  <Autocomplete
                    open={isAdmin ? openLeaderDropdown : false}
                    onOpen={() => {
                      setOpenLeaderDropdown(true);
                    }}
                    onClose={() => {
                      setOpenLeaderDropdown(false);
                    }}
                    isOptionEqualToValue={(option, kvalue) => {
                      return option.id === kvalue.id;
                    }}
                    getOptionLabel={(option) => {
                      return option.name;
                    }}
                    onChange={(e, value) => {
                      onChange(value?.id);
                    }}
                    disabled={
                      !currentViewer &&
                      currentViewer?.role?.includes(BuilderRole.Mod)
                    }
                    onBlur={onBlur}
                    options={leaderOptions}
                    loading={leaderLoading}
                    renderInput={(params) => {
                      let newInputProps = {
                        ...params.inputProps,
                      };
                      let newParams = {
                        ...params,
                      };
                      if (value?.name) {
                        newInputProps = {
                          ...params.inputProps,
                          value: value?.name,
                        };
                        newParams = {
                          ...params,
                          inputProps: newInputProps,
                        };
                      }

                      return (
                        <TextField
                          {...newParams}
                          value={value?.id || value}
                          placeholder="Choose a member as leader"
                          InputProps={{
                            ...newParams.InputProps,
                            endAdornment: (
                              <>{newParams.InputProps.endAdornment}</>
                            ),
                          }}
                        />
                      );
                    }}
                  />
                  <Typography
                    marginTop={1}
                    fontSize="0.85rem"
                    color="#d32f2f"
                    marginLeft={2}
                  >
                    {errors?.leaderId ? 'Leader is required' : ''}
                  </Typography>
                </>
              );
            }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label value={'Member: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'members'}
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => {
              const valueArray = [];

              if (value && value.length) {
                value.forEach((item) => {
                  const newMember = item?.member
                    ? { ...item?.member, type: item?.type }
                    : { ...item };
                  valueArray.push(newMember);
                });
              }
              return <MemberTypeField value={valueArray} onChange={onChange} />;
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label value={'Weekly meeting link: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'weeklyMeetingLink'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  required
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!errors.weeklyMeetingLink}
                  helperText={
                    errors.weeklyMeetingLink
                      ? 'Weekly meeting link is required'
                      : ''
                  }
                />
              );
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label value={'Weekly meeting time: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'weeklyMeetingTime'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return <TextInput fullWidth onChange={onChange} value={value} />;
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label value={'Weekly update link: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'weeklyUpdateLink'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return <TextInput fullWidth onChange={onChange} value={value} />;
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label value={'Bounty task link: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'bountyTaskLink'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return <TextInput fullWidth onChange={onChange} value={value} />;
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label value={'Roadmap link: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'roadmapLink'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return <TextInput fullWidth onChange={onChange} value={value} />;
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label value={'Show the group: '} />
        </Box>
        <Box flex={1} display="flex" alignItems="center">
          <Controller
            name={'show'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return <Switch checked={value} onChange={onChange} />;
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label required={true} value={'Banner uploader: '} />
        </Box>
        <Box flex={1} display="flex" gap={1}>
          <Controller
            name={'bannerURI'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <UploadImg
                  avatarValue={value}
                  onChange={onChange}
                  width={214}
                  height={88}
                  borderRadius="6px"
                ></UploadImg>
              );
            }}
          />
          <Typography variant="body2" color="#666F85">
            Recommended size 778x320px
          </Typography>
        </Box>
      </Box>
      {JSON.stringify(errors) !== '{}' && (
        <Box marginTop={2}>
          <Alert severity="error">
            Please fill in the required fields above.
          </Alert>
        </Box>
      )}
      {!props.isOnboardingProcess && (
        <Box marginTop={2} marginBottom={6}>
          <SubmitButton />
        </Box>
      )}
    </Box>
  );
}

export default WorkingGroupForm;
