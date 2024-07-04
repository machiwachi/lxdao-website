import { useState, useEffect } from 'react';
import LXButton from '@/components/Button';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import { useWriteContract, useSwitchChain, useAccount } from 'wagmi';
import API from '@/common/API';
import showMessage from '@/components/showMessage';
import { badgeContract } from '@/abi/index';
import { polygon } from 'viem/chains';

export default function AirdropDialog({ record }) {
  const {
    data: airdrop,
    isSuccess: airdropIsSuccess,
    isLoading: airdropIsLoading,
    isError: airdropIsError,
    error: airdropError,
    writeContractAsync: airdropWrite,
  } = useWriteContract();
  const { address, chainId } = useAccount();
  const { chains, switchChainAsync } = useSwitchChain();
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
    console.log(type, res);
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
      console.log(badge);
      await airdropWrite({
        ...badgeContract,
        chainId: polygon.chainId,
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

  return (
    <>
      {
        // record?.status === 'PENDING' &&
        // firstMemberBadgeAmount === 0 &&
        address && record?.role?.includes('Onboarding Committee') && (
          <LXButton
            onClick={() => {
              setOpen(true);
            }}
            variant="outlined"
            disabled={airdropIsLoading}
          >
            {airdropIsLoading ? 'AirDropping Badge...' : 'AirDrop Badge'}
          </LXButton>
        )
      }
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
