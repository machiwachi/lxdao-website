import React from 'react';
import Mailchimp from 'react-mailchimp-form';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

const SignupFormWrapper = styled.div`
  margin-right: 80px;
  & input,
  & button {
    font-size: 16px;
    line-height: 24px;
  }

  & input {
    width: 360px;
    height: 24px;
    padding: 12px 14px;
    margin-right: 16px;
  }

  & button {
    background-color: #000000;
    padding: 12px 20px;
    outline: none;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background-color: #64cceb;
    }
  }

  & .msg-alert > p {
    color: #00fb8c !important;
  }
`;

const SectionMailchimp = () => {
  return (
    <Box
      display="flex"
      paddingY="96px"
      paddingX="80px"
      justifyContent="space-between"
      gap="64px"
      backgroundColor="#F9FAFB"
      width="100%"
    >
      <Box display="flex" flexDirection="column" marginLeft="80px">
        <Typography variant="h4" marginBottom="20px">
          Sign up for our newsletter
        </Typography>
        <Typography fontSize="20px" lineHeight="30px">
          Be the first to know about release and industry news and insights.
        </Typography>
      </Box>
      <SignupFormWrapper>
        <Mailchimp
          action="https://lxdao.us12.list-manage.com/subscribe/post?u=4e96be73f764bc67c7f964f51&amp;id=eaa29be54b"
          fields={[
            {
              name: 'EMAIL',
              placeholder: 'Email',
              type: 'email',
              required: true,
            },
          ]}
        />
      </SignupFormWrapper>
    </Box>
  );
};

export default SectionMailchimp;
