import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';

import API from '@/common/API';

function CustomTag({ text, onRemove }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      padding="4px 8px"
      border="1px solid #ccc"
      borderRadius="16px"
      margin="4px"
    >
      <Typography variant="body2">{text}</Typography>
      <IconButton size="small" onClick={() => onRemove(text)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function EditBuilderRole({
  role,
  address,
  open,
  onClose,
  onSave,
  status,
}) {
  console.log(status);
  const [roles, setRoles] = useState(role);
  const [newRole, setNewRole] = useState('');

  const availableRoles = ['Mod', 'Accounting Team'];

  const handleAddRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setNewRole('');
    }
  };

  const handleRemoveRole = (roleToRemove) => {
    setRoles(roles.filter((r) => r !== roleToRemove));
  };

  const handleSave = () => {
    onSave(roles);
  };

  const handleMintableChange = async (e) => {
    try {
      const res = await API.post(`/buidler/${address}/enableMint`);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Builder Role</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {roles.map((item) => (
                <CustomTag key={item} text={item} onRemove={handleRemoveRole} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', gap: '12px' }}>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              displayEmpty
              style={{ flexGrow: 1 }}
            >
              <MenuItem value="" disabled>
                Choose a role
              </MenuItem>
              {availableRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            <Button
              onClick={handleAddRole}
              color="primary"
              variant="outlined"
              style={{ marginTop: '8px' }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <Typography>Able to Mint:</Typography>
          <Switch
            checked={status === 'READYTOMINT'}
            disabled={status !== 'PENDING'}
            onChange={handleMintableChange}
          />
          <Typography>
            {status === 'READYTOMINT' ? 'Mintable now' : 'Not mintable'}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
