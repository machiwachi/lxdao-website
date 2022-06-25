import { t } from '@lingui/macro';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';

export default function SectionProjects({ id, bgcolor }) {
  return (
    <Container title={t`lxdao-projects-title`}>
      <Box display="flex" gap="200px" marginY="48px">
        <Box display="flex" flexDirection="column">
          <img src="/images/gclx-logo.png" width={100} />
          <Typography
            target="_blank"
            component="a"
            href="https://gclx.xyz/"
            color="primary"
            marginRight={2}
          >
            GuoChanLiangXin
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <img src="/images/mfnft-logo.png" width={100} />
          <Typography
            target="_blank"
            component="a"
            href="https://myfirstnft.info/"
            color="primary"
            marginRight={2}
          >
            My First NFT
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
