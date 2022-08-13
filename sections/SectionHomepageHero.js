import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Link } from '@mui/material';
import StyledToolTip from '@/components/StyledToolTip';
import Button from '@/components/Button';
import SectionHero from './SectionHero';

const SectionHomepageHero = () => {
  const Title = () => {
    return (
      <>
        <Box marginBottom="20px" display={{ lg: 'block', xs: 'none' }}>
          <Typography variant="h3" lineHeight="1.5em">
            LXDAO is an
          </Typography>
          <Typography variant="h3" lineHeight="1.5em">
            <StyledToolTip
              placement="top"
              title={
                <Box
                  sx={{
                    background: '#fff',
                    boxShadow: 4,
                    padding: '4px 16px',
                    borderRadius: 2,
                    color: '#101828',
                  }}
                >
                  <Typography variant="h3" lineHeight="1.5em">
                    Research and Development
                  </Typography>
                </Box>
              }
            >
              <span
                style={{
                  borderBottom: '4px dashed #101828',
                  cursor: 'pointer',
                  fontWeight: '700',
                }}
              >
                R&amp;D
              </span>
            </StyledToolTip>
            -focused DAO
          </Typography>
          <Typography variant="h3" lineHeight="1.5em">
            in Web3
          </Typography>
        </Box>
        <Typography
          variant="h3"
          lineHeight="1.5em"
          marginBottom="20px"
          display={{ lg: 'none', xs: 'block' }}
        >
          LXDAO is an{' '}
          <StyledToolTip
            placement="top"
            title={
              <Box
                sx={{
                  background: '#fff',
                  boxShadow: 4,
                  padding: '4px 16px',
                  borderRadius: 2,
                  color: '#101828',
                }}
              >
                <Typography variant="body1">
                  Research and Development
                </Typography>
              </Box>
            }
          >
            <span
              style={{
                borderBottom: '4px dashed #101828',
                cursor: 'pointer',
                fontWeight: '700',
              }}
            >
              R&amp;D
            </span>
          </StyledToolTip>
          -focused DAO in Web3
        </Typography>
      </>
    );
  };
  const router = useRouter();
  return (
    <SectionHero
      leftContent={
        <>
          <Title />
          <Typography
            marginBottom={4}
            fontSize={{ md: '24px', sm: '20px', xs: '18px' }}
            maxWidth={{ md: '700px', sm: '500px', xs: '300px' }}
          >
            Bringing together buidlers to buidl and maintain &quot;
            <StyledToolTip
              placement="top"
              title={
                <Box
                  sx={{
                    background: '#fff',
                    boxShadow: 4,
                    padding: '8px 16px',
                    borderRadius: 2,
                    color: '#101828',
                  }}
                >
                  <Typography variant="body1">
                    LX = 良心 = Conscience
                  </Typography>
                  <Typography variant="body1">
                    Core Values: Buidl valuable things
                  </Typography>
                </Box>
              }
            >
              <span
                style={{
                  borderBottom: '3px dashed #667085',
                  cursor: 'pointer',
                  fontWeight: '700',
                }}
              >
                LX
              </span>
            </StyledToolTip>
            &quot; projects for Web3, in a sustainable manner.
          </Typography>
          <Button
            variant="bigGradient"
            onClick={() => {
              router.push('/joinus');
            }}
          >
            JOIN US
          </Button>
        </>
      }
      rightContent={
        <>
          <Box
            width={{ sm: '500px', xs: '300px' }}
            height={{ sm: '280px', xs: '176px' }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LIbl-UtP7zw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
          </Box>
          <Box marginTop={2}>
            <Typography variant="body2">
              <Link
                href={`https://lxdao.sharepoint.com/:b:/s/LXDAO140/ETQ8Yu6mR79GhhXOgdy_HDgBYP9BE_-I-AJINHkPWL70AQ?e=S8bf2n`}
                target="_blank"
                color={'inherit'}
              >
                (Download the latest PDF Pitch Deck)
              </Link>
            </Typography>
          </Box>
        </>
      }
    />
  );
};

export default SectionHomepageHero;
