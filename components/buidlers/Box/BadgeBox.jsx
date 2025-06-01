import { useEffect, useState } from 'react';

import { Box, Tooltip, Typography } from '@mui/material';

import { createPublicClient, http } from 'viem';
import { optimism } from 'viem/chains';

import { voteContract } from '../../../abi';
import Anniversary from './Anniversary';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

export default function BadgeBox({ record }) {
  const [isHasOtherBadges, setIsHasOtherBadges] = useState([]);
  const [voteTokens, setVoteTokens] = useState([]);

  useEffect(() => {
    const fetchVoteTokens = async () => {
      if (record?.address) {
        try {
          console.log('Fetching vote tokens for address:', record.address);

          // Get the current season
          const currentSeason = await publicClient.readContract({
            address: voteContract.address,
            abi: voteContract.abi,
            functionName: 'currentSeason',
          });
          console.log('Current season:', currentSeason.toString());

          // Fetch all seasons from 11 to current
          const tokenPromises = [];
          for (let season = 11; season <= Number(currentSeason); season++) {
            tokenPromises.push(
              (async () => {
                const balance = await publicClient.readContract({
                  address: voteContract.address,
                  abi: voteContract.abi,
                  functionName: 'balanceOf',
                  args: [record.address, BigInt(season)],
                });

                console.log(`Season ${season} balance:`, balance.toString());
                if (balance > 0n) {
                  // Get token metadata URI
                  const tokenUri = await publicClient.readContract({
                    address: voteContract.address,
                    abi: voteContract.abi,
                    functionName: 'uri',
                    args: [BigInt(season)],
                  });
                  console.log(`Season ${season} URI:`, tokenUri);

                  // Fetch metadata
                  let metadata;
                  try {
                    // Handle both IPFS and HTTP URIs
                    const url = tokenUri.startsWith('ipfs://')
                      ? `https://nftstorage.link/ipfs/${tokenUri.split('ipfs://')[1]}`
                      : tokenUri;
                    console.log(`Fetching metadata from:`, url);
                    const response = await fetch(url);
                    metadata = await response.json();
                    console.log(`Season ${season} metadata:`, metadata);
                  } catch (error) {
                    console.error(
                      `Error fetching token metadata for season ${season}:`,
                      error
                    );
                    metadata = {
                      name: `Vote Token Season ${season}`,
                      image: '/images/vote-token.png',
                    };
                  }

                  return {
                    id: season.toString(),
                    balance: balance.toString(),
                    name: metadata.name,
                    image: metadata.image?.startsWith('ipfs://')
                      ? `https://nftstorage.link/ipfs/${metadata.image.split('ipfs://')[1]}`
                      : metadata.image,
                    description: metadata.description,
                  };
                }
                return null;
              })()
            );
          }

          const tokens = (await Promise.all(tokenPromises)).filter(
            (token) => token !== null
          );
          console.log('Final tokens:', tokens);
          setVoteTokens(tokens);
        } catch (error) {
          console.error('Error fetching vote tokens:', error);
        }
      }
    };

    fetchVoteTokens();
  }, [record?.address]);

  console.log('Rendering with vote tokens:', voteTokens);

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
      <Box display="flex" gap="15px" alignItems="center" flexWrap="wrap">
        {record?.badges &&
          record?.badges.map((badge) => {
            return badge.amount > 0 ? (
              <Tooltip
                key={badge?.image}
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
        {voteTokens.map((token) => (
          <Tooltip
            key={token.id}
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
                  component={'img'}
                  src={token.image}
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
                  {token.name || `Vote Token Season ${token.id}`}
                </Typography>
                {token.description && (
                  <Typography variant="body2">{token.description}</Typography>
                )}
                <Typography variant="body2">
                  Balance: {token.balance}
                </Typography>
              </Box>
            }
          >
            <Box
              component={'img'}
              src={token.image}
              height="60px"
              maxHeight="60px"
              objectFit="contain"
              flexShrink={0}
            />
          </Tooltip>
        ))}
        <Anniversary address={record?.address} />
      </Box>
    </Box>
  );
}
