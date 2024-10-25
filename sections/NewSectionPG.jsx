import { Box, Typography } from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';

export default function NewSectionPG() {
  return (
    <Container py={{ md: '100px', xs: '60px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          position: 'relative',
          justifyContent: 'space-between',
          width: '100%',
          height: { md: '725px', xs: '100%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { md: 'space-between', xs: 'flex-start' },
          }}
        >
          <Typography
            fontSize={{ md: '48px', xs: '32px' }}
            fontWeight="800"
            maxWidth={{ md: '514px', xs: '100%' }}
            lineHeight="140%"
          >
            Why the{' '}
            <span
              style={{
                color: '#10D7C4',
              }}
            >
              Public Goods
            </span>{' '}
            is undervalued
            <br hidden /> and needs
            <br hidden /> our attention?
          </Typography>
          <ReasonsBox
            title="What"
            description="In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve."
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
          }}
        >
          <ReasonsBox
            title="What"
            description="In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve."
          />

          <ReasonsBox
            title="How"
            description="In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve."
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-between',
          mt: { md: '140px', xs: '80px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',

            px: '30px',
          }}
        >
          <Typography
            fontSize={{ md: '28px', xs: '24px' }}
            fontWeight="700"
            textAlign="start"
          >
            Learn more in our report
          </Typography>
          <Box
            width="200px"
            height={{ md: '22px', xs: '11px' }}
            bgcolor="#10D7C4"
            sx={{
              position: { md: 'absolute', xs: 'relative' },
              left: { md: '-200px', xs: '0' },
              top: { md: '10px', xs: '0' },
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              mt: { md: '150px', xs: '40px' },
            }}
          >
            <Button
              width={{ md: '210px', xs: '180px' }}
              borderRadius="100px"
              variant="gradient"
              fontSize={{ md: '16px', xs: '14px' }}
              onClick={() => {
                window.open('/publicgoods-report-en.pdf', '_blank');
              }}
            >
              PDF (ENG)
            </Button>
            <Button
              width={{ md: '210px', xs: '180px' }}
              borderRadius="100px"
              variant="gradient"
              fontSize={{ md: '16px', xs: '14px' }}
              onClick={() => {
                window.open('/publicgoods-report-cn.pdf', '_blank');
              }}
            >
              PDF (中文)
            </Button>
          </Box>
        </Box>
        <Box
          ml={{ md: '100px', xs: '0' }}
          mt={{ md: '0', xs: '40px' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              position: 'relative',
              width: { md: '320px', xs: '280px' },
              height: { md: '320px', xs: '280px' },
              bgcolor: '#10D7C4',
              borderRadius: '100%',
              mr: { md: '200px', xs: '0' },
            }}
          >
            <Box
              component="img"
              src="/images/new/report.png"
              sx={{
                mt: { md: '60px', xs: '70px' },
                ml: { md: '80px', xs: '-10px' },
                height: { md: '196px', xs: '130px' },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function ReasonsBox({ title, description }) {
  return (
    <Box
      sx={{
        width: { md: '441px', xs: '100%' },
        pt: { md: '100px', xs: '20px' },
      }}
    >
      <Typography
        fontWeight="700"
        fontSize={{ md: '28px', xs: '20px' }}
        color="#10D7C4"
      >
        {title}
      </Typography>
      <Box
        component="img"
        mt={{ md: '12px', xs: '18px' }}
        src="/images/new/Union.svg"
        height={{ md: '21px', xs: '11px' }}
      />
      <Typography
        letterSpacing={'-0.32px'}
        lineHeight="160%"
        fontSize={{ md: '16px', xs: '14px' }}
        mt={{ md: '48px', xs: '10px' }}
      >
        {description}
      </Typography>
    </Box>
  );
}
