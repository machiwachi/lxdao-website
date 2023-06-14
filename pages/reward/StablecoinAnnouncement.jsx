import {
  Box,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Link,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Checkbox,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';

import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import API from '@/common/API';
import { getPolygonScanDomain } from '@/utils/utility';

import LXButton from '@/components/Button';
import Layout from '@/components/Layout';
import useBuidler from '@/components/useBuidler';
import showMessage from '@/components/showMessage';

import SafeAppsSDK from '@safe-global/safe-apps-sdk';
import CloseIcon from '@mui/icons-material/Close';
import ProfileForm from '@/components/ProfileForm';

function TablePaginationActions(props) {
  const theme = useTheme();
  const [pagei, setPagei] = useState(1);
  const { count, page, rowsPerPage, onPageChange } = props;

  const handlePageInput = (event) => {
    setPagei(event.target.value - 1);
  };

  const handlePageInputConfirm = (event) => {
    if (event.key === 'Enter') {
      let max = Math.ceil(count / rowsPerPage);
      if (parseInt(event.target.value) > max) {
        onPageChange(event, max - 1);
        return;
      }
      setPagei(max - 1);
      onPageChange(event, pagei);
    }
  };

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  useEffect(() => {
    setPagei(page);
  }, [page]);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <input
        style={{ width: '2rem', textAlign: 'center' }}
        value={pagei + 1}
        onChange={handlePageInput}
        onKeyDown={handlePageInputConfirm}
      ></input>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function StatusLabel({ status }) {
  switch (status) {
    case 'RELEASED':
      return <Typography color={'#4DCC9E'}>RELEASED</Typography>;
    case 'TOBERELEASED':
      return <Typography color={'#666F85'}>TO BE RELEASED</Typography>;
    case 'REJECTED':
      return <Typography color={'#D0D5DD'}>REJECTED</Typography>;
    case 'MINTED':
      return <Typography color={'#36aff9'}>MINTED</Typography>;
    case 'NEEDTOREVIEW':
      return <Typography color={'#ffac1d'}>NEED TO REVIEW</Typography>;
  }
}

function UnReleasedTable({ isAccountingTeam }) {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(true);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(999);
  const [pagination, setPagination] = useState({});
  const [visible, setVisible] = useState(false);
  const [transaction, setTransaction] = useState('');
  const [totalRemuneration, setTotalRemuneration] = useState(0);
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    (async () => {
      await getStablecoinApplications();
    })();
  }, [page, perPage]);

  const hanldeOperationBtn = async (id, operation) => {
    try {
      const res = await API.put(`/stablecoin/${id}`, { operation: operation });

      const result = res.data;
      if (result.status !== 'SUCCESS') {
        alert(result.message);
        // error todo Muxin add common alert, wang teng design
        return;
      }
      if (operation === 'REJECT') {
        router.reload(window.location.pathname);
      }
      await getStablecoinApplications();
    } catch (err) {
      showMessage({
        type: 'error',
        title: err.error_code,
        body: err.message,
      });
    }
  };

  const handleReleaseBtn = async () => {
    if (transaction.length !== 66 || !transaction.startsWith('0x')) {
      throw { message: 'transaction error.' };
    }

    // mint all and store the transaction hash
    setDisable(true);
    try {
      // post to backend
      const res = await API.post(`/stablecoin/release`, {
        hash: transaction,
        ids: selected,
      });
      const result = res.data;
      if (result.status !== 'SUCCESS') {
        alert(result.message);
        // error todo Muxin add common alert, wang teng design
        return;
      }
      router.reload(window.location.pathname);
    } catch (err) {
      setDisable(false);
      showMessage({
        type: 'error',
        title: err.error_code,
        body: err.message,
      });
    }
  };

  const getStablecoinApplications = async () => {
    let query = `/stablecoin/list?`;
    let params = [];
    ['NEEDTOREVIEW', 'TOBERELEASED'].map((value, index) => {
      params.push('status=' + value);
    });
    params.push('page=' + (page + 1));
    params.push('per_page=' + perPage);
    query += params.join('&');
    try {
      const res = await API.get(query);

      const result = res.data;
      if (result.status !== 'SUCCESS') {
        alert(result.message);
        // error todo Muxin add common alert, wang teng design
        return;
      }
      setRows(result.data);

      // calculate
      let total = 0;
      for (let i = 0; i < result.data.length; i++) {
        total += result.data[i].value;
      }
      setTotalRemuneration(total);

      setPagination(result.pagination);
    } catch (err) {
      showMessage({
        type: 'error',
        title: err.error_code,
        body: err.message,
      });
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      setDisable(false);
      return;
    }
    setSelected([]);
    setDisable(true);
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);

    setDisable(newSelected.length === 0);
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'inherit',
      }}
    >
      <TableContainer
        component={Box}
        sx={{
          border: '0.5px solid #D0D5DD',
          borderRadius: '6px',
          padding: '32px 32px 0 32px',
          marginTop: '48px',
          backgroundColor: '#F3FAFF',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < pagination.total
                  }
                  checked={
                    pagination.total > 0 && selected.length === pagination.total
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Name
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Address
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Remuneration
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Source
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Reason
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Apply Date
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ fontSize: '16px' }}>
            {rows.length <= 0 ? (
              <TableRow>
                <TableCell
                  colSpan="7"
                  align="center"
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                    height: '60px',
                    lineHeight: '60px',
                    color: '#666F85',
                  }}
                >
                  No data
                </TableCell>
              </TableRow>
            ) : (
              ''
            )}
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                      onChange={(event) => {
                        handleSelect(event, row.id);
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    <Tooltip title={row.name}>
                      <Link href={`/buidlers/${row.address}`} target="_blank">
                        <span>{row.name}</span>
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: '100px' }}>
                    <Tooltip
                      title={copied ? 'copied!' : row.address}
                      onClick={() => {
                        navigator.clipboard.writeText(row.address).then(
                          function () {
                            setCopied(true);
                            setTimeout(() => {
                              setCopied(false);
                            }, 500);
                          },
                          function (e) {
                            console.error(e);
                          }
                        );
                      }}
                    >
                      <span>
                        {row.address.slice(0, 4)}...
                        {row.address.slice(-4)}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: '100px', fontSize: '16px' }}
                  >
                    {row.value}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ minWidth: '100px', fontSize: '16px' }}
                  >
                    {row.source}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: '300px',
                      fontSize: '16px',
                    }}
                  >
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '3',
                      }}
                    >
                      {row.reason}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: '100px', fontSize: '16px' }}
                  >
                    {new Date(row.createdAt)
                      .toISOString()
                      .split('T')[0]
                      .replaceAll('-', '.')}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: '16px',
                    }}
                  >
                    <StatusLabel status={row.status} />
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '16px' }}>
                    {row.status == 'NEEDTOREVIEW' && isAccountingTeam && (
                      <>
                        <LXButton
                          width={'100px'}
                          variant="outlined"
                          onClick={() => {
                            hanldeOperationBtn(row.id, 'REJECT');
                          }}
                        >
                          Reject
                        </LXButton>
                        <LXButton
                          marginTop={'10px'}
                          width={'100px'}
                          variant="outlined"
                          onClick={() => {
                            hanldeOperationBtn(row.id, 'REPUBLISH');
                          }}
                        >
                          Republish
                        </LXButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length > 0 && (
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: '18px',
                  }}
                >
                  {'Total'}
                </TableCell>
                <TableCell align="center" />
                <TableCell align="center" />
                <TableCell
                  align="center"
                  sx={{
                    fontSize: '18px',
                  }}
                >
                  {totalRemuneration}
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            {isAccountingTeam && (
              <TableRow sx={{ justifyContent: 'center' }}>
                <TableCell colSpan={8}>
                  <Box display="flex" justifyContent="center">
                    <LXButton
                      width="150px"
                      variant="gradient"
                      onClick={() => {
                        setVisible(true);
                      }}
                      disabled={selected.length === 0}
                    >
                      Release
                    </LXButton>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      {visible && (
        <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          onClose={(event, reason) => {
            if (reason && reason == 'backdropClick') return;
            setVisible(false);
          }}
          open={visible}
        >
          <Box
            onClick={() => {
              setVisible(false);
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
          <DialogTitle>Input safe transaction</DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              gap={{ md: '20px', xs: '10px' }}
              justifyContent="flex-start"
              marginTop="10px"
              marginBottom="5px"
              enable
            >
              <Box width="500px">
                <TextField
                  id="outlined-basic"
                  label="transaction"
                  variant="outlined"
                  style={{ width: '100%', height: '100%' }}
                  onChange={(event) => {
                    setTransaction(event.target.value);
                  }}
                />
              </Box>

              <LXButton
                width="150px"
                variant="gradient"
                onClick={async () => {
                  await handleReleaseBtn();
                }}
                disabled={disable}
              >
                Release
              </LXButton>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}

function ReleasedTable({ isAccountingTeam }) {
  const router = useRouter();
  const [hideHistory, setHideHistory] = useState(true);
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [pagination, setPagination] = useState({});
  const [importFile, setImportFile] = useState(null);
  const [disable, setDisable] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStablecoinApplications = async () => {
    let query = `/stablecoin/list?`;
    let params = [];
    ['RELEASED', 'REJECTED'].map((value) => {
      params.push('status=' + value);
    });
    params.push('page=' + (page + 1));
    params.push('per_page=' + perPage);
    query += params.join('&');
    try {
      const res = await API.get(query);

      const result = res.data;
      if (result.status !== 'SUCCESS') {
        alert(result.message);
        // error todo Muxin add common alert, wang teng design
        return;
      }
      setRows(result.data);
      setPagination(result.pagination);
    } catch (err) {
      showMessage({
        type: 'error',
        title: err.error_code,
        body: err.message,
      });
    }
  };

  const handleUploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImportFile(i);
    }
  };

  const handleImportBtn = async () => {
    setDisable(true);
    try {
      const body = new FormData();
      body.append('file', importFile);

      const res = await API.post('/stablecoin/importHistory', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = res.data;
      if (result.status !== 'SUCCESS') {
        alert(result.message);
        return;
      }
      router.reload(window.location.pathname);
    } catch (err) {
      setDisable(false);
      showMessage({
        type: 'error',
        title: err.error_code,
        body: err.message,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getStablecoinApplications();
    })();
  }, [page, perPage]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'inherit',
      }}
    >
      <TableContainer
        component={Box}
        sx={{
          border: '0.5px solid #D0D5DD',
          borderRadius: '6px',
          padding: '32px',
          marginTop: '48px',
        }}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setHideHistory(!hideHistory);
          }}
        >
          History{' '}
          {hideHistory ? (
            <>
              <ArrowDropDownIcon />
              <Typography color={'#36AFF9'}>Expand All</Typography>
            </>
          ) : (
            <ArrowDropUpIcon />
          )}
        </Box>
        {!hideHistory && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Address
                </TableCell>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Remuneration
                </TableCell>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Source
                </TableCell>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Reason
                </TableCell>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Apply Date
                </TableCell>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ color: '#666F85' }} align="center">
                  Transaction Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ fontSize: '16px', color: '#f14d16' }}>
              {rows.length <= 0 ? (
                <TableRow>
                  <TableCell
                    colSpan="7"
                    align="center"
                    sx={{
                      textAlign: 'center',
                      width: '100%',
                      height: '60px',
                      lineHeight: '60px',
                      color: '#666F85',
                    }}
                  >
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                ''
              )}
              {(perPage > 0
                ? rows.slice(page * perPage, page * perPage + perPage)
                : rows
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    <Tooltip title={row.name}>
                      <Link href={`/buidlers/${row.Address}`} target="_blank">
                        <span>{row.name}</span>
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: '100px' }}>
                    <Tooltip
                      title={copied ? 'copied!' : row.Address}
                      onClick={() => {
                        navigator.clipboard.writeText(row.Address).then(
                          function () {
                            setCopied(true);
                            setTimeout(() => {
                              setCopied(false);
                            }, 500);
                          },
                          function (e) {
                            console.error(e);
                          }
                        );
                      }}
                    >
                      <span>
                        {row.address.slice(0, 4)}...
                        {row.address.slice(-4)}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: '100px', fontSize: '16px' }}
                  >
                    {row.value}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: '100px', fontSize: '16px' }}
                  >
                    {row.source}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: '200px', fontSize: '16px' }}
                  >
                    {row.reason}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: '100px', fontSize: '16px' }}
                  >
                    {new Date(row.createdAt)
                      .toISOString()
                      .split('T')[0]
                      .replaceAll('-', '.')}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: '16px',
                    }}
                  >
                    <StatusLabel status={row.status} />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: '100px', fontSize: '16px' }}
                  >
                    <Link
                      target="_blank"
                      href={`https://${getPolygonScanDomain()}/tx/${row.hash}`}
                    >
                      {row.status == 'RELEASED' && 'View'}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {rows.length > 0 ? (
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: pagination.total },
                    ]}
                    count={pagination.total}
                    rowsPerPage={perPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangePerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              ) : null}
              {
                <TableRow sx={{ justifyContent: 'center' }}>
                  <TableCell colSpan={8}>
                    <Box display="flex" justifyContent="center">
                      <Button variant="contained" component="label">
                        Select File
                        <input
                          hidden
                          accept=".xlsx"
                          multiple
                          type="file"
                          onChange={handleUploadToClient}
                        />
                      </Button>

                      <LXButton
                        style={{ marginLeft: '2rem' }}
                        width="120px"
                        variant="gradient"
                        onClick={handleImportBtn}
                        disabled={disable}
                      >
                        Import
                      </LXButton>
                    </Box>
                  </TableCell>
                </TableRow>
              }
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

