import React from 'react';
import { Box, Button, TextField, Grid } from '@mui/material';

function ContactsField(props) {
  const value = props.value;

  function update(key, newValue) {
    value[key] = newValue;
    props.onChange && props.onChange(value);
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Twitter"
            value={value.twitter}
            onChange={(event) => {
              update('twitter', event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="GitHub"
            value={value.github}
            onChange={(event) => {
              update('github', event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Public Email"
            value={value.email}
            onChange={(event) => {
              update('email', event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Telegram"
            value={value.telegram}
            onChange={(event) => {
              update('telegram', event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="WeChat"
            value={value.wechat}
            onChange={(event) => {
              update('wechat', event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Discord"
            value={value.discord}
            onChange={(event) => {
              update('discord', event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactsField;
