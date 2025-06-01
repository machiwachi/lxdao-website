import { Box, Link, Typography } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { keyframes } from '@mui/system';

import AnniversaryNFT2025 from '@/components/AnniversaryNFT2025';
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
        backgroundImage: `url('/images/new/hero-bg-tmp.svg')`,
        backgroundSize: '100vw',
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
        // gap={{ lg: '120px', xs: '40px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column-reverse' },
            justifyContent: 's-tart',
            alignItems: 'center',
            textAlign: 'center',
            gap: '40px',
            mt: { md: '151px', xs: '40px' },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { md: '64px', xs: '40px' },
                fontWeight: 'bold',
                lineHeight: '120%',
                textAlign: { md: 'left', xs: 'center' },
              }}
            >
              Sustain open-source with Infinite Cycle
            </Typography>
            <Typography
              sx={{
                fontSize: { md: '20px', xs: '16px' },
                lineHeight: '180%',
                textAlign: { md: 'left', xs: 'center' },
                maxWidth: { md: '542px', xs: '100%' },
                mt: { md: '53px', xs: '20px' },
              }}
            >
              LXDAO is an R&D-driven DAO building an Infinite Cycle to help
              sustain open-source projects and public goods.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                alignItems: 'center',
                width: '100%',
                mt: '41px',
              }}
            >
              <Link
                href={`/onboarding/intro`}
                color="#ffffff"
                sx={{
                  textDecoration: 'none',
                  mr: { md: '30px', xs: '0' },
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
              width: { md: '503px', xs: '100%' },
            }}
            src="https://cdn.lxdao.io/62691c55-956b-453c-974e-3aa1533c83d0.gif"
          />
        </Box>
        <AnniversaryNFT2025 />
        <Box mt={{ md: '80px', xs: '40px' }} mb={{ md: '80px', xs: '40px' }}>
          <Typography
            sx={{
              fontSize: { md: '32px', xs: '24px' },
              fontWeight: '600',
              lineHeight: '180%',
              width: { md: '880px', xs: '100%' },
            }}
          >
            ’LX’ in LXDAO stands for Conscience (“良心” in Chinese). It is the
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
              mb: { md: '0', xs: '40px' },
            }}
            onClick={() => {
              window.open('https://docs.lxdao.io/lxdao/xuan-yan', '_blank');
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
            animation: `${scroll} 180s linear infinite`,
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
