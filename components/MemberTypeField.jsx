import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import API from '@/common/API';

import showMessage from './showMessage';
import Select from './Select';
import LXButton from './Button';

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
        newValue[index]['type'] = member?.type;
      });
      setValue(newValue);
    }
  }, [props.value]);

  function updateMember(index, field, newValue) {
    let newValues = [...value];
    if (field === 'id') {
      const type = newValues[index]['type'];
      newValues[index] = newValue;
      newValues[index]['type'] = type;
    } else if (field === 'type') {
      newValues[index][field] = newValue;
    }
    setValue(newValues);
    props.onChange && props.onChange(newValues);
  }

  function createMember() {
    let newMember = {};
    const newValues = [...value];
    newMember['id'] = '';
    newMember['type'] = '';
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
                            <>
                              {memberLoading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {newParams.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <Select
                  label="Type"
                  dropdown={memberType}
                  value={member.type || ''}
                  onChange={(value) => {
                    updateMember(index, 'type', value);
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
