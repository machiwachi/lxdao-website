import { Box, Typography } from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';

export default function NewSectionPG() {
  return (
    <Container py="100px">
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          width: '100%',
          height: '725px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            fontSize="48px"
            fontWeight="800"
            maxWidth="514px"
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
            <br /> and needs
            <br /> our attention?
          </Typography>
          <Box
            sx={{
              width: '441px',
              pt: '80px',
            }}
          >
            <Typography fontWeight="700" fontSize="28px" color="#10D7C4">
              Why
            </Typography>
            <Box
              component="img"
              mt="12px"
              src="/images/new/Union.svg"
              height="21px"
            />
            <Typography letterSpacing={'-0.32px'} lineHeight="160%" mt="48px">
              In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
          }}
        >
          <Box
            sx={{
              width: '441px',
              pt: '100px',
            }}
          >
            <Typography fontWeight="700" fontSize="28px" color="#10D7C4">
              What
            </Typography>
            <Box
              component="img"
              mt="12px"
              src="/images/new/Union.svg"
              height="21px"
            />
            <Typography letterSpacing={'-0.32px'} lineHeight="160%" mt="48px">
              In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve.
            </Typography>
          </Box>
          <Box
            sx={{
              width: '441px',
              pt: '80px',
            }}
          >
            <Typography fontWeight="700" fontSize="28px" color="#10D7C4">
              How
            </Typography>
            <Box
              component="img"
              mt="12px"
              src="/images/new/Union.svg"
              height="21px"
            />
            <Typography letterSpacing={'-0.32px'} lineHeight="160%" mt="48px">
              In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: '140px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            gap: '100px',
            justifyContent: 'space-between',
            px: '30px',
          }}
        >
          <Box
            width="200px"
            height="22px"
            bgcolor="#10D7C4"
            sx={{
              position: 'absolute',
              left: '-200px',
              top: '10px',
            }}
          ></Box>
          <Typography fontSize="28px" fontWeight="700">
            Learn more in our report
          </Typography>
          <Button width="210px" borderRadius="100px" variant="gradient">
            DOWNLOAD PDF
          </Button>
        </Box>
        <Box ml="100px">
          <Box
            sx={{
              position: 'relative',
              width: '320px',
              height: '320px',
              bgcolor: '#10D7C4',
              borderRadius: '100%',
              mr: '200px',
            }}
          >
            <Box
              component="img"
              src="/images/new/report.png"
              sx={{
                mt: '60px',
                ml: '80px',
                height: '196px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
