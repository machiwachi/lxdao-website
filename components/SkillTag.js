import React from 'react';
import { Box, Typography } from '@mui/material';

const levelColors = {
  Junior: 'rgba(54,175,249,0.4)',
  Intermediate: 'rgba(54,175,249,0.7)',
  Senior: '#009FFF',
};

function SkillTag(props) {
  return (
    <Box
      paddingX={1}
      marginRight={1}
      marginTop={1}
      sx={{
        background: levelColors[props.level],
        color: '#fff',
        borderRadius: 1,
        wordBreak: 'break-all',
      }}
    >
      <Typography fontSize="14px">{props.text}</Typography>
    </Box>
  );
}

export default SkillTag;
