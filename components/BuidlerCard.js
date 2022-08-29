import React from 'react';
import { Box, Typography } from '@mui/material';

import BuidlerContacts from './BuidlerContacts';
import Tag from './Tag';

const BuidlerCard = ({ buidlerInfo }) => {
  if (!buidlerInfo) return null;
  const { projectRole } = buidlerInfo;
  const { name, image, description, contacts } = buidlerInfo?.buidler || {};

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
          src={image}
          borderRadius="50%"
          border="1px solid #dedede"
        />
        <Box display="flex" flexDirection="column" gap="5px" color="#000000">
          <Typography fontSize="20px" fontWeight="800">
            {name}
          </Typography>
          {projectRole.length > 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              fontSize="14px"
            >
              {projectRole.map((role) => (
                <Tag text={role} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Typography fontSize="16px" color="#666F85">
        {description}
      </Typography>
      <BuidlerContacts contacts={contacts} space="10px" />
    </Box>
  );
};

export default BuidlerCard;
