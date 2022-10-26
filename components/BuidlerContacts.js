import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

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
        formattedContacts[
          'twitter'
        ] = `https://twitter.com/${contacts.twitter.replace('@', '')}`;
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

function BuidlerContacts({ contacts, space }) {
  console.log('contacts: ', contacts);
  const formattedContacts = formatContacts(contacts || {});
  return (
    <Box display="flex">
      {Object.keys(formattedContacts).map((key, index) => {
        return (
          <Tooltip title={key} key={index} placement="top">
            <Typography
              target="_blank"
              component="a"
              href={formattedContacts[key]}
              color="primary"
              marginLeft={index === 0 ? 0 : space || 1}
            >
              <Box
                width="20px"
                component={'img'}
                src={`/icons/${key}.svg`}
                sx={{
                  display: 'block',
                }}
              />
            </Typography>
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default BuidlerContacts;
