import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Alert,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

import Button from '@/components/Button';
import Layout from '@/components/Layout';
import showMessage from '@/components/showMessage';

import { useAccount, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { badgeContract } from '@/abi';

const DEFAULT_BADGE_TYPES = [
  'DAPP_MEMORY_ALCHEMIST',
  'DAPP_EMOTION_GACHA',
  'DAPP_MOST_HUMANIZED_WEB3',
  'DAPP_ETERNAL_MOMENT',
  'DAPP_METAVERSE_GENESIS',
  'DAPP_BUIDLER_VALUE_AMPLIFIER',
  'DAPP_ANTI_SYBIL_CREATIVE',
  'DAPP_BEST_ENTRY_PRACTICE',
  'DAPP_WEB3_AUDIT_PIONEER',
  'DAPP_BEST_NEWCOMER_GUIDE',
  'DAPP_CREATOR_PARADISE',
  'DAPP_DIGITAL_LIFE_MUSEUM',
  'DAPP_DAO_GOVERNANCE_BEST',
  'DAPP_DECENTRALIZED_COLLAB_FOUNDATION',
  'DAPP_WEB3_PATHFINDER',
  'DAPP_ANTI_LAZINESS_PIONEER',
  'DAPP_ONCHAIN_KNIGHT_SPIRIT',
  'DAPP_WEB3_SOCIAL_FIRST_STEP',
  'DAPP_DIGITAL_WORLD_FOUNDATION',
];

// Badge status constants
const BADGE_STATUS = {
  PENDING: 'pending',
  ADDING: 'adding',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default function BadgeManagement() {
  const { isConnected, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  
  // Configurable badge types
  const [badgeTypesToAdd, setBadgeTypesToAdd] = useState(DEFAULT_BADGE_TYPES);
  const [badgeStatuses, setBadgeStatuses] = useState({});
  
  // Dialog states
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newBadgeType, setNewBadgeType] = useState('');
  
  // Initialize badge statuses when badge types change
  useEffect(() => {
    setBadgeStatuses(
      badgeTypesToAdd.reduce((acc, badge) => {
        acc[badge] = acc[badge] || { status: BADGE_STATUS.PENDING, error: null };
        return acc;
      }, {})
    );
  }, [badgeTypesToAdd]);
  
  const [isAddingAll, setIsAddingAll] = useState(false);
  const [currentAddingBadge, setCurrentAddingBadge] = useState(null);

  const {
    data: addTypeHash,
    isError: addTypeIsError,
    error: addTypeError,
    writeContractAsync: addTypeWrite,
  } = useWriteContract();

  const {
    isSuccess: isConfirmed,
    isLoading: isConfirming,
  } = useWaitForTransactionReceipt({
    hash: addTypeHash,
  });

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && currentAddingBadge) {
      setBadgeStatuses(prev => ({
        ...prev,
        [currentAddingBadge]: { status: BADGE_STATUS.SUCCESS, error: null }
      }));
      showMessage({
        type: 'success',
        title: 'Badge Type Added Successfully',
        body: `${currentAddingBadge} has been added to the contract.`,
      });
      setCurrentAddingBadge(null);
    }
  }, [isConfirmed, currentAddingBadge]);

  // Handle transaction error
  useEffect(() => {
    if (addTypeIsError && currentAddingBadge) {
      setBadgeStatuses(prev => ({
        ...prev,
        [currentAddingBadge]: { 
          status: BADGE_STATUS.ERROR, 
          error: addTypeError?.shortMessage || addTypeError?.message || 'Unknown error'
        }
      }));
      showMessage({
        type: 'error',
        title: 'Failed to Add Badge Type',
        body: addTypeError?.shortMessage || addTypeError?.message || 'Unknown error',
      });
      setCurrentAddingBadge(null);
    }
  }, [addTypeIsError, addTypeError, currentAddingBadge]);

  const addSingleBadgeType = async (badgeType) => {
    try {
      if (!isConnected) {
        showMessage({
          type: 'error',
          title: 'Wallet not connected',
          body: 'Please connect your wallet first.',
        });
        return;
      }

      if (chainId !== badgeContract.chainId) {
        await switchChainAsync({
          chainId: badgeContract.chainId,
        });
      }

      setCurrentAddingBadge(badgeType);
      setBadgeStatuses(prev => ({
        ...prev,
        [badgeType]: { status: BADGE_STATUS.ADDING, error: null }
      }));

      await addTypeWrite({
        ...badgeContract,
        functionName: 'addType',
        args: [badgeType],
      });

    } catch (err) {
      setBadgeStatuses(prev => ({
        ...prev,
        [badgeType]: { 
          status: BADGE_STATUS.ERROR, 
          error: err?.shortMessage || err?.message || 'Unknown error'
        }
      }));
      showMessage({
        type: 'error',
        title: 'Failed to Add Badge Type',
        body: err?.shortMessage || err?.message || 'Unknown error',
      });
      setCurrentAddingBadge(null);
    }
  };

  const addAllBadgeTypes = async () => {
    if (!isConnected) {
      showMessage({
        type: 'error',
        title: 'Wallet not connected',
        body: 'Please connect your wallet first.',
      });
      return;
    }

    setIsAddingAll(true);
    
    // Reset all statuses to pending
    setBadgeStatuses(prev => 
      Object.keys(prev).reduce((acc, badge) => {
        acc[badge] = { status: BADGE_STATUS.PENDING, error: null };
        return acc;
      }, {})
    );

    // Add badges one by one
    for (const badgeType of badgeTypesToAdd) {
      // Skip if already successful
      if (badgeStatuses[badgeType]?.status === BADGE_STATUS.SUCCESS) {
        continue;
      }

      try {
        if (chainId !== badgeContract.chainId) {
          await switchChainAsync({
            chainId: badgeContract.chainId,
          });
        }

        setCurrentAddingBadge(badgeType);
        setBadgeStatuses(prev => ({
          ...prev,
          [badgeType]: { status: BADGE_STATUS.ADDING, error: null }
        }));

        await addTypeWrite({
          ...badgeContract,
          functionName: 'addType',
          args: [badgeType],
        });

        // Wait for confirmation before proceeding to next
        // This will be handled by the useEffect above
        await new Promise(resolve => {
          const checkConfirmation = setInterval(() => {
            if (badgeStatuses[badgeType]?.status === BADGE_STATUS.SUCCESS || 
                badgeStatuses[badgeType]?.status === BADGE_STATUS.ERROR) {
              clearInterval(checkConfirmation);
              resolve();
            }
          }, 1000);
        });

      } catch (err) {
        setBadgeStatuses(prev => ({
          ...prev,
          [badgeType]: { 
            status: BADGE_STATUS.ERROR, 
            error: err?.shortMessage || err?.message || 'Unknown error'
          }
        }));
        console.error(`Failed to add ${badgeType}:`, err);
      }
    }

    setIsAddingAll(false);
    setCurrentAddingBadge(null);
    showMessage({
      type: 'info',
      title: 'Batch Addition Complete',
      body: 'All badge types have been processed. Check the table for individual results.',
    });
  };

  const getStatusChip = (status, error) => {
    switch (status) {
      case BADGE_STATUS.PENDING:
        return <Chip label="Pending" color="default" size="small" />;
      case BADGE_STATUS.ADDING:
        return <Chip label="Adding..." color="warning" size="small" />;
      case BADGE_STATUS.SUCCESS:
        return <Chip label="Success" color="success" size="small" />;
      case BADGE_STATUS.ERROR:
        return <Chip label="Error" color="error" size="small" title={error} />;
      default:
        return <Chip label="Unknown" color="default" size="small" />;
    }
  };

  const addNewBadgeType = () => {
    if (newBadgeType.trim() && !badgeTypesToAdd.includes(newBadgeType.trim())) {
      setBadgeTypesToAdd(prev => [...prev, newBadgeType.trim()]);
      setNewBadgeType('');
      setOpenAddDialog(false);
    }
  };

  const removeBadgeType = (badgeType) => {
    setBadgeTypesToAdd(prev => prev.filter(type => type !== badgeType));
    setBadgeStatuses(prev => {
      const newStatuses = { ...prev };
      delete newStatuses[badgeType];
      return newStatuses;
    });
  };

  const resetToDefaults = () => {
    setBadgeTypesToAdd(DEFAULT_BADGE_TYPES);
  };

  const clearAllBadgeTypes = () => {
    setBadgeTypesToAdd([]);
    setBadgeStatuses({});
  };

  const pendingCount = Object.values(badgeStatuses).filter(s => s.status === BADGE_STATUS.PENDING).length;
  const successCount = Object.values(badgeStatuses).filter(s => s.status === BADGE_STATUS.SUCCESS).length;
  const errorCount = Object.values(badgeStatuses).filter(s => s.status === BADGE_STATUS.ERROR).length;
  const progress = badgeTypesToAdd.length > 0 ? ((successCount + errorCount) / badgeTypesToAdd.length) * 100 : 0;

  if (!isConnected) {
    return (
      <Layout>
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
          <Alert severity="warning">
            Please connect your wallet to access the Badge Management page.
          </Alert>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
        <Typography variant="h3" gutterBottom>
          Badge Types Management
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Add custom badge types to the LXDAO Badge contract. You can configure which badge types to add, then add them individually or in batch.
        </Typography>

        {/* Progress Overview */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Progress Overview
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />
          <Stack direction="row" spacing={2}>
            <Chip label={`Pending: ${pendingCount}`} color="default" />
            <Chip label={`Success: ${successCount}`} color="success" />
            <Chip label={`Error: ${errorCount}`} color="error" />
          </Stack>
        </Box>

        {/* Configuration Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Badge Types Configuration
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button
              onClick={() => setOpenAddDialog(true)}
              variant="outlined"
              startIcon={<AddIcon />}
              size="small"
            >
              Add Badge Type
            </Button>
            <Button
              onClick={resetToDefaults}
              variant="outlined"
              size="small"
            >
              Reset to Defaults
            </Button>
            <Button
              onClick={clearAllBadgeTypes}
              variant="outlined"
              color="error"
              size="small"
            >
              Clear All
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Total badge types: {badgeTypesToAdd.length}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            onClick={addAllBadgeTypes}
            variant="gradient"
            disabled={isAddingAll || isConfirming || pendingCount === 0 || badgeTypesToAdd.length === 0}
            size="large"
          >
            {isAddingAll ? 'Adding All...' : `Add All ${pendingCount} Badge Types`}
          </Button>
        </Stack>

        {/* Badge Types Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Badge Type</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {badgeTypesToAdd.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No badge types configured. Add some badge types to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                badgeTypesToAdd.map((badgeType) => {
                  const { status, error } = badgeStatuses[badgeType] || { status: BADGE_STATUS.PENDING, error: null };
                  return (
                    <TableRow key={badgeType}>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {badgeType}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getStatusChip(status, error)}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          {status === BADGE_STATUS.PENDING ? (
                            <Button
                              onClick={() => addSingleBadgeType(badgeType)}
                              variant="outlined"
                              size="small"
                              disabled={isAddingAll || isConfirming || currentAddingBadge === badgeType}
                            >
                              {currentAddingBadge === badgeType ? 'Adding...' : 'Add'}
                            </Button>
                          ) : status === BADGE_STATUS.ERROR ? (
                            <Button
                              onClick={() => addSingleBadgeType(badgeType)}
                              variant="outlined"
                              size="small"
                              color="error"
                              disabled={isAddingAll || isConfirming || currentAddingBadge === badgeType}
                            >
                              Retry
                            </Button>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              -
                            </Typography>
                          )}
                          <IconButton
                            onClick={() => removeBadgeType(badgeType)}
                            size="small"
                            color="error"
                            disabled={isAddingAll || isConfirming}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Badge Type Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Badge Type</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Badge Type Name"
              value={newBadgeType}
              onChange={(e) => setNewBadgeType(e.target.value)}
              placeholder="e.g., CUSTOM_BADGE_TYPE"
              helperText="Enter a unique badge type name. Use uppercase letters, numbers, and underscores."
              sx={{ mt: 2 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addNewBadgeType();
                }
              }}
            />
            {newBadgeType.trim() && badgeTypesToAdd.includes(newBadgeType.trim()) && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                This badge type already exists in the list.
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button 
              onClick={addNewBadgeType} 
              variant="contained"
              disabled={!newBadgeType.trim() || badgeTypesToAdd.includes(newBadgeType.trim())}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}