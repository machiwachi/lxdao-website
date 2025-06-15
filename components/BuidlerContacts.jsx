import React from 'react';
import { Box, Typography, Tooltip, Chip } from '@mui/material';

import { removeEmpty } from '@/utils/utility';

// check contacts format in components/ContactsField.js
// twitter: @xxx
// github, website: https://xxx
// email: xxx@xxx.com
// telegram: @xxx
// wechat: xxx
// discord: xxx
function formatContacts(contacts) {
  let formattedContacts = {};
  Object.keys(removeEmpty(contacts)).map((key) => {
    switch (key) {
      case 'twitter':
        formattedContacts['twitter'] = contacts.twitter.includes(
          'https://twitter.com/'
        )
          ? contacts.twitter
          : `https://twitter.com/${contacts.twitter.replace('@', '')}`;
        break;
      case 'email':
        formattedContacts['email'] = `mailto:${contacts.email}`;
        break;
      case 'telegram':
        formattedContacts[
          'telegram'
        ] = `https://telegram.me/${contacts.telegram.replace('@', '')}`;
        break;

      default:
        formattedContacts[key] = contacts[key];
        break;
    }
  });

  // todo might need to pop up to show the contact
  delete formattedContacts['wechat'];
  delete formattedContacts['discord'];

  return formattedContacts;
}

function BuidlerContacts({ contacts, privateContacts }) {
  const formattedContacts = formatContacts(contacts || {});
  return (
    <Box display="flex" flexWrap="wrap" width="100%" gap={1}>
      {Object.keys(formattedContacts)
        .reverse()
        .map((key, index) => {
          return (
            <Tooltip title={key} key={index} placement="top">
              <Typography
                target="_blank"
                component="a"
                href={formattedContacts[key]}
                color="primary"
                sx={{
                  borderRadius: '100px'
                }}
              >
                <Chip
                  avatar={
                    <Typography
                      component="img"
                      src={`/icons/${key}.svg`}
                      sx={{
                        display: 'block',
                        width: '17px !important',
                        height: '17px !important',
                      }}
                    />
                  }
                  label={key}
                  variant="outlined"
                />
              </Typography>
            </Tooltip>
          );
        })}
      {privateContacts && privateContacts.email && (
        <Tooltip title="private email" key="private email" placement="top">
          <Typography
            target="_blank"
            component="a"
            href={`mailto:${privateContacts.email}`}
            color="primary"
            sx={{
              borderRadius: '100px',
            }}
          >
            <Chip
              avatar={
                <Typography
                  component="img"
                  src={`/icons/email.svg`}
                  sx={{
                    display: 'block',
                    width: '17px !important',
                    height: '17px !important',
                  }}
                />
              }
              label="private email"
              variant="outlined"
            />
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
}

export default BuidlerContacts;
