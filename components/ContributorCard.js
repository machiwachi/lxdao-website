import React from 'react';
import { Box, Typography } from '@mui/material';

const contributorCard = ({ contributorInfo }) => {
  if (!contributorInfo) return null;
  const { name, avatar, title, description, twitter } = contributorInfo;
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      padding={3}
      backgroundColor="#ffffff"
      width="100%"
      textAlign="left"
      boxSizing={'border-box'}
    >
      <Box display="flex" alignItems="center" gap="20px">
        <Box
          width="80px"
          height="80px"
          component={'img'}
          src={avatar}
          borderRadius="50%"
          border="1px solid #dedede"
        />
        <Box display="flex" flexDirection="column" gap="5px">
          <Typography fontSize="20px" fontWeight="800" color="#000000">
            {name}
          </Typography>
          <Typography fontSize="16px" color="#666F85">
            {title}
          </Typography>
        </Box>
      </Box>
      <Typography fontSize="16px" color="#666F85">
        {description}
      </Typography>
      <Box>
        <Typography
          target="_blank"
          component="a"
          href={twitter}
          color="primary"
        >
          <Box width="20px" component={'img'} src={'/icons/twitter.svg'} />
        </Typography>
      </Box>
    </Box>
  );
};

export default contributorCard;
