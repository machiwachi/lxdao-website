import React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Grid } from '@mui/material';

import Select from './Select';

const skillNames = [
  'Design',
  'Project Management',
  'Product Management',
  'FrontEnd',
  'FullStack',
  'BackEnd',
  'Operation',
  'Solidity',
  'Blockchain',
  'Others',
];
const skillLevels = ['Junior', 'Intermediate', 'Senior'];

function SkillsField(props) {
  const value = props.value;

  function updateSkills(index, field, newValue) {
    value[index][field] = newValue;
    props.onChange && props.onChange(value);
  }

  return value.map((skill, index) => {
    return (
      <Box key={index} display="flex" marginBottom={2.5}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Select
              label="Name"
              dropdown={skillNames}
              value={skill.name}
              onChange={(value) => {
                updateSkills(index, 'name', value);
              }}
            ></Select>
          </Grid>
          <Grid item xs={4}>
            <Select
              label="Level"
              dropdown={skillLevels}
              value={skill.level}
              onChange={(value) => {
                updateSkills(index, 'level', value);
              }}
            ></Select>
          </Grid>
        </Grid>
      </Box>
    );
  });
}

export default SkillsField;
