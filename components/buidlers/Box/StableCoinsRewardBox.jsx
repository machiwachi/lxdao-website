import {
  Box,
  Typography,
  Link,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StableCoinsTable from '@/components/buidlers/StableCoinsTable';
import { useState } from 'react';
import { totalStableCoins } from '@/utils/utility';

export default function StableCoinsRewardBox({ record }) {
  const [stableCoinAccordionOpen, setStableCoinAccordionOpen] = useState(false);
  const handleStableCoinAccordionOnChange = (e, value) => {
    setStableCoinAccordionOpen(value);
  };
  return (
    <Box display="flex" flexDirection="column" marginTop={3}>
      <Accordion
        onChange={handleStableCoinAccordionOnChange}
        sx={{
          '&.Mui-expanded': {
            minHeight: { md: 128, sm: 200 },
          },
          '&.MuiPaper-root': {
            border: '0.5px solid #D0D5DD',
            boxShadow: 'none',
          },
        }}
      >
        <AccordionSummary
          height={{ md: '128px', sm: '200px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            '&.MuiAccordionSummary-root': {
              height: {
                sm: '128px !important',
                xs: '200px !important',
              },
              borderRadius: '6px',
              '.MuiAccordionSummary-expandIconWrapper': {
                marginTop: { sm: 0, xs: '84px' },
                display: record?.stableCoins.length ? 'block' : 'none',
              },
            },
          }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box>
              <Typography fontWeight="600" variant="body1" color="#101828">
                Stablecoin Reward{' '}
                <Link
                  href="/reward/apply"
                  target="_blank"
                  sx={{
                    display: 'inline',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  (Apply Stablecoin {'->'})
                </Link>
              </Typography>

              <Typography
                marginTop={1}
                fontWeight="600"
                variant="h5"
                color="#36AFF9"
              >
                {totalStableCoins(record)}
              </Typography>
            </Box>
            <Box
              textAlign={{ xs: 'right' }}
              width={{ xs: '100%', md: 'auto' }}
              paddingTop={{ xs: '24px', md: 0 }}
            >
              <Typography fontWeight="500" variant="body1" color="#0D1320">
                {record?.stableCoins.length > 0
                  ? stableCoinAccordionOpen
                    ? 'Put Away'
                    : 'Record List'
                  : null}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            '&.MuiAccordionDetails-root': {
              height: '235px !important',
              padding: { sm: '8px 32px 32px 32px', xs: '8px' },
              overflowY: 'auto',
              overflowX: record?.stableCoins?.length === 0 ? 'hidden' : 'auto',
              '&::-webkit-scrollbar': {
                width: '10px',
                height: '10px',
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                background: '#dfdfdf',
              },
              '&::scrollbar-track': {
                borderRadius: 0,
                background: '#dfdfdf',
              },
            },
          }}
        >
          <StableCoinsTable maxHeight="235px" points={record.stableCoins} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
