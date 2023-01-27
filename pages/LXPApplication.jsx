import {
  Box,
  Container,
  Typography,
  InputAdornment,
  Grid,
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
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import API from '@/common/API';

import LXButton from '@/components/Button';
import Layout from '@/components/Layout';
import showMessage from '@/components/showMessage';

function Label({ required, value }) {
  return (
    <div
      style={{
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#101828',
        lineHeight: '56px',
      }}
    >
      {required && <span style={{ color: '#DC0202' }}>* </span>}
      {value}
    </div>
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
      type: 0,
      name: '',
      address: '',
      amount: '',
      source: '',
      reason: '',
      check: false,
    },
  });
  const router = useRouter();

  const [type, setType] = useState(0);
  const [open, setOpen] = useState(false);
  const [disabltSubmitBtn, setDisabltSubmitBtn] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const BuilderList = async (
    search = '',
    currentPage = 0,
    isAddMore = false
  ) => {
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
    setDisabltSubmitBtn(true);
    try {
      const data = {
        type: raw.type,
        name: raw.name,
        address: raw.address,
        buidlerId: raw.buidlerId,
        source: raw.source,
        value: parseInt(raw.amount),
        reason: raw.reason,
      };
      const response = await API.post(
        `/lxpoints/${raw.address}/createLXPoints`,
        data
      );
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      } else {
        router.push('/LXPPublicity');
      }
    } catch (err) {
      setDisabltSubmitBtn(false);
      showMessage({
        type: 'error',
        title: 'Failed to submit application! ',
        body: err.message,
      });
    }
  };

  useEffect(() => {
    let active = false;

    if (!loading) {
      return undefined;
    }

    (async () => {
      BuilderList();
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <Layout title={`Apply LX Points | LXDAO`}>
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
              Apply LX Points
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              lineHeight="30px"
              color="#667085"
              marginTop={4}
            >
              Please read the
              {/* todo: update the link */}
              <Link color={'#667085'}>LX Points rule</Link> before applying .
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} mt={12} maxWidth={1000}>
          <Grid item xs={2} alignItems="center">
            <Label required={true} value={'Type: '} />
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'type'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <Select
                    sx={{ width: '100%', height: 56 }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={value}
                    defaultValue={0}
                    onChange={(event) => {
                      onChange(event.target.value);
                      setType(event.target.value);
                      setValue('buidlerId', null);
                    }}
                    onBlur={onBlur}
                  >
                    <MenuItem value={'LXDAOBUILDER'}>LXDAO Builder</MenuItem>
                    <MenuItem value={'LXDAOMEMBER'}>LXDAO Member</MenuItem>
                  </Select>
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label required={true} value={'Name: '} />
          </Grid>
          {type === 'LXDAOBUILDER' ? (
            <Grid item xs={9}>
              <Controller
                name={'name'}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
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
                  );
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={9}>
              <Controller
                name={'name'}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => {
                  return (
                    <OutlinedInput
                      sx={{ height: 56, width: '100%' }}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  );
                }}
              />
            </Grid>
          )}

          <Grid item xs={2} alignItems="center">
            <Label required={true} value={'Address: '} />
          </Grid>
          <Grid item xs={9}>
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
                    <Typography color={'#DC0202'} fontSize={'12px'}>
                      {errors?.address?.message}
                    </Typography>
                  </>
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label required={true} value={'Source: '} />
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'source'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <OutlinedInput
                    placeholder="Please summarize in one word!"
                    sx={{ height: 56, width: '100%' }}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label required={true} value={'Amount: '} />
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'amount'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">LXP</InputAdornment>
                    }
                    sx={{ height: 56, width: '100%' }}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label required={true} value={'Reason: '} />
          </Grid>
          <Grid item xs={9}>
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
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={9}>
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
                    label="I am sure I have a conscience"
                  />
                );
              }}
            />
          </Grid>
        </Grid>
        <LXButton
          width="200px"
          variant="gradient"
          marginTop={'69px'}
          onClick={handleSubmit((data) => {
            applicationHandler(data);
          })}
          disabled={JSON.stringify(errors) != '{}' || disabltSubmitBtn}
        >
          Submit
        </LXButton>
      </Container>
    </Layout>
  );
}
