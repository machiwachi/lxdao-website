/* eslint-disable no-undef */
import React from 'react';
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  FormControl,
  Checkbox,
} from '@mui/material';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultiSelect(props) {
  const theme = useTheme();
  return (
    <FormControl fullWidth>
      <InputLabel id="interest-label">Interests</InputLabel>
      <Select
        labelId="interest-label"
        label="Interests"
        multiple
        value={props.value}
        onChange={(event) => {
          props.onChange && props.onChange(event.target.value);
        }}
        input={<OutlinedInput label="Interests" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Box
                paddingX={1}
                marginRight={0.5}
                sx={{
                  border: '1px solid #ccc',
                }}
                key={value}
              >
                {value}
              </Box>
            ))}
          </Box>
        )}
        fullWidth
      >
        {props.dropdown.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, ['DAO'], theme)}
          >
            <Checkbox checked={props.value.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultiSelect;
