import React from 'react';
import { Box } from '@mui/material';

function Tag(props) {
  return (
    <Box
      style={{
        border: '1px solid #D0D5DD',
        borderRadius: '2px',
        padding: '2px 6px',
        marginLeft: '4px',
        marginBottom: '4px',
      }}
    >
      {props.text}
    </Box>
  );
}

export default Tag;
