import React from 'react';
import { Box, Typography } from '@mui/material';

// https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

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

  // todo
  delete formattedContacts['wechat'];
  delete formattedContacts['discord'];
  console.log('formattedContacts: ', formattedContacts);

  return formattedContacts;
}

function BuidlerContacts({ contacts }) {
  const formattedContacts = formatContacts(contacts || {});
  return (
    <Box>
      {Object.keys(formattedContacts).map((key, index) => {
        console.log('key: ', key);
        console.log('contacts[key]: ', contacts[key]);
        return (
          <Typography
            target="_blank"
            component="a"
            href={formattedContacts[key]}
            color="primary"
            key={index}
          >
            <Box width="20px" component={'img'} src={`/icons/${key}.svg`} />
          </Typography>
        );
      })}
    </Box>
  );
}

export default BuidlerContacts;
