import React from 'react';
import {
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
} from '@mui/material';

import Button from '@/components/Button';

export default function CustomDialog({
  open,
  title,
  content,
  handleClose,
  handleConfirm,
  confirmText,
  cancelText,
  variant,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}
      {cancelText ||
        (confirmText && (
          <Box padding={3} display="flex" justifyContent="flex-end">
            {cancelText && <Button onClick={handleClose}>{cancelText}</Button>}
            {confirmText && (
              <Button onClick={handleConfirm} variant={variant} autoFocus>
                {confirmText}
              </Button>
            )}
          </Box>
        ))}
    </Dialog>
  );
}
