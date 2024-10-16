import { Box, Link, Typography } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { keyframes } from '@mui/system';

import Button from '@/components/Button';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import Container from '@/components/Container';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export default function NewSectionHero() {
  return (
    <Box
      sx={{
        width: '100vw',
        backgroundImage: `url('/images/new/hero-bg.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
    >
      <Container
        minHeight={{ md: '1167px', xs: '660px' }}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        textAlign="center"
        gap={{ lg: '120px', xs: '40px' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: '40px',
            mt: '151px',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '64px',
                fontWeight: 'bold',
                lineHeight: '120%',
                textAlign: 'left',
              }}
            >
              Sustain Public Goods with Infinite Cycle
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                lineHeight: '180%',
                textAlign: 'left',
                maxWidth: '542px',
                mt: '53px',
              }}
            >
              We believe Public Goods are essential to Web3. They are of great
              potential for positive externality. We work on how to sustain
              Public Goods with infinite cycle.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                mt: '41px',
              }}
            >
              <Link
                href={`/onboarding/intro`}
                color="#ffffff"
                sx={{
                  textDecoration: 'none',
                  mr: '30px',
                }}
              >
                <Button
                  variant="gradient"
                  borderRadius="100px"
                  width="200px"
                  marginBottom={2}
                >
                  JOIN US
                </Button>
              </Link>
              <CommunityLinkGroup marginBottom={0} />
            </Box>
          </Box>
          <Box
            component="img"
            sx={{
              width: '503px',
            }}
            src="/images/new/infinite.gif"
          />
        </Box>
        <Box mt="175px">
          <Typography
            sx={{
              fontSize: '32px',
              fontWeight: '600',
              lineHeight: '180%',
              width: '880px',
            }}
          >
            ‘LX’ in LXDAO stands for Conscience (“良心” in Chinese). It is the
            core value we believe in.
          </Typography>
          <MuiButton
            variant="contained"
            sx={{
              width: '180px',
              height: '48px',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: '600',
              mt: '58px',
            }}
          >
            Learn More
          </MuiButton>
        </Box>
      </Container>
      <Box
        sx={{
          // width: '100%',
          overflow: 'scroll',
          // width: '1218px',
          borderTop: '1px solid #2975DF55',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '40px',
            paddingY: '40px',
            animation: `${scroll} 30s linear infinite`,
            '&:hover': {
              animationPlayState: 'paused',
            },
            width: 'fit-content',
          }}
        >
          {/* 重复两次文字盒子以实现无缝循环 */}
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ display: 'flex', gap: '40px' }}>
              <TextBox>LX</TextBox>
              <TextBox>الضمائر</TextBox>
              <TextBox>съвестта</TextBox>
              <TextBox>svědomí</TextBox>
              <TextBox>samvittigheder</TextBox>
              <TextBox>совесть</TextBox>
              <TextBox>gewetens</TextBox>
              <TextBox>südametunnistus</TextBox>
              <TextBox>omatunto</TextBox>
              <TextBox>sirdsapziņa</TextBox>
              <TextBox>consciences</TextBox>
              <TextBox>Gewissen</TextBox>
              <TextBox>συνειδήσεις</TextBox>
              <TextBox>lelkiismeret</TextBox>
              <TextBox>hati nurani</TextBox>
              <TextBox>LiangXin</TextBox>
              <TextBox>良心</TextBox>
              <TextBox>Conciencia</TextBox>
              <TextBox>양심</TextBox>
              <TextBox>Gewissen</TextBox>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function TextBox({ children }) {
  return (
    <Box
      sx={{
        fontSize: '40px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Box>
  );
}
