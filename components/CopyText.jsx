import React, { useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { Tooltip, Box } from '@mui/material';

function CopyText({ copyText, copyTextOriginal, textStyle, iconSize }) {
  const [copyTip, setCopyTip] = useState('Copy to Clipboard');
  const [_, copy] = useCopyToClipboard();

  return (
    <Tooltip title={copyTip} placement="top">
      <Box
        display="flex"
        sx={{
          cursor: 'pointer',
          ...textStyle,
        }}
        onClick={() => {
          setCopyTip('Copied');
          setTimeout(() => {
            setCopyTip('Copy to Clipboard');
          }, 1000);

          copy(copyTextOriginal);
        }}
      >
        {copyText}
        <Box
          marginLeft={1}
          width={iconSize || '20px'}
          component={'img'}
          src={`/icons/copy.svg`}
          sx={{
            display: 'block',
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default CopyText;
