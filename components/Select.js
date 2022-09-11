/* eslint-disable no-undef */
import React from 'react';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Select from '@mui/material/Select';

function SingleSelect(props) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${props.label}-label`}>{props.label}</InputLabel>
      <Select
        labelId="name-label"
        label={props.label}
        value={props.value}
        onChange={(event) => {
          props.onChange && props.onChange(event.target.value);
        }}
      >
        {props.dropdown.map((name, index) => {
          return (
            <MenuItem value={name} key={index}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SingleSelect;
