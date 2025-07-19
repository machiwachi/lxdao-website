import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Chip,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Button from '@/components/Button';
import showMessage from '@/components/showMessage';

import { isAddress } from 'viem';

import { useAccount, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { badgeContract } from '@/abi';
import API from '@/common/API';

import MemberListWithBadge from './MemberListWithBadge';

export default function AirdropCard() {
  const { chainId } = useAccount();
  const [addresses, setAddresses] = useState([]);
  const [refreshMembers, setRefreshMembers] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { switchChainAsync } = useSwitchChain();

  const {
    data: airdrop,
    isError: airdropIsError,
    error: airdropError,
    writeContractAsync: airdropWrite,
  } = useWriteContract();

  const {
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash: airdrop,
  });

  const [selectMintBadgeValue, setSelectMintBadgeValue] = useState('');

  const badgeList = [
    
    'MemberFirstBadge',
    'DHDBadge',
    'ValuableGuestOffline',
    'ValuableGuestOnline',
    'CL_BP',
    'CL_SM',
    'CL_HD',
    'CL_EL',
    'CL_CS',
  ];

  const handleChangeSelectMintBadgeValue = (event) => {
    setSelectMintBadgeValue(event.target.value);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      members: [],
      address: [],
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
    let addresses = data.members
      .filter((item) => {
        return isAddress(item.address);
      })
      .map((item) => {
        return item.address;
      });
    setAddresses(addresses);
    addresses = addresses.concat(
      data.address.filter((item) => isAddress(item))
    );

    const amounts = new Array(addresses.length).fill(1);
    await airdropBadge(selectMintBadgeValue, addresses, amounts);
  };

  const refreshBadges = async () => {
    const refreshAddresses = refreshMembers
      .filter((member) => isAddress(member.address))
      .map((member) => member.address);

    if (refreshAddresses.length === 0) {
      showMessage({
        type: 'warning',
        title: 'No members selected',
        body: 'Please select members to refresh their badges',
      });
      return;
    }

    setIsRefreshing(true);
    try {
      const updatedBuidler = await API.post(`/buidler/updateAllBadges`, {
        addresses: refreshAddresses,
      });

      if (updatedBuidler?.data?.status === 'SUCCESS') {
        showMessage({
          type: 'success',
          title: 'Badges refreshed successfully!',
        });
      } else {
        showMessage({
          type: 'error',
          title: 'Failed to refresh badges',
          body: updatedBuidler?.data?.message,
        });
      }
    } catch (error) {
      showMessage({
        type: 'error',
        title: 'Failed to refresh badges',
        body: error.message,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (isConfirmed && addresses.length > 0) {
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
  }, [isConfirmed, addresses, airdropIsError, airdropError]);
  return (
    <Stack spacing={3}>
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
          {'*Badges: '}
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

      <Box display="flex" width="100%">
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
            rules={{ required: false }}
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
          {'Address: '}
        </Box>
        <Box flex={1}>
          <Controller
            name={'address'}
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => {
              return (
                <Stack gap={2} width={'full'}>
                  <TextField
                    placeholder="Press Enter to add address"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        value.push(event.target.value);
                        onChange(value);
                        event.target.value = '';
                      }
                    }}
                  ></TextField>

                  <Stack flexWrap={true} gap={1}>
                    {value.map((tag, index) => {
                      const handleDelete = () => {
                        onChange(value.filter((_, i) => i !== index));
                      };
                      return (
                        <Chip
                          key={index}
                          size="small"
                          label={tag}
                          variant="outlined"
                          sx={{
                            borderRadius: '2px',
                            fontSize: '14px',
                            border: 'none',
                            color: '#36AFF9',
                            background: 'rgba(54, 175, 249, 0.1)',
                          }}
                          onDelete={handleDelete}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
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
        Refresh Badges
      </Typography>

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
          <MemberListWithBadge
            value={refreshMembers}
            onChange={setRefreshMembers}
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
          onClick={refreshBadges}
          variant="gradient"
          size="large"
          width={200}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Badges'}
        </Button>
      </Box>
    </Box>
    </Stack>
  );
}
