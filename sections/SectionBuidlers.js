import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Typography, Link } from '@mui/material';

import API from '@/common/API';

import Container from '@/components/Container';
import Button from '@/components/Button';
import StyledTooltip from '@/components/StyledToolTip';
import Tag from '@/components/Tag';

const BudilerTooltip = ({ buidler, ...rest }) => {
  console.log('buidler: ', buidler);
  const BuidlerDetails = ({ name, description, address, role, skills }) => {
    return (
      <Box>
        <Typography
          color="#000000"
          variant="h5"
          lineHeight="24px"
          fontWeight={500}
          marginBottom={3}
        >
          {name}
        </Typography>
        <Typography
          color="#666F85"
          variant="body1"
          lineHeight="24px"
          fontWeight={400}
          marginBottom="17px"
        >
          {description}
        </Typography>
        {role.length && (
          <Box display="flex" flexWrap="wrap" marginBottom="25px">
            {role.map((roleItem, index) => {
              return <Tag key={index} text={roleItem} />;
            })}
          </Box>
        )}
        {skills.length && (
          <>
            <Typography
              variant="body1"
              color="#101828"
              lineHeight="24px"
              fontWeight={500}
              marginBottom="17px"
            >
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {role.map((roleItem, index) => {
                return <Tag key={index} text={roleItem} />;
              })}
            </Box>
          </>
        )}
        <Link href={`/buidlers/${address}`} sx={{ textDecoration: 'none' }}>
          <Typography
            color="#101828"
            variant="body1"
            lineHeight="24px"
            fontWeight={500}
            textAlign="right"
          >
            More ->
          </Typography>
        </Link>
      </Box>
    );
  };

  return (
    <StyledTooltip
      title={<BuidlerDetails {...buidler} />}
      placement="bottom-start"
    >
      <Box {...rest} width="180px" height="180px">
        <Link
          href={`/buidlers/${buidler.address}`}
          target="_blank"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Box
            component="img"
            src={buidler.avatar || '/images/placeholder.jpeg'}
            width="180px"
            height="180px"
          />
        </Link>
      </Box>
    </StyledTooltip>
  );
};

const SectionBuidlers = () => {
  const [buidlers, setBuidlers] = useState([]);
  const [activeBuidlerIndex, setActiveBuidlerIndex] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    try {
      const res = await API.get('/buidler');
      const result = res?.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      setBuidlers(result?.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Box backgroundColor="#000000">
      <Container paddingY={{ md: '112px', xs: 8 }}>
        <Typography
          variant="h2"
          lineHeight="44px"
          fontWeight="600"
          color="#ffffff"
          marginBottom="31px"
        >
          LXDAO BUIDLERS
        </Typography>
        <Typography
          variant="subtitle1"
          lineHeight="30px"
          fontWeight={400}
          color="#ffffff"
          marginBottom="102px"
        >
          Welcome to Join Us, let's buidl more valuable Web3 products together!
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {buidlers.map((buidler, index) => {
            return <BudilerTooltip buidler={buidler} key={index} />;
          })}
        </Box>
        <Button
          variant="gradient"
          width="200px"
          marginTop="96px"
          onClick={() => {
            router.push('/joinus');
          }}
        >
          Join Us
        </Button>
      </Container>
    </Box>
  );
};

export default SectionBuidlers;
