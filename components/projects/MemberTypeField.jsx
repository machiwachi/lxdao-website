import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Box, Grid, TextField } from '@mui/material';

import API from '@/common/API';

import LXButton from '../Button';
import Select from '../Select';
import showMessage from '../showMessage';

const memberType = [
  { label: 'Fixed Member', value: 'STABLE' },
  { label: 'Flexible Member', value: 'UNSTABLE' },
];

function MemberTypeField(props) {
  const [openMemberDropdownIndex, setOpenMemberDropdownIndex] = useState();
  const [memberOptions, setMemberOptions] = useState([]);
  const [value, setValue] = useState(props.value || []);
  const memberLoading =
    openMemberDropdownIndex !== null && memberOptions.length === 0;

  const BuilderList = async () => {
    let query = `/buidler?`;
    let params = [];
    params.push('status=ACTIVE&status=PENDING&status=READYTOMINT');
    params.push(`memberFirstBadge=1`);
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
      setMemberOptions(tempList);
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
      if (!memberLoading) {
        return;
      }
      await BuilderList();
    })();
  }, [memberLoading]);

  useEffect(() => {
    if (props.value && props.value.length > 0) {
      const newValue = [...props.value];
      props.value.forEach((member, index) => {
        newValue[index]['id'] = member?.id;
        newValue[index]['role'] = member?.role;
      });
      setValue(newValue);
    }
  }, [props.value]);

  function updateMember(index, field, newValue) {
    let newValues = [...value];
    if (field === 'id') {
      const type = newValues[index]['role'];
      newValues[index] = newValue;
      newValues[index]['role'] = type;
    } else if (field === 'role') {
      newValues[index][field] = newValue;
    }
    setValue(newValues);
    props.onChange && props.onChange(newValues);
  }

  function createMember() {
    let newMember = {};
    const newValues = [...value];
    newMember['id'] = '';
    newMember['role'] = '';
    newValues.push(newMember);
    setValue(newValues);
    props.onChange && props.onChange(newValues);
  }

  function deleteMember(index) {
    const newValues = [...value];
    newValues.splice(index, 1);
    setValue(newValues);
    props.onChange && props.onChange(newValues);
  }

  return (
    <Box>
      {value.map((member, index) => {
        return (
          <Box key={index} display="flex" marginBottom={2.5}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  disableClearable
                  open={index === openMemberDropdownIndex}
                  onOpen={() => {
                    setOpenMemberDropdownIndex(index);
                  }}
                  onClose={() => {
                    setOpenMemberDropdownIndex(null);
                  }}
                  isOptionEqualToValue={(option, kvalue) => {
                    return option.id === kvalue.id;
                  }}
                  getOptionLabel={(option) => {
                    return option.name;
                  }}
                  onChange={(e, value) => {
                    updateMember(index, 'id', value);
                  }}
                  options={memberOptions}
                  loading={memberLoading}
                  renderInput={(params) => {
                    let newInputProps = {
                      ...params.inputProps,
                    };
                    let newParams = {
                      ...params,
                    };
                    if (member?.name) {
                      newInputProps = {
                        ...params.inputProps,
                        value: member?.name,
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
                        placeholder="Choose a member"
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
              </Grid>
              <Grid item xs={5}>
                <Select
                  label="Role"
                  dropdown={memberType}
                  value={member.role || ''}
                  onChange={(value) => {
                    updateMember(index, 'role', value);
                  }}
                ></Select>
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
                    deleteMember(index);
                  }}
                >
                  <CloseIcon></CloseIcon>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <Box display="flex" marginBottom={2.5}>
        <LXButton
          onClick={() => {
            createMember();
          }}
        >
          Add a member
        </LXButton>
      </Box>
    </Box>
  );
}

export default MemberTypeField;
