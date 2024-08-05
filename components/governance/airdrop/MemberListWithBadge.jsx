import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Box, TextField } from '@mui/material';

import Button from '@/components/Button';
import showMessage from '@/components/showMessage';

import API from '@/common/API';

export default function MemberListWithBadge(props) {
  const [openMemberDropdownIndex, setOpenMemberDropdownIndex] = useState();
  const [value, setValue] = useState([
    {
      name: '',
      address: '',
    },
  ]);
  const [MemberList, setMemberList] = useState([]);

  const getMemberList = async (badge) => {
    console.log(badge);
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
        let { name, address, badges } = record;

        if (badges[badge] === 0) {
          tempList.push({ name, address });
        }
      });
      setMemberList(tempList);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to fetch the member list! ',
        body: err.message,
      });
    }
  };

  const createMember = () => {
    const newValue = [...value];

    if (newValue[value.length - 1].name === '') return;
    newValue.push({
      name: '',
      address: '',
    });
    setValue(newValue);
    props.onChange && props.onChange(newValue);
  };

  const deleteMember = (index) => {
    if (value.length === 1) return;
    const newValue = value.filter((_, i) => {
      return i !== index;
    });

    setValue(newValue);
    props.onChange && props.onChange(newValue);
  };

  const updateMember = (index, item) => {
    let newValue = [...value];
    newValue[index]['name'] = item?.name || '';
    newValue[index]['address'] = item?.address || '';

    setValue(newValue);
    props.onChange && props.onChange(newValue);
  };

  useEffect(() => {
    (async () => {
      await getMemberList(props.badge);
    })();
  }, [props.badge]);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {value.map((member, index) => {
        return (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
            }}
            marginBottom="12px"
          >
            <Box flex={1}>
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
                onChange={(e, item) => {
                  updateMember(index, item);
                }}
                options={MemberList}
                renderOption={(props, option) => (
                  <li {...props} key={option.address}>
                    {option.name}
                  </li>
                )}
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
                      value={value?.name}
                      placeholder="Add a member to mint"
                      InputProps={{
                        ...newParams.InputProps,
                        endAdornment: <>{newParams.InputProps.endAdornment}</>,
                      }}
                    />
                  );
                }}
              />
            </Box>

            <Box
              height="56px"
              width="56px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => {
                deleteMember(index);
              }}
            >
              <CloseIcon />
            </Box>
          </Box>
        );
      })}
      <Button onClick={createMember}>{'Add a new member'}</Button>
    </Box>
  );
}
