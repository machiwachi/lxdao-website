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
  Typography,
} from '@mui/material';

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

export default function EditBuilderRole({ role, open, onClose, onSave }) {
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
          <Grid item xs={12}>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              displayEmpty
              fullWidth
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
