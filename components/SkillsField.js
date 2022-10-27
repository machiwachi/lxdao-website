import React from 'react';
import { Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Select from './Select';

const skillLevels = ['Junior', 'Intermediate', 'Senior'];
let skillNames = [
  'UI/UX Design',
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

function filterSkills(skills, value) {
  const selectedSkills = value.map((item) => item.name);
  return skills.filter((skill) => selectedSkills.includes(skill) === false);
}

function SkillsField(props) {
  const value = props.value;

  function updateSkill(index, field, newValue) {
    value[index][field] = newValue;
    props.onChange && props.onChange(value);
  }

  function createSkill(field, newValue) {
    let newSkill = {};
    newSkill[field] = newValue;
    newSkill['level'] = 'Junior';
    value.push(newSkill);
    props.onChange && props.onChange(value);
  }

  function deleteSkill(index) {
    value.splice(index, 1);
    props.onChange && props.onChange(value);
  }

  const filteredSkillNames = filterSkills(skillNames, value);
  skillNames = [...skillNames, ...value.map((item) => item.name)];
  skillNames = [...new Set(skillNames)];

  return (
    <Box>
      {value.map((skill, index) => {
        return (
          <Box key={index} display="flex" marginBottom={2.5}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <Select
                  label="Name"
                  dropdown={skillNames}
                  value={skill.name || ''}
                  onChange={(value) => {
                    updateSkill(index, 'name', value);
                  }}
                ></Select>
              </Grid>
              <Grid item xs={4}>
                <Select
                  label="Level"
                  dropdown={skillLevels}
                  value={skill.level || ''}
                  onChange={(value) => {
                    updateSkill(index, 'level', value);
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
                    deleteSkill(index);
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              label="Add a new skill"
              dropdown={filteredSkillNames}
              value={''}
              onChange={(value) => {
                let newValue = value;
                if (value === 'Others') {
                  newValue = prompt('Please enter the skill name');
                  skillNames.push(newValue);
                }
                createSkill('name', newValue);
              }}
            ></Select>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SkillsField;
