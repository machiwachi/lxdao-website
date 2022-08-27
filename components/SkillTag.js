import React from 'react';
import { Box, Typography } from '@mui/material';

const levelColors = {
  Junior: '#4CDBE4',
  Intermediate: '#4CE4C9',
  Senior: '#7CD89B',
};

function SkillTag(props) {
  return (
    <Box
      paddingX={1}
      marginRight={0.5}
      marginBottom={0.5}
      sx={{
        background: levelColors[props.level],
        color: '#fff',
        borderRadius: 1,
      }}
    >
      <Typography>{props.text}</Typography>
    </Box>
  );
}

export default SkillTag;
