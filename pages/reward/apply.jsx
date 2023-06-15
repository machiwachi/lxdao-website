import {
  Box,
  Container,
  Typography,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Link,
  Autocomplete,
  CircularProgress,
  TextField,
} from '@mui/material';

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import API from '@/common/API';

import LXButton from '@/components/Button';
import Layout from '@/components/Layout';
import showMessage from '@/components/showMessage';

function Label({ required, value }) {
  return (
    <Box
      textAlign={{ xs: 'left', sm: 'right' }}
      sx={{
        fontWeight: 'bold',
        color: '#101828',
        lineHeight: '56px',
        width: '85px',
      }}
    >
      {required && <span style={{ color: '#DC0202' }}>* </span>}
      {value}
    </Box>
  );
}

export default function Apply() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      type: '',
      name: '',
      address: '',
      amount: '',
      source: '',
      reason: '',
      check: false,
    },
  });
  const router = useRouter();

  const [type, setType] = useState('');
  const [member, setMember] = useState('');
  const [open, setOpen] = useState(false);
  const [disabletSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const BuilderList = async () => {
    let query = `/buidler?`;
    let params = [];
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
      setOptions(tempList);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to submit application! ',
        body: err.message,
      });
    }
  };

  const applicationHandler = async (raw) => {
    setDisableSubmitBtn(true);
    setSubmitLoading(true);
    try {
      const data = {
        name: raw.name,
        address: raw.address,
        buidlerId: raw.buidlerId,
        source: raw.source,
        value: parseInt(raw.amount),
        reason: raw.reason,
      };
      if (type === 'LXP') {
        const response = await API.post(
          `/lxpoints/${raw.address}/createLXPoints`,
          data
        );
        const result = response?.data;
        if (result.status !== 'SUCCESS') {
          setDisableSubmitBtn(false);
          setSubmitLoading(false);
          throw new Error(result.message);
        } else {
          router.push('/LXPAnnouncement');
        }
      } else {
        const response = await API.post(
          `/stablecoin/${raw.address}/apply`,
          data
        );
        const result = response?.data;
        if (result.status !== 'SUCCESS') {
          setDisableSubmitBtn(false);
          setSubmitLoading(false);
          throw new Error(result.message);
        } else {
          router.push('/reward/StablecoinAnnouncement');
        }
      }
    } catch (err) {
      setDisableSubmitBtn(false);
      setSubmitLoading(false);
      showMessage({
        type: 'error',
        title: 'Failed to submit application! ',
        body: err.message,
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (!loading) {
        return;
      }
      await BuilderList();
    })();
  }, [loading]);

  return (
    <Layout title={`Apply Reward | LXDAO`}>
      <Container
        sx={{
          mt: 12,
          maxWidth: 1216,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={6}
          alignItems={{ lg: 'center', xs: 'center' }}
          textAlign={{ lg: 'center', xs: 'center' }}
        >
          <Box textAlign="center" gap={6}>
            <Typography
              fontSize="70px"
              fontWeight={600}
              lineHeight="70px"
              color="#101828"
            >
              Apply Reward
            </Typography>
            {type === 'LXP' && (
              <Typography
                variant="subtitle1"
                fontWeight={400}
                lineHeight="30px"
                color="#667085"
                marginTop={4}
              >
                Ready to start applying LXP? Learn more about the{' '}
                <Link
                  href="https://www.notion.so/lxdao/LXP-Rules-80afdaa00f754fb6a222313d5e322917"
                  target="_blank"
                  color={'#667085'}
                >
                  LXP rule
                </Link>
                and how you can get started!
              </Typography>
            )}
            {type === 'LXP' && (
              <Typography
                variant="subtitle1"
                fontWeight={400}
                lineHeight="30px"
                color="#667085"
                marginTop={1}
              >
                Feel free to check the LXP Announcement and history list:{' '}
                <Link href="/LXPAnnouncement" target="_blank" color={'#667085'}>
                  Click me!
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
        <Box maxWidth={1000} marginTop="50px">
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            marginBottom={{ xs: '0', sm: '15px' }}
          >
            <Box marginRight="10px">
              <Label required={true} value={'Type: '} />
            </Box>
            <Box flex={1}>
              <Controller
                name={'type'}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <>
                      <Select
                        sx={{ width: '100%', height: 56 }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={value}
                        defaultValue={''}
                        onChange={(event) => {
                          onChange(event.target.value);
                          setType(event.target.value);
                        }}
                        onBlur={onBlur}
                      >
                        <MenuItem value={'LXP'}>LXP</MenuItem>
                        <MenuItem value={'Stablecoin'}>Stablecoin</MenuItem>
                      </Select>
                      <Typography
                        marginTop={1}
                        fontSize="0.85rem"
                        color="#d32f2f"
                        marginLeft={2}
                      >
                        {errors?.type ? 'Type is required' : ''}
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
          >
            <Box marginRight="10px">
              <Label required={true} value={'Member: '} />
            </Box>
            <Box flex={1}>
              <Controller
                name={'member'}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <>
                      <Select
                        sx={{ width: '100%', height: 56 }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={value}
                        defaultValue={''}
                        onChange={(event) => {
                          onChange(event.target.value);
                          setMember(event.target.value);
                          setValue('buidlerId', null);
                        }}
                        onBlur={onBlur}
                      >
                        <MenuItem value={'MEMBER'}>Member</MenuItem>
                        <MenuItem value={'NONMEMBER'}>Non-Member</MenuItem>
                      </Select>
                      <Typography
                        marginTop={1}
                        fontSize="0.85rem"
                        color="#d32f2f"
                        marginLeft={2}
                      >
                        {errors?.type ? 'Member is required' : ''}
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
          >
            <Box marginRight="10px">
              <Label required={true} value={'Name: '} />
            </Box>
            {member === 'MEMBER' ? (
              <Box flex={1}>
                <Controller
                  name={'name'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, onBlur } }) => {
                    return (
                      <>
                        <Autocomplete
                          open={open}
                          onOpen={() => {
                            setOpen(true);
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          isOptionEqualToValue={(option, kvalue) => {
                            return option.name === kvalue.name;
                          }}
                          getOptionLabel={(option) => {
                            return option.name;
                          }}
                          onChange={(e, value) => {
                            onChange(value?.name);
                            setValue('address', value?.address);
                            setValue('buidlerId', value?.id);
                          }}
                          onBlur={onBlur}
                          options={options}
                          loading={loading}
                          renderInput={(params) => {
                            return (
                              <TextField
                                {...params}
                                value={value}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <>
                                      {loading ? (
                                        <CircularProgress
                                          color="inherit"
                                          size={20}
                                        />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </>
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
                          {errors?.name ? 'Name is required' : ''}
                        </Typography>
                      </>
                    );
                  }}
                />
              </Box>
            ) : (
              <Box flex={1}>
                <Controller
                  name={'name'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, onBlur } }) => {
                    return (
                      <>
                        <OutlinedInput
                          sx={{ height: 56, width: '100%' }}
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        <Typography
                          marginTop={1}
                          fontSize="0.85rem"
                          color="#d32f2f"
                          marginLeft={2}
                        >
                          {errors?.name ? 'Name is required' : ''}
                        </Typography>
                      </>
                    );
                  }}
                />
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            marginBottom={{ xs: '0', sm: '15px' }}
          >
            <Box marginRight="10px">
              <Label required={true} value={'Address: '} />
            </Box>
            <Box flex={1}>
              <Controller
                name={'address'}
                control={control}
                rules={{
                  required: true,
                  validate: {
                    ckeckAddress: (v) => {
                      if (v.length < 42) {
                        return 'Too Short Address';
                      }
                      if (v.length > 42) {
                        return 'Too Long Address';
                      }
                      if (v.slice(0, 2) != '0x' && v.slice(0, 2) != '0X') {
                        return 'Wrong Format Address';
                      }
                    },
                  },
                }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <>
                      <OutlinedInput
                        disabled={type === 'LXDAOBUILDER'}
                        placeholder="2a3s341....3sad"
                        sx={{ height: 56, width: '100%' }}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                      <Typography
                        marginTop={1}
                        fontSize="0.85rem"
                        color="#d32f2f"
                        marginLeft={2}
                      >
                        {errors?.address?.message}
                      </Typography>
                    </>
                  );
                }}
              />
              {errors?.address &&
                !errors?.address?.message &&
                !errors?.address?.ref?.value && (
                  <Typography
                    marginTop={1}
                    fontSize="0.85rem"
                    color="#d32f2f"
                    marginLeft={2}
                  >
                    Address is required
                  </Typography>
                )}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            marginBottom={{ xs: '0', sm: '15px' }}
          >
            <Box marginRight="10px">
              <Label required={true} value={'Source: '} />
            </Box>
            <Box flex={1}>
              <Controller
                name={'source'}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <OutlinedInput
                      placeholder="e.g. xxx project, xxx event, core team salary"
                      sx={{ height: 56, width: '100%' }}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  );
                }}
              />
              {errors.source && (
                <Typography
                  marginTop={1}
                  fontSize="0.85rem"
                  color="#d32f2f"
                  marginLeft={2}
                >
                  Source is required
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            marginBottom={{ xs: '0', sm: '15px' }}
          >
            <Box marginRight="10px">
              <Label required={true} value={'Amount: '} />
            </Box>
            <Box flex={1}>
              <Controller
                name={'amount'}
                control={control}
                rules={{
                  required: true,
                  validate: {
                    ckeckAmount: (v) => {
                      if (!v) {
                        return 'Amount is required.';
                      }
                      if (!Number.isFinite(Number(v))) {
                        return 'Please enter a number';
                      }
                      if (v.length > 6) {
                        return 'Too much reward, please check with the team first';
                      }
                    },
                  },
                }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <>
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment position="end">
                            {type === 'LXP' ? 'LXP' : 'USDT/USDC'}
                          </InputAdornment>
                        }
                        sx={{ height: 56, width: '100%' }}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                      <Typography
                        marginTop={1}
                        fontSize="0.85rem"
                        color="#d32f2f"
                        marginLeft={2}
                      >
                        {errors?.amount?.message}
                      </Typography>
                    </>
                  );
                }}
              />
              {errors?.amount &&
                !errors?.amount?.message &&
                !errors?.amount?.ref?.value && (
                  <Typography
                    marginTop={1}
                    fontSize="0.85rem"
                    color="#d32f2f"
                    marginLeft={2}
                  >
                    Amount is required
                  </Typography>
                )}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            marginBottom={{ xs: '0', sm: '15px' }}
          >
            <Box marginRight="10px">
              <Label required={true} value={'Reason: '} />
            </Box>
            <Box flex={1}>
              <Controller
                name={'reason'}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <OutlinedInput
                      multiline
                      rows={3}
                      placeholder="Please provide specific reasons why you are applying for these LXPs"
                      sx={{ width: '100%' }}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  );
                }}
              />
              {errors.reason && (
                <Typography
                  marginTop={1}
                  fontSize="0.85rem"
                  color="#d32f2f"
                  marginLeft={2}
                >
                  Reason is required
                </Typography>
              )}
            </Box>
          </Box>
          <Box marginTop={3} marginLeft={{ xs: 0, sm: '95px' }}>
            <Controller
              name={'check'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <FormControlLabel
                    sx={{ color: '#666F85' }}
                    control={
                      <Checkbox
                        sx={{
                          color: '#36AFF9',
                          '&.Mui-checked': {
                            color: '#36AFF9',
                          },
                        }}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    }
                    label="I guarantee that I made my application based solely on my conscience."
                  />
                );
              }}
            />
            {errors.check && (
              <Typography
                marginTop={1}
                fontSize="0.85rem"
                color="#d32f2f"
                marginLeft={2}
              >
                Please make sure your application with a clear conscience.
              </Typography>
            )}
          </Box>
        </Box>
        <LXButton
          width="200px"
          variant="gradient"
          marginTop={'69px'}
          marginBottom="40px"
          onClick={handleSubmit((data) => {
            applicationHandler(data);
          })}
          disabled={JSON.stringify(errors) !== '{}' || disabletSubmitBtn}
        >
          {submitLoading ? 'Submitting' : 'Submit'}
        </LXButton>
      </Container>
    </Layout>
  );
}
