import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const MemberTypeCard = ({
  title,
  type,
  description,
  amount,
  selected,
  disabled,
  avatars,
}) => {
  const DisplayAvatar = ({ img, type }) => {
    if (type === 'buidler') {
      return (
        <Avatar
          src={img}
          sx={{
            float: 'left',
            width: { md: '50px', xs: '40px' },
            height: { md: '50px', xs: '40px' },
            marginLeft: { md: '-25px', xs: '-20px' },
            border: '1px solid #ffffff',
            borderRadius: '100%',
          }}
        />
      );
    } else {
      return (
        <Box
          width={{ md: '50px', xs: '40px' }}
          height={{ md: '50px', xs: '40px' }}
          borderRadius="100%"
          border="1px dashed #cccccc"
          backgroundColor="#ffffff"
          marginLeft={{ md: '-25px', xs: '-20px' }}
          sx={{ float: 'left' }}
        />
      );
    }
  };

  return (
    <Box
      backgroundColor="#ffffff"
      display="flex"
      flex="1 1 50%"
      flexDirection="column"
      gap={3}
      borderRadius="13px"
      paddingX={6}
      paddingY={4}
      border={selected ? '4px solid #101828' : 'none'}
      boxShadow="6px 6px 15px 5px rgba(0, 0, 0, 0.05)"
      sx={{ cursor: `${disabled ? 'not-allowed' : 'pointer'}` }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" textAlign="left">
          {title}
        </Typography>
        {selected ? (
          <Box
            width="30px"
            component={'img'}
            src={'/icons/checked-circle.svg'}
          />
        ) : (
          <Box
            width="30px"
            height="30px"
            borderRadius="100%"
            border="1px solid #D0D5DD"
          />
        )}
      </Box>
      <Typography
        variant="body1"
        fontSize="16px"
        lineHeight="1.5rem"
        textAlign="left"
      >
        {description}
      </Typography>
      <Box
        marginLeft="25px"
        display="flex"
        alignItems="center"
        gap={{ md: '16px', xs: '10px' }}
      >
        <Box>
          <Box>
            {avatars?.length > 0 &&
              avatars.map((avatar) => {
                return <DisplayAvatar img={avatar} type={type} />;
              })}
          </Box>
        </Box>
        <Box textAlign="left">
          <Typography variant="h6">+{amount || '?'}</Typography>
          <Typography variant="body1" fontSize={{ md: '16px', xs: '14px' }}>
            {amount
              ? `${amount} ${type}${amount > 1 ? 's' : ''} have joined`
              : 'Coming Soon'}{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberTypeCard;
