import { useState } from 'react';

import { Box, Tooltip, Typography } from '@mui/material';

export default function BadgeBox({ record }) {
  const [isHasOtherBadges, setIsHasOtherBadges] = useState([]);

  return (
    <Box
      sx={{
        border: '0.5px solid #D0D5DD',
        borderRadius: '6px',
        padding: '30px',
        marginBottom: '24px',
      }}
    >
      <Typography
        sx={{
          fontSize: '16x',
          fontWeight: 800,
          color: '#101828',
          marginBottom: '15px',
        }}
      >
        Badges
      </Typography>
      <Box display="flex" gap="15px" alignItems="center">
        {record?.badges &&
          record?.badges.map((badge) => {
            return badge.amount > 0 ? (
              <Tooltip
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  textAlign: 'center',
                }}
                slotProps={{
                  tooltip: {
                    sx: {
                      border: '1px solid #D0D5DD',
                      backgroundColor: '#ffff',
                    },
                  },
                }}
                title={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      color: '#000',
                      textAlign: 'center',
                      gap: '10px',
                      padding: '20px',
                    }}
                  >
                    <Box
                      key={badge?.image}
                      component={'img'}
                      src={badge?.image}
                      height="140px"
                      objectFit="contain"
                      flexShrink={0}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      {badge.name}
                    </Typography>
                    <Typography variant="body2">{badge.eligible}</Typography>
                  </Box>
                }
              >
                <Box
                  key={badge?.image}
                  component={'img'}
                  src={badge?.image}
                  height="60px"
                  maxHeight="60px"
                  objectFit="contain"
                  flexShrink={0}
                />
              </Tooltip>
            ) : null;
          })}
        {isHasOtherBadges.map((badge, index) => (
          <Box
            key={index}
            component={'img'}
            src={`https://nftstorage.link/ipfs/${badge?.image.split('ipfs://')[1]}`}
            width="60px"
            height="60px"
            maxWidth="60px"
            maxHeight="60px"
            objectFit="contain"
            flexShrink={0}
          />
        ))}
      </Box>
    </Box>
  );
}
