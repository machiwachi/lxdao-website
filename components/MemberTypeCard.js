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
  onClick = () => {},
}) => {
  const DisplayAvatar = ({ img, type }) => {
    if (type === 'buidler') {
      return (
        <Avatar
          src={img}
          sx={{
            float: 'left',
            width: { md: '60px', xs: '40px' },
            height: { md: '60px', xs: '40px' },
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
      onClick={onClick}
      sx={{
        background: selected
          ? 'linear-gradient(to right, #2A76DF, #64CCEB, #4DCC9E)'
          : '#EFF4FB',
        borderRadius: '13px',
        padding: '2px',
      }}
      display="flex"
      flex="1 1 50%"
    >
      <Box
        backgroundColor="#ffffff"
        display="flex"
        flex="1 1 50%"
        flexDirection="column"
        gap={3}
        borderRadius="11px"
        paddingX={4}
        paddingY={4}
        paddingTop="27.5px"
        sx={{
          cursor: `${disabled ? 'not-allowed' : 'pointer'}`,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            fontSize={{ sm: '24px', xs: '20px' }}
            fontWeight="600"
            lineHeight="44px"
            textAlign="left"
            color="#101828"
          >
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
          fontWeight="400"
          lineHeight="28px"
          textAlign="left"
          color="#667085"
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
                avatars.map((avatar, index) => {
                  return <DisplayAvatar key={index} img={avatar} type={type} />;
                })}
            </Box>
          </Box>
          {amount ? (
            <Box textAlign="left">
              <Typography variant="h6" fontWeight="600">
                +{amount || '?'}
              </Typography>
              <Typography variant="body1" fontSize={{ md: '16px', xs: '14px' }}>
                {amount
                  ? `${amount} ${type}${amount > 1 ? 's' : ''} have joined`
                  : 'Coming Soon'}{' '}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default MemberTypeCard;
