import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import {
  createPublicClient,
  fallback,
  getAddress,
  http,
  parseAbiItem,
} from 'viem';
import { mainnet } from 'viem/chains';

export default function BadgeBox({ record }) {
  const [isHasOtherBadges, setIsHasOtherBadges] = useState([]);
  const infura = http(
    'https://mainnet.infura.io/v3/999c7c128542435eac32a6cdd05a31c1'
  );

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: fallback([infura]),
  });

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
              <Box
                key={badge?.image}
                component={'img'}
                src={badge?.image}
                width="60px"
                height="60px"
                maxWidth="60px"
                maxHeight="60px"
                objectFit="contain"
                flexShrink={0}
              />
            ) : null;
          })}
        {isHasOtherBadges.map((badge, index) => (
          // <Img3
          //   key={badge?.image}
          //   style={{
          //     width: '60px',
          //     height: '60px',
          //     objectFit: 'contain',
          //     minWidth: '60px',
          //     flexShrink: 0,
          //   }}
          //   src={badge.image}
          //   alt={badge.name}
          // />
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
