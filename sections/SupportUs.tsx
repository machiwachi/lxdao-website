import { Box, Button, Container, Typography } from '@mui/material';
import SectionAnniversary from '@/sections/SectionAnniversary';

export default function SupportUs() {
  return (
    <Box bgcolor="#fafafa" py={14}>
      <Container sx={{ padding: { lg: 0 }, maxWidth: '1216px!important' }}>
        <Typography
          variant="h2"
          color="#101828"
          fontSize="56px!important"
          fontWeight="bold"
          lineHeight="44px"
          textTransform="uppercase"
        >
          Support LXDAO
        </Typography>

        <Typography
          variant="body1"
          color="#666F85"
          fontSize="21px"
          lineHeight="30px"
          mt={3}
          mb={6}
        >
          LXDAO needs your support for Stage 2 expansion. Support LXDAO by:
        </Typography>

        <Box
          sx={{ '&:after': { content: '""', display: 'table', clear: 'both' } }}
        >
          <Box
            sx={{ float: 'left' }}
            p={3}
            width={[1, 1, 1, 600]}
            borderRadius={1.5}
            mb={[2, 2, 2, 0]}
            border={1}
            borderColor="#d0d5dd"
            bgcolor="#fff"
            display="flex"
          >
            <Box flex={1}>
              <Typography variant="body1" color="#101828" fontWeight={600}>
                Checking our Deck
              </Typography>
              <Typography mt={1} mb={3} variant="body1" color="#646F7C">
                Interested? Contact{' '}
                <a href="https://telegram.me/brucexu_eth" target="_blank">
                  Bruce
                </a>
                .
              </Typography>
              <Button
                variant="outlined"
                sx={{ padding: '11px 20px', boxSizing: 'border-box' }}
                href="https://docsend.com/view/7c5nu26eexpt4adj"
                target="_blank"
              >
                Deck link
              </Button>
            </Box>
            <a
              href="https://docsend.com/view/7c5nu26eexpt4adj"
              target="_blank"
              style={{ height: '128px', display: 'block' }}
            >
              <Box
                component="img"
                width={[0, 0, 200, 200]}
                src="/images/deck.png"
              />
            </a>
          </Box>

          <Box
            sx={{ float: 'right' }}
            p={3}
            width={[1, 1, 1, 600]}
            borderRadius={1.5}
            border={1}
            borderColor="#d0d5dd"
            bgcolor="#fff"
          >
            <SectionAnniversary />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
