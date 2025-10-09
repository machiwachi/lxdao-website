import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Autocomplete,
  Box,
  Chip,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import UploadImg from '@/components/UploadImg';
import MemberTypeField from '@/components/projects/MemberTypeField';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';

import { useAccount } from 'wagmi';

import API from '@/common/API';
import { BuilderRole } from '@/models/builder';

import LXButton from '../Button';
import Select from '../Select';

import { format } from 'date-fns';

function ProjectForm(props) {
  const { values, saveProjectHandler, isUpdate } = props;

  const [openManagerDropdown, setOpenManagerDropdown] = useState(false);
  const [managerOptions, setManagerOptions] = useState([]);
  const managerLoading = openManagerDropdown && managerOptions.length === 0;

  const { address } = useAccount();
  const [, currentViewer, ,] = useBuidler(address);

  const nowDate = format(new Date(), 'yyyy-MM-dd');

  const linkListAll = [
    'email',
    'fairsharing',
    'forum',
    'github',
    'notion',
    'telegram',
    'twitter',
    'website',
    'wechat',
  ];

  if (Object.keys(values).length != 0) {
    let launchDate = format(
      Date.parse(values.launchDate || nowDate),
      'yyyy-MM-dd'
    );
    values.launchDate = launchDate;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      launchDate: nowDate,
      status: 'WIP',
      tags: [],
      managerId: values?.buidlersOnProject?.find((member) =>
        member.projectRole.includes('Project Manager')
      )?.buidler,
      members:
        values?.buidlersOnProject
          ?.filter((member) => !member.projectRole.includes('Project Manager'))
          ?.map((item) => {
            return {
              id: item?.buidler.id,
              name: item?.buidler.name,
              role: item.projectRole[0],
            };
          }) || [],
      banner: '',
      logo: '',
      isAbleToJoin: true,
      index_name: '',
      links: {},
      ...values,
    },
  });

  const onSubmit = (data) => {
    if (data.members) {
      const members = data.members.map((member) => {
        return {
          id: member.id,
          role: [member.role],
        };
      });
      members.push({
        id: data.managerId.id || data.managerId,
        role: ['Project Manager'],
      });
      data.members = members;
    } else {
      data.members = [
        {
          id: data.managerId.id || data.managerId,
          role: ['Project Manager'],
        },
      ];
    }

    if (data.links) {
      const links = data.links;
      Object.keys(links).forEach((key) => {
        if (links[key] === '') {
          delete links[key];
        }
      });

      data.links = links;
    }

    if (saveProjectHandler) {
      saveProjectHandler(data);
    }
  };

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
        return;
      }
      const records = result.data;

      let tempList = [];
      records.forEach((record) => {
        let { id, name, address } = record;
        tempList.push({ id, name, address });
      });
      if (type === 'manager') {
        setManagerOptions(tempList);
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
      if (!managerLoading) {
        return;
      }
      await BuilderList('ACTIVE', 'manager');
    })();
  }, [managerLoading]);

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
          <Label required={true} value={'Project Name: '} />
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
                  helperText={errors.name ? 'Project Name is required' : ''}
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
          <Label required={true} value={'Index Name: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'index_name'}
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
                  helperText={errors.name ? 'Index Name is required' : ''}
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
                  placeholder="Project description"
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
          <Label required={true} value={'Launch Date: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'launchDate'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  required
                  type="date"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={!!errors.launchDate}
                  helperText={
                    errors.launchDate ? 'Launch Date is required' : ''
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
          <Label required={true} value={'Project Status: '} />
        </Box>
        <Box flex={1} display="flex" alignItems="center">
          <Controller
            name={'status'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>WIP</Typography>
                  <Switch
                    checked={value === 'LAUNCHED'}
                    onChange={(e) =>
                      onChange(e.target.checked ? 'LAUNCHED' : 'WIP')
                    }
                  />
                  <Typography>Launched</Typography>
                </Stack>
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
          <Label required={true} value={'Tags: '} />
        </Box>
        <Box flex={1} display="flex" alignItems="center">
          <Controller
            name={'tags'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Stack gap={2}>
                  <TextField
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        value.push(event.target.value);
                        onChange(value);
                        event.target.value = '';
                      }
                    }}
                  ></TextField>

                  <Stack direction={'row'} gap={1}>
                    {value.map((tag, index) => {
                      const handleDelete = () => {
                        onChange(value.filter((item, i) => i !== index));
                      };
                      return (
                        <Chip
                          key={index}
                          size="small"
                          label={tag}
                          variant="outlined"
                          sx={{
                            borderRadius: '2px',
                            fontSize: '14px',
                            border: 'none',
                            color: '#36AFF9',
                            background: 'rgba(54, 175, 249, 0.1)',
                          }}
                          onDelete={handleDelete}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
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
          <Label required={true} value={'Project Manager: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'managerId'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value, onBlur } }) => {
              const isAdmin =
                currentViewer && currentViewer?.role?.includes(BuilderRole.Mod);

              return (
                <>
                  <Autocomplete
                    open={isAdmin ? openManagerDropdown : false}
                    onOpen={() => {
                      setOpenManagerDropdown(true);
                    }}
                    onClose={() => {
                      setOpenManagerDropdown(false);
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
                    options={managerOptions}
                    loading={managerLoading}
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
                          placeholder="Choose a member as manager"
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
                    {errors?.managerId ? 'Project Manager is required' : ''}
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
          <Label value={'Team Members: '} />
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
                    ? { ...item?.member, role: item?.type }
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
          <Label value={'Links: '} />
        </Box>
        <Box flex={1}>
          <Controller
            name={'links'}
            control={control}
            render={({ field: { onChange, value } }) => {
              const handleSelectChange = (selectedName, index) => {
                const keys = Object.keys(value);
                const updatedValue = { ...value };
                const oldName = keys[index];
                const url = updatedValue[oldName];
                delete updatedValue[oldName];
                updatedValue[selectedName] = url;

                onChange(updatedValue);
              };

              const handleTextFieldChange = (newUrl, name) => {
                onChange({
                  ...value,
                  [name]: newUrl,
                });
              };

              const handleAddLink = () => {
                const newName = `newLink${Object.keys(value || {}).length + 1}`;
                onChange({
                  ...value,
                  [newName]: '',
                });
              };

              const handleDeleteLink = (item) => {
                const updatedValue = { ...value };

                delete updatedValue[item];

                onChange(updatedValue);
              };

              return (
                <>
                  {Object.keys(value || {}).map((name, index) => (
                    <Grid container spacing={2} key={index}>
                      <Grid item xs={4}>
                        <Select
                          value={name}
                          dropdown={linkListAll}
                          selected={Object.keys(value)}
                          onChange={(selectedName) =>
                            handleSelectChange(selectedName, index)
                          }
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          value={value[name]}
                          onChange={(e) =>
                            handleTextFieldChange(e.target.value, name)
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Box
                          height="56px"
                          display="flex"
                          alignItems="center"
                          sx={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            handleDeleteLink(name);
                          }}
                        >
                          <CloseIcon></CloseIcon>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}

                  <Box display="flex" marginTop={2.5}>
                    <LXButton onClick={handleAddLink}>Add a link</LXButton>
                  </Box>
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
          <Label required={false} value={'Banner uploader: '} />
        </Box>
        <Box flex={1} display="flex" gap={1}>
          <Controller
            name={'banner'}
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

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={{ xs: '0', sm: '15px' }}
        width="80%"
      >
        <Box marginRight="10px">
          <Label required={false} value={'Logo uploader: '} />
        </Box>
        <Box flex={1} display="flex" gap={1}>
          <Controller
            name={'logo'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <UploadImg
                  avatarValue={value}
                  onChange={onChange}
                  uploaderWidth={88}
                  uploaderHeight={88}
                  borderRadius="6px"
                ></UploadImg>
              );
            }}
          />
          <Typography variant="body2" color="#666F85">
            Recommended size 320x320px
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
          <Button
            variant="gradient"
            size="large"
            width={200}
            onClick={handleSubmit(onSubmit)}
          >
            {isUpdate ? 'Save' : 'Create'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ProjectForm;
