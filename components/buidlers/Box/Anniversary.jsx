import { Box, Tooltip,Typography } from '@mui/material';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { erc721Abi } from 'viem';
import { useEffect, useState } from 'react';

const customMainnet = {
  ...mainnet,
  rpcUrls: {
    ...mainnet.rpcUrls,
    default: {
      http: ['https://mainnet.infura.io/v3/6959166847ff4ba499178f3d110c920f'],
    },
    public: {
      http: ['https://mainnet.infura.io/v3/6959166847ff4ba499178f3d110c920f'],
    },
  },
};

const publicClient = createPublicClient({
    chain: customMainnet,
    transport: http(),
});
const Anniversary = ({address}) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if(!address) return;
        const fetchBalance = async () => {
            try {
                const balance = await publicClient.readContract({
                    address: '0xa798cbf127fcbeebe3359254271fc1074362a9a4',
                    abi: erc721Abi,
                    functionName: 'balanceOf',
                    args: [address], 
                });
                console.log('Anniversary balance===>', balance);
                setBalance(balance);
            } catch (error) {
                console.log('error===>', error);
            }
        };
        fetchBalance();
    }, [address]);

    const badge = {
        "id": "LXDAO 3rd Anniversary NFT",
        "name": "LXDAO 3rd Anniversary NFT",
        "description": "LXDAO 3rd Anniversary NFT",
        "image": "/images/anniversary.png",
        "eligible": "LXDAO 3rd anniversary witness",
        "amount": 1
    }
  return Number(balance) > 0 ? <Tooltip
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
</Tooltip> : null;
};

export default Anniversary;