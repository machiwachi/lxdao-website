import {
  Box,
  Container,
  Typography,
  Input,
  InputAdornment,
  Button,
  Grid,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LXButton from '@/components/Button';

import Layout from '@/components/Layout';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../components/TextInput';

const Label = styled('div')(({ theme }) => ({
  textAlign: 'right',
  fontWeight: 'bold',
  color: '#101828',
  lineHeight: '56px',
}));

export default function Apply() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: '',
      name: '',
      address: '',
      amount: '',
      reason: '',
      check: false,
      control: {},
    },
  });
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
              Please read the{' '}
              <span style={{ 'text-decoration': 'underline' }}>
                LX Points rule
              </span>{' '}
              before applying .
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2} mt={12} maxWidth={1000}>
          <Grid item xs={2} alignItems="center">
            <Label>
              <span style={{ color: '#DC0202' }}>*</span>Type:
            </Label>
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'type'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    sx={{ width: '100%', height: 56 }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={value}
                    onChange={onChange}
                  >
                    <MenuItem value={'LXDAO Member'}>LXDAO Member</MenuItem>
                    <MenuItem value={'LXDAO Builder'}>LXDAO Builder</MenuItem>
                  </Select>
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label>
              <span style={{ color: '#DC0202' }}>*</span>Name:
            </Label>
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'name'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    sx={{ width: '100%', height: 56 }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={value}
                    onChange={onChange}
                  >
                    <MenuItem value={'LXDAO Member'}>LXDAO Member</MenuItem>
                    <MenuItem value={'LXDAO Builder'}>LXDAO Builder</MenuItem>
                  </Select>
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label>
              <span style={{ color: '#DC0202' }}>*</span>Address:
            </Label>
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'address'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <OutlinedInput
                    placeholder="2a3s341....3sad"
                    sx={{ height: 56, width: '100%' }}
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label>
              <span style={{ color: '#DC0202' }}>*</span>Amount:
            </Label>
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'amount'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <OutlinedInput
                    endAdornment={
                      <InputAdornment position="end">LXP</InputAdornment>
                    }
                    sx={{ height: 56, width: '100%' }}
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2} alignItems="center">
            <Label>
              <span style={{ color: '#DC0202' }}>*</span>Reason:
            </Label>
          </Grid>
          <Grid item xs={9}>
            <Controller
              name={'reason'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <OutlinedInput
                    multiline
                    rows={3}
                    placeholder="LXP"
                    sx={{ width: '100%' }}
                    value={value}
                    onChange={onChange}
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
              render={({ field: { onChange, value } }) => {
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
            console.log(data);
          })}
        >
          Submit
        </LXButton>
      </Container>
    </Layout>
  );
}
