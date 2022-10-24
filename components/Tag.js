import React from 'react';
import { Box } from '@mui/material';

function Tag(props) {
  return (
    <Box
      sx={{
        borderRadius: '2px',
        padding: '2px 6px',
        marginRight: '8px',
        marginBottom: '4px',
        wordBreak: 'break-all',
        background: 'rgba(102,111,133,0.1)',
        color: '#666F85',
      }}
    >
      {props.text}
    </Box>
  );
}

export default Tag;
