import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import LXButton from '@/components/Button';
import showMessage from '@/components/showMessage';

import { polygon } from 'viem/chains';

import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';

import { badgeContract } from '@/abi/index';
import API from '@/common/API';

export default function AirdropDialog({ record }) {
  const {
    data: airdrop,
    isSuccess: airdropIsSuccess,
    isLoading: airdropIsLoading,
    isError: airdropIsError,
    error: airdropError,
    writeContractAsync: airdropWrite,
  } = useWriteContract();
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [open, setOpen] = useState(false);
  const [selectMintBadgeValue, setSelectMintBadgeValue] = useState('');
  const handleChangeSelectMintBadgeValue = (event) => {
    setSelectMintBadgeValue(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectMintBadgeValue('');
  };
  const hasBadge = (type) => {
    const res = record?.badges?.find((badge) => badge.id === type)?.amount > 0;
    return res;
  };

  const handleMintBadge = async () => {
    await airDropMembershipBadge(selectMintBadgeValue);
  };
  const airDropMembershipBadge = async (badge) => {
    try {
      if (chainId != badgeContract.chainId) {
        await switchChainAsync({
          chainId: badgeContract.chainId,
        });
      }
      await airdropWrite({
        ...badgeContract,
        args: [badge, [record.address], [1]],
        functionName: 'mintAndAirdrop',
      });
    } catch (err) {
      showMessage({
        type: 'error',
        title: `Failed to airdrop ${badge}`,
        body: err.cause?.shortMessage,
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (airdropIsSuccess && airdrop) {
        const updatedBuidler = await API.post(
          `/buidler/${record.address}/updateBadges`
        );

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
          body: <>{airdropError.toString()}</>,
        });
      }
    })();
  }, [airdropIsSuccess, airdrop]);

  const firstMemberBadgeAmount = record?.badges?.find(
    (badge) => badge.id === 'MemberFirstBadge'
  )?.amount;

  return (
    <>
      <LXButton
        onClick={() => {
          setOpen(true);
        }}
        variant="outlined"
        disabled={airdropIsLoading}
      >
        {airdropIsLoading ? 'AirDropping Badge...' : 'AirDrop Badge'}
      </LXButton>

      <Dialog open={open} onClose={handleClose} fullWidth="sm">
        <DialogTitle>Mind Badge</DialogTitle>
        <DialogContent sx={{ paddingBottom: '80px' }}>
          <DialogContentText marginBottom="10px">
            Please select the badge you want to mint.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel>badge</InputLabel>
            <Select
              value={selectMintBadgeValue}
              label="badge"
              onChange={handleChangeSelectMintBadgeValue}
            >
              <MenuItem
                value="MemberFirstBadge"
                disabled={hasBadge('MemberFirstBadge')}
              >
                MemberFirstBadge
              </MenuItem>
              <MenuItem value="DHDBadge" disabled={hasBadge('DHDBadge')}>
                DHDBadge
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleMintBadge}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
