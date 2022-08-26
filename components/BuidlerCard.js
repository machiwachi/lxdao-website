import React from 'react';
import { Box, Typography } from '@mui/material';

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
        <Box display="flex" flexDirection="column" gap="5px">
          <Typography fontSize="20px" fontWeight="800" color="#000000">
            {name}
          </Typography>
          {projectRole.length > 0 &&
            projectRole.map((role, index) => {
              return (
                <Typography fontSize="16px" color="#666F85" key={index}>
                  {role}
                </Typography>
              );
            })}
        </Box>
      </Box>
      <Typography fontSize="16px" color="#666F85">
        {description}
      </Typography>
      <Box>
        {Object.keys(contacts).map((key, index) => {
          return (
            <Typography
              target="_blank"
              component="a"
              href={contacts[key]}
              color="primary"
              key={index}
            >
              <Box width="20px" component={'img'} src={`/icons/${key}.svg`} />
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default BuidlerCard;
