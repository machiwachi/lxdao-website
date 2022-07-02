import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  width: '100%',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#305FE8' : '#308fe8',
  },
}));

const SectionFinancing = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      paddingY={{ md: '96px', xs: 8 }}
      paddingX={{ md: 10, xs: 6 }}
      textAlign="center"
      id="Invest-Section"
    >
      <Typography variant="h4">Invest LXDAO</Typography>
      <Typography fontSize="20px" marginTop={2}>
        We accept Pre-Seed Funding at the moment. This fund will be used to get
        LXDAO up and running, and help the community buidl some valuable Web3
        projects.
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="50px auto"
        border="1px solid #EAECF0"
        boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
        borderRadius="8px"
        width={{ md: '50%', xs: '100%' }}
      >
        <Box
          padding={3}
          display="flex"
          flexDirection="column"
          gap={4}
          width="100%"
          alignItems="flex-start"
          boxSizing="border-box"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box textAlign="left">
              <Typography
                fontSize="18px"
                lineHeight="28px"
                color="#101828"
                marginBottom={1}
              >
                Pre-Seed Funding
              </Typography>
              <Typography fontSize="14px">
                Target at 200K USDC = 15% shares.
              </Typography>
            </Box>
            <Typography variant="h5">1K - 50K USDC / Person</Typography>
          </Box>
          <Box textAlign="left" width="100%">
            <Typography
              fontSize="14px"
              color="#101828"
              fontWeight="800"
              marginBottom="12px"
            >
              100K / 200K
            </Typography>
            <BorderLinearProgress variant="determinate" value={50} />
          </Box>
        </Box>
        <Box borderTop="1px solid #EAECF0" width="100%" paddingY={2}>
          <Typography
            textAlign="right"
            marginRight="20px"
            color="#305FE8"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            I would like to invest LXDAO
          </Typography>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box width="320px" padding={3} display="flex" flexDirection="column">
          <Box textAlign="right">
            <CloseIcon onClick={handleClose} />
          </Box>
          <Box>
            <Typography>contact with Muxin</Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default SectionFinancing;
