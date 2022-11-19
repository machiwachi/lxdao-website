import React from 'react';
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles({
  tooltip: {
    marginTop: '0px !important',
    marginBottom: '0px !important',
    marginLeft: '0px !important',
    backgroundColor: '#ffffff',
    borderRadius: '0',
    width: '420px !important',
    padding: '36px',
  },
});

export default function StyledToolTip(props) {
  const classes = useStyles();
  return (
    <Tooltip
      enterTouchDelay={0}
      classes={{ tooltip: classes.tooltip }}
      {...props}
    />
  );
}
