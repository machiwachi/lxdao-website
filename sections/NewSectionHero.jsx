import { Box, Link, Typography } from '@mui/material';

import Container from '@/components/Container';

export default function NewSectionHero() {
  return (
    <Container
      minHeight={{ md: '800px', xs: '660px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
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
        }}
      >
        <Typography
          sx={{
            fontSize: '72px',
            fontWeight: 'bold',
            lineHeight: '64px',
          }}
        >
          Sustain Public Goods with Infinite Cycle
        </Typography>
        <Box
          component="img"
          sx={{
            width: '655px',
          }}
          src="/images/infinite.png"
        />
      </Box>
    </Container>
  );
}
