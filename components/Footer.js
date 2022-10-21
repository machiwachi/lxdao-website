import React from 'react';
import Mailchimp from 'react-mailchimp-form';
import styled from 'styled-components';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Container from './Container';
import CommunityLinkGroup from './CommunityLinkGroup';

const SignupFormWrapper = styled.div`
  & input,
  & button {
    font-size: 16px;
    line-height: 24px;
  }

  & input {
    width: 290px;
    height: 48px;
    padding: 12px 14px;
    margin-right: 16px;
    border: 0.5px solid #d0d5dd;
    border-radius: 6px;
  }

  & button {
    background: linear-gradient(90deg, #305fe8 0%, #3ad9e3 100%);
    padding: 12px 20px;
    outline: none;
    border: none;
    border-radius: 6px;
    color: #ffffff;
    cursor: pointer;
    line-height: 24px;
  }

  & .msg-alert > p {
    color: #00fb8c !important;
  }
`;

const NavList = ({ title, items }) => (
  <Box display="flex" flexDirection="column">
    <Typography variant="h6" lineHeight="58px" fontWeight={700}>
      {title}
    </Typography>
    {items.map((item) => {
      return (
        <Link target="_blank" href={item.link} sx={{ textDecoration: 'none' }}>
          <Typography
            color="#646F7C"
            variant="body1"
            lineHeight="40px"
            fontWeight={400}
          >
            {item.name}
          </Typography>
        </Link>
      );
    })}
  </Box>
);

const Footer = () => {
  const theme = useTheme();
  return (
    <Box sx={{ background: '#F1F1F1' }} width="100%">
      <Container paddingY={{ md: '112px' }} margin="0 auto">
        <Box display="flex" justifyContent="space-between">
          <NavList
            title="Development"
            items={[
              { name: 'Github', link: 'https://github.com/lxdao-official' },
              {
                name: 'Developer Guild',
                link: 'https://github.com/lxdao-official/LXDAO-Developer-Guide',
              },
            ]}
          />
          <NavList
            title="Buidl Together"
            items={[
              { name: 'Join Us', link: '/join-us' },
              {
                name: 'Make a proposal',
                link: 'https://www.notion.so/lxdao/How-do-we-work-93038c708217465384cc7d9f377547c5',
              },
            ]}
          />
          <NavList
            title="Resources"
            title="Buidl Together"
            items={[
              { name: 'Forum', link: 'https://forum.lxdao.io/' },
              {
                name: 'Notion',
                link: 'https://www.notion.so/lxdao/LXDAO-WIP-e6c82cfdae8b4ded98507538a9703dbc',
              },
            ]}
          />
          <Box display="flex" gap="24px" flexDirection="column">
            <Box
              width="147px"
              component={'img'}
              src={'/icons/lxdao-logo.svg'}
            />
            <Typography
              variant="body1"
              lineHeight="24px"
              fontWeight={400}
              color="#666F85"
            >
              LXDAO is an{' '}
              <Typography display="inline" color="#3C7AFF">
                R&D
              </Typography>
              -focused DAO in Web3
            </Typography>
            <CommunityLinkGroup />
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
