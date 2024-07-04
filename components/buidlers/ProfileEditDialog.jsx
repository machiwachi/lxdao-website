import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';

import LXButton from '@/components/Button';
import ProfileForm from '@/components/ProfileForm';
import showMessage from '@/components/showMessage';

import { useAccount } from 'wagmi';

import API from '@/common/API';

export default function ProfileEditDialog({ record }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { address } = useAccount();
  const saveProfileHandler = async (newMetaData) => {
    setUpdating(true);
    const userProfile = {
      ...newMetaData,
      role: record.role.length === 0 ? ['Buidler'] : record.role,
      // set the NFT image
      image: `${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`,
    };
    try {
      const response = await API.put(`/buidler/${record.address}`, {
        metaData: userProfile,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      }
      setOpen(false);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to update profile',
        body: err.message,
      });
    }
    setUpdating(false);
  };

  if (record.address != address) {
    return null;
  }

  return (
    <>
      <LXButton
        onClick={() => {
          setOpen(true);
        }}
        variant="outlined"
      >
        Edit
      </LXButton>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        onClose={(event, reason) => {
          if (reason && reason == 'backdropClick') return;
          setOpen(false);
        }}
        open={open}
      >
        <Box
          onClick={() => {
            setOpen(false);
          }}
          sx={{
            cursor: 'pointer',
          }}
          position="absolute"
          top="16px"
          right="16px"
        >
          <CloseIcon></CloseIcon>
        </Box>
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          <ProfileForm
            updating={updating}
            values={_.cloneDeep(
              _.pick(record, [
                'avatar',
                'name',
                'description',
                'skills',
                'interests',
                'contacts',
                'privateContacts',
              ])
            )}
            saveProfileHandler={saveProfileHandler}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
