/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { Box, Dialog, Link, Typography } from '@mui/material';

import LXButton from '@/components/Button';

import { getEtherScanDomain, getOpenSeaDomain } from '@/utils/utility';

export default function ProfileEditDialog({ record }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LXButton
        onClick={() => {
          setOpen(true);
        }}
        variant="outlined"
      >
        Mint
      </LXButton>
      <Dialog
        maxWidth="383px"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Box
          sx={{
            borderRadius: '6px',
            background: '#fff',
            width: '383px',
            height: '532.8px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box component={'img'} src={'/icons/check.svg'} />
          <Typography
            variant="body1"
            fontWeight="500"
            color="#000"
            textAlign="left"
            marginTop={2}
          >
            Congratulations, LXDAO Buidler card Mint succeeded！
          </Typography>
          <Box marginTop={3} marginBottom={3} margin="auto">
            <img
              crossOrigin="anonymous"
              style={{ display: 'block', width: 271 }}
              src={`${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`}
              alt=""
            />
          </Box>
          <Box
            sx={{ display: 'inline-block', color: '#666F85' }}
            marginBottom={3}
          >
            Go To{' '}
            <Link
              target="_blank"
              sx={{ wordBreak: 'break-all' }}
              href={`https://${getOpenSeaDomain()}/account`}
            >
              OpenSea
            </Link>{' '}
            To View
          </Box>
          <Box
            sx={{
              display: 'inline-block',
              fontWeight: '400',
              color: '#666F85',
            }}
            marginBottom={3}
          >
            tx:{' '}
            <Link
              target="_blank"
              sx={{ wordBreak: 'break-all' }}
              href={`https://${getEtherScanDomain()}/tx/${
                txRes.transactionHash
              }`}
            >
              {txRes.transactionHash}
            </Link>
          </Box>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <LXButton width="94px" variant="gradient" onClick={() => {}}>
              OK
            </LXButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
