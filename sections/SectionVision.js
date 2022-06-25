import { t } from '@lingui/macro';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';

export default function SectionVision({ id, bgcolor }) {
  return (
    <Container>
      <Box height="calc(100vh - 60px)" display="flex" alignItems="center">
        <Typography variant="h5">{t`vision-content`}</Typography>
      </Box>
    </Container>
  );
}
