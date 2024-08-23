import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Box, MenuItem, Select, Typography } from '@mui/material';

import Button from '@/components/Button';
import showMessage from '@/components/showMessage';

import { isAddress } from 'viem';
import { polygon } from 'viem/chains';

import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';

import { badgeContract } from '@/abi';
import API from '@/common/API';

import MemberListWithBadge from './MemberListWithBadge';

export default function AirdropCard() {
  const { chainId } = useAccount();
  const [addresses, setAddresses] = useState([]);
  const { switchChainAsync } = useSwitchChain();

  const {
    data: airdrop,
    isSuccess: airdropIsSuccess,
    isLoading: airdropIsLoading,
    isError: airdropIsError,
    error: airdropError,
    writeContractAsync: airdropWrite,
  } = useWriteContract();

  const [selectMintBadgeValue, setSelectMintBadgeValue] = useState('');

  const badgeList = [
    'MemberFirstBadge',
    'DHDBadge',
    'ICL_English_S01',
    'ICL_URL_S01',
    'ICL_ZK_S01',
  ];

  const handleChangeSelectMintBadgeValue = (event) => {
    setSelectMintBadgeValue(event.target.value);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      members: [],
    },
  });

  const airdropBadge = async (badge, addresses, amounts) => {
    try {
      if (chainId != badgeContract.chainId) {
        await switchChainAsync({
          chainId: badgeContract.chainId,
        });
      }
      await airdropWrite({
        ...badgeContract,
        args: [badge, addresses, amounts],
        functionName: 'mintAndAirdrop',
      });
    } catch (err) {
      showMessage({
        type: 'error',
        title: `Failed to airdrop ${selectMintBadgeValue}`,
        body: err.cause?.shortMessage,
      });
    }
  };

  const onSubmit = async (data) => {
    const addresses = data.members
      .filter((item) => {
        return isAddress(item.address);
      })
      .map((item) => {
        return item.address;
      });
    setAddresses(addresses);

    const amounts = new Array(addresses.length).fill(1);
    await airdropBadge(selectMintBadgeValue, addresses, amounts);
  };

  useEffect(() => {
    (async () => {
      if (airdropIsSuccess && airdrop) {
        const updatedBuidler = await API.post(`/buidler/updateAllBadges`, {
          addresses: addresses,
        });

        if (updatedBuidler?.data?.status === 'SUCCESS') {
          showMessage({
            type: 'success',
            title: 'Success!',
          });
        } else {
          showMessage({
            type: 'error',
            title: 'Error',
            body: updatedBuidler?.data?.message,
          });
        }
      }

      if (airdropIsError) {
        showMessage({
          type: 'error',
          title: 'Failed to airdrop membership badge',
          body: <>{airdropError}</>,
        });
      }
    })();
  }, [airdropIsSuccess, airdrop]);
  return (
    <Box
      position="relative"
      sx={{
        width: 500,
        border: 'solid 1px',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        gap: '12px',
      }}
    >
      <Typography
        sx={{
          fontSize: 40,
        }}
      >
        Airdrop
      </Typography>

      <Box display="flex" width="100%">
        <Box
          marginRight="10px"
          sx={{
            fontWeight: 'bold',
            color: '#101828',
            lineHeight: '56px',
          }}
        >
          {'Members: '}
        </Box>
        <Select
          width="100%"
          value={selectMintBadgeValue}
          onChange={handleChangeSelectMintBadgeValue}
          style={{
            width: '100%',
          }}
        >
          {badgeList.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </Box>

      <Box display="flex" marginBottom="60px" width="100%">
        <Box
          marginRight="10px"
          textAlign="left"
          sx={{
            fontWeight: 'bold',
            color: '#101828',
            lineHeight: '56px',
          }}
        >
          {'Members: '}
        </Box>
        <Box flex={1}>
          <Controller
            name={'members'}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              return (
                <MemberListWithBadge
                  value={value}
                  badge={selectMintBadgeValue}
                  onChange={onChange}
                />
              );
            }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        position="absolute"
        bottom="20px"
        right="20px"
      >
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="gradient"
          size="large"
          width={200}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
