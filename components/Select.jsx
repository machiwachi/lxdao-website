/* eslint-disable no-undef */
import React from 'react';

import { FormControl, InputLabel, MenuItem } from '@mui/material';
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
        {props.dropdown.map((item, index) => {
          const isObject = typeof item === 'object';
          const value = isObject ? item?.value : item;
          const isSelected = Array.isArray(props.selected)
            ? props.selected.includes(value)
            : props.selected === value;

          return (
            <MenuItem value={value} key={index} disabled={isSelected}>
              {isObject ? item?.label : item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SingleSelect;
