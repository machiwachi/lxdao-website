import React from 'react';
import Mailchimp from 'react-mailchimp-form';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Container from '@/components/Container';

const SignupFormWrapper = styled.div`
  & input,
  & button {
    font-size: 16px;
    line-height: 24px;
  }

  & input {
    width: 90%;
    height: 24px;
    padding: 12px 14px;
    margin-right: 16px;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 360px;
    }
  }

  & button {
    background-color: #000000;
    padding: 12px 20px;
    outline: none;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
    margin-top: 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    ${(props) => props.theme.breakpoints.up('xl')} {
      margin-top: 0;
    }
  }

  & .msg-alert > p {
    color: #00fb8c !important;
  }
`;

const SectionMailchimp = () => {
  const theme = useTheme();
  return (
    <Box backgroundColor="#F9FAFB" width="100%">
      <Container
        display="flex"
        flexDirection={{ md: 'row', xs: 'column' }}
        paddingY={{ md: '96px', xs: 8 }}
        justifyContent={{ md: 'space-between', xs: 'center' }}
        gap={{ md: 8, xs: 4 }}
        margin="0 auto"
        maxWidth
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" marginBottom="20px">
            Sign up for our newsletter
          </Typography>
          <Typography fontSize="20px" lineHeight="30px">
            Get LXDAO latest news and updates.
          </Typography>
        </Box>
        <SignupFormWrapper theme={theme}>
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
      </Container>
    </Box>
  );
};

export default SectionMailchimp;