export default function StablecoinAnnouncement({ days }) {
  const { address, isConnected } = useAccount();
  const [_loading, currentViewer] = useBuidler(address);
  const isAccountingTeam = currentViewer?.role.includes('Accounting Team');

  return (
    <Layout title={`Stablecoin Announcement | LXDAO`}>
      <Container
        sx={{
          mt: 12,
          mb: 8,
          maxWidth: 1216,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={6}
          alignItems={{ lg: 'center', xs: 'center' }}
          textAlign={{ lg: 'center', xs: 'center' }}
        >
          <Box textAlign="center" gap={6} width="100%">
            <Typography
              fontSize={{ xs: '48px', sm: '70px' }}
              fontWeight={600}
              lineHeight="70px"
              color="#101828"
            >
              Stablecoin Announcement
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              lineHeight="30px"
              color="#667085"
              marginTop={4}
            >
              Ready to submit your Stablecoin application? Click the link:{' '}
              <Link
                href="/reward/StablecoinApplication"
                target="_blank"
                color={'#667085'}
              >
                Apply
              </Link>{' '}
              .
            </Typography>
          </Box>
        </Box>

        <Box width={'100%'} marginTop={8}>
          <Box>
            <Typography
              fontSize={{ xs: '30px', sm: '48px' }}
              fontWeight={400}
              color={'#666F85'}
            >
              Public announcement {days < 0 ? 'ends in' : 'starts after'}{' '}
              <span
                style={{ fontSize: 52, fontWeight: 'bold', color: '#36AFF9' }}
                fontSize={52}
                fontWeight={600}
                color={'#36AFF9'}
              >
                {days < 0 ? -days : days}
              </span>{' '}
              {Math.abs(days) === 1 ? 'Day' : 'Days'}
            </Typography>
          </Box>
          <UnReleasedTable
            isAccountingTeam={isAccountingTeam}
            isConnected={isConnected}
          />
          <ReleasedTable isAccountingTeam={isAccountingTeam} />
        </Box>
      </Container>
    </Layout>
  );
}

function getDays() {
  const now = new Date();
  let days = 0;

  if (now.getDate() > 7) {
    // how many day from now to next start.
    if (now.getMonth() == 11) {
      var next = new Date(now.getFullYear() + 1, 0, 1);
    } else {
      var next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    days = Math.ceil((next.getTime() - now.getTime()) / (1000 * 3600 * 24));
  } else {
    // how many day from now to the end.
    days = now.getDate() - 8;
  }
  return days;
}

export async function getServerSideProps() {
  const days = getDays();
  return { props: { days } };
}
