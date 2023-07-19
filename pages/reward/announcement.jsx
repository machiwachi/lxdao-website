import React, { useEffect, useState } from 'react';
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
  Tabs,
  Tab,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
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
import ReasonForm from '@/components/ReasonForm';
import API from '@/common/API';
import { getEtherScanDomain, getPolygonScanDomain } from '@/utils/utility';
import abi_lxp from '../../abi-lxp.json';
import LXButton from '@/components/Button';
import Layout from '@/components/Layout';
import useBuidler from '@/components/useBuidler';
import showMessage from '@/components/showMessage';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { RewardLabels } from '@/pages/reward/define';

const useStyles = makeStyles({
  tooltip: {
    marginTop: '0px !important',
    marginBottom: '0px !important',
    marginLeft: '0px !important',
    backgroundColor: '#ffffff',
    width: '420px !important',
    padding: '24px',
    border: '1px solid #D0D5DD',
    borderRadius: '6px',
  },
});

function StyledTooltip(props) {
  const classes = useStyles();
  return (
    <Tooltip
      enterTouchDelay={0}
      classes={{ tooltip: classes.tooltip }}
      {...props}
    />
  );
}

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

function StatusLabel({ status, record }) {
  switch (status) {
    case 'RELEASED':
      return <Typography color={'#4DCC9E'}>RELEASED</Typography>;
    case 'TOBERELEASED':
      return <Typography color={'#666F85'}>TO BE RELEASED</Typography>;
    case 'REJECTED':
      if (record?.rejectReason) {
        return (
          <StyledTooltip
            placement="bottom"
            title={
              <Typography
                variant="subtitle1"
                lineHeight="20px"
                fontWeight={400}
                color="#1e2022"
              >
                {record.rejectReason}
              </Typography>
            }
          >
            <Typography color={'#D0D5DD'}>REJECTED</Typography>
          </StyledTooltip>
        );
      } else {
        return <Typography color={'#D0D5DD'}>REJECTED</Typography>;
      }

    case 'MINTED':
      return <Typography color={'#36aff9'}>MINTED</Typography>;
    case 'NEEDTOREVIEW':
      if (record?.disputeReasons) {
        return (
          <StyledTooltip
            placement="bottom"
            title={
              <div style={{ color: '#1e2022' }}>
                {record.disputeReasons?.map((item) => (
                  <>
                    <Typography
                      variant="subtitle1"
                      lineHeight="20px"
                      fontWeight={400}
                      color="#1e2022"
                    >
                      {`${item.name}: ${item.reason}`}
                    </Typography>
                    <br />
                  </>
                ))}
              </div>
            }
          >
            <Typography color={'#ffac1d'}>NEED TO REVIEW</Typography>
          </StyledTooltip>
        );
      } else {
        return <Typography color={'#ffac1d'}>NEED TO REVIEW</Typography>;
      }
  }
}

function UnReleasedLXPTable({
  isAccountingTeam,
  hasMemberFirstBadge,
  address,
  name,
}) {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(999);
  const [pagination, setPagination] = useState({});
  const [reasonVisible, setReasonVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isDispute, setIsDispute] = useState(true);
  const [currentLxpointId, setCurrentLxpointId] = useState('');
  const [totalRemuneration, setTotalRemuneration] = useState(0);

  const allLabels = ['All', 'Myself', ...RewardLabels];
  const [labels, setLabels] = useState(['All']);

  useEffect(() => {
    (async () => {
      await getLXPApplications();
    })();
  }, [page, perPage, labels]);

  const handleOperationBtn = async (id, operation) => {
    if (operation === 'REJECT') {
      setIsDispute(false);
      setCurrentLxpointId(id);
      setReasonVisible(true);
      return;
    } else if (operation === 'DISPUTE') {
      setIsDispute(true);
      setCurrentLxpointId(id);
      setReasonVisible(true);
      return;
    }
    try {
      const res = await API.put(`/lxpoints/${id}`, { operation: operation });

      const result = res.data;
      if (result.status !== 'SUCCESS') {
        alert(result.message);
        // error todo Muxin add common alert, wang teng design
        return;
      }
      if (operation === 'REJECT') {
        router.reload(window.location.pathname);
      }
      await getLXPApplications();
    } catch (err) {
      showMessage({
        type: 'error',
        title: err.error_code,
        body: err.message,
      });
    }
  };

  const saveReasonHandler = async (values) => {
    setUpdating(true);
    try {
      let response;
      if (isDispute) {
        response = await API.put(
          `/lxpoints/${currentLxpointId}/updateDisputeReasons`,
          {
            id: currentLxpointId,
            disputeReasons: [
              {
                address,
                name,
                reason: values.reason,
              },
            ],
            rejectReason: '',
          }
        );
      } else {
        response = await API.put(
          `/lxpoints/${currentLxpointId}/updateRejectReason`,
          {
            id: currentLxpointId,
            disputeReasons: [],
            rejectReason: `${name}: ${values.reason}`,
          }
        );
      }

      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      } else {
        if (isDispute) {
          await getLXPApplications();
        } else {
          router.reload(window.location.pathname);
        }
      }
      setReasonVisible(false);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to submit',
        body: err.message,
      });
    }
    setUpdating(false);
  };

  const mintAll = async (addresses, amounts) => {
    const lxpAddress = process.env.NEXT_PUBLIC_LXP_CONTRACT_ADDRESS;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lxpContract = new ethers.Contract(lxpAddress, abi_lxp, signer);
    const tx = await lxpContract.batchMint(addresses, amounts);
    return tx.hash;
  };

  const getAllTOBERELEASEDLXP = async () => {
    let query = `/lxpoints/list?`;
    let params = [];
    ['TOBERELEASED'].map((value) => {
      params.push('status=' + value);
    });
    params.push('page=1');
    params.push('per_page=' + 9999);
    query += params.join('&');
    const res = await API.get(query);
    const result = res.data;
    if (result.status !== 'SUCCESS') {
      alert(result.message);
      // error todo Muxin add common alert, wang teng design
      return;
    }
    const rawData = result.data;
    const addresses = rawData.map((value) => value.address);
    const amounts = rawData.map((value) => value.value);
    return [addresses, amounts];
  };

  const handleSelectLabels = async (event) => {
    let {
      target: { value },
    } = event;

    let parse = typeof value === 'string' ? value.split(',') : value;
    setLabels(parse);
  };

  const handleReleaseBtn = async () => {
    // mint all and store the transaction hash
    setDisable(true);
    try {
      // read all record
      const [addresses, amounts] = await getAllTOBERELEASEDLXP();
      if (addresses.length === 0) {
        throw { message: 'No to be released lxp' };
      }

      const formattedAmounts = amounts.map((value) =>
        ethers.utils.parseUnits(value.toString(), 'ether')
      );

      const hash = await mintAll(addresses, formattedAmounts);
      // post to backend
      const res = await API.post(`/lxpoints/release`, { hash: hash });
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

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangePerPage = (event) => {
  //   setPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const getLXPApplications = async () => {
    let query = `/lxpoints/list?`;
    let params = [];
    ['NEEDTOREVIEW', 'TOBERELEASED'].map((value) => {
      params.push('status=' + value);
    });

    labels.map((value) => {
      if (value !== 'All') {
        if (value === 'Myself') {
          params.push('address=' + address);
        } else {
          params.push('labels=' + value);
        }
      }
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

      // calculate
      let total = 0;
      for (let i = 0; i < result.data.length; i++) {
        total += result.data[i].value;
      }
      setTotalRemuneration(total);

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
          padding: '10px 32px 0 32px',
          marginTop: '48px',
          backgroundColor: '#F3FAFF',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ width: '100%', marginBottom: '10px' }}
        >
          <InputLabel id="reward-select-label">Labels filter:</InputLabel>
          <Select
            labelId="reward-select-label"
            id="reward-select-label"
            value={labels}
            onChange={handleSelectLabels}
            sx={{ height: '44px' }}
          >
            {allLabels.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
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
                Reward
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Source
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Reason
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Date
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
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
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
                      maxWidth: '300px',
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
                    <StatusLabel status={row.status} record={row} />
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '16px' }}>
                    {row.status === 'NEEDTOREVIEW' && isAccountingTeam && (
                      <>
                        <LXButton
                          width={'100px'}
                          variant="outlined"
                          onClick={() => {
                            handleOperationBtn(row.id, 'REJECT');
                          }}
                        >
                          Reject
                        </LXButton>
                        <LXButton
                          marginTop={'10px'}
                          width={'100px'}
                          variant="outlined"
                          onClick={() => {
                            handleOperationBtn(row.id, 'REPUBLISH');
                          }}
                        >
                          Republish
                        </LXButton>
                      </>
                    )}
                    {row.status == 'TOBERELEASED' && hasMemberFirstBadge && (
                      <>
                        <LXButton
                          width={'100px'}
                          variant="outlined"
                          onClick={() => {
                            setIsDispute(true);
                            handleOperationBtn(row.id, 'DISPUTE');
                          }}
                        >
                          Dispute
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
            {/*{rows.length > 0 ? (*/}
            {/*  <TableRow>*/}
            {/*    <TablePagination*/}
            {/*      rowsPerPageOptions={[*/}
            {/*        5,*/}
            {/*        10,*/}
            {/*        25,*/}
            {/*        { label: 'All', value: pagination.total },*/}
            {/*      ]}*/}
            {/*      count={pagination?.total}*/}
            {/*      rowsPerPage={perPage}*/}
            {/*      page={page}*/}
            {/*      SelectProps={{*/}
            {/*        inputProps: {*/}
            {/*          'aria-label': 'rows per page',*/}
            {/*        },*/}
            {/*        native: true,*/}
            {/*      }}*/}
            {/*      onPageChange={handleChangePage}*/}
            {/*      onRowsPerPageChange={handleChangePerPage}*/}
            {/*      ActionsComponent={TablePaginationActions}*/}
            {/*    />*/}
            {/*  </TableRow>*/}
            {/*) : null}*/}
            {isAccountingTeam && (
              <TableRow sx={{ justifyContent: 'center' }}>
                <TableCell colSpan={8}>
                  <Box display="flex" justifyContent="center">
                    <LXButton
                      width="200px"
                      variant="gradient"
                      onClick={handleReleaseBtn}
                      disabled={disable}
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
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        onClose={() => {
          setReasonVisible(false);
        }}
        open={reasonVisible}
      >
        <Box
          onClick={() => {
            setReasonVisible(false);
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
        <DialogTitle>
          {isDispute ? 'Dispute Reason' : 'Reject Reason'}
        </DialogTitle>
        <DialogContent>
          <ReasonForm
            updating={updating}
            saveReasonHandler={saveReasonHandler}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function UnReleasedStablecoinTable({
  isAccountingTeam,
  hasMemberFirstBadge,
  address,
  name,
}) {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(true);
  const [page] = useState(0);
  const [perPage] = useState(999);
  const [pagination, setPagination] = useState({});
  const [visible, setVisible] = useState(false);
  const [transaction, setTransaction] = useState('');
  const [totalRemuneration, setTotalRemuneration] = useState(0);
  const [selected, setSelected] = React.useState([]);
  const [reasonVisible, setReasonVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isDispute, setIsDispute] = useState(true);
  const [currentStableCoinId, setCurrentStableCoinId] = useState('');

  const allLabels = ['All', 'Myself', ...RewardLabels];
  const [labels, setLabels] = useState(['All']);

  useEffect(() => {
    (async () => {
      await getStablecoinApplications();
    })();
  }, [page, perPage, labels]);

  const hanldeOperationBtn = async (id, operation) => {
    if (operation === 'REJECT') {
      setIsDispute(false);
      setCurrentStableCoinId(id);
      setReasonVisible(true);
      return;
    } else if (operation === 'DISPUTE') {
      setIsDispute(true);
      setCurrentStableCoinId(id);
      setReasonVisible(true);
      return;
    }
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

  const saveReasonHandler = async (values) => {
    setUpdating(true);
    try {
      let response;
      if (isDispute) {
        response = await API.put(
          `/stablecoin/${currentStableCoinId}/updateDisputeReasons`,
          {
            id: currentStableCoinId,
            disputeReasons: [
              {
                address,
                name,
                reason: values.reason,
              },
            ],
            rejectReason: '',
          }
        );
      } else {
        response = await API.put(
          `/stablecoin/${currentStableCoinId}/updateRejectReason`,
          {
            id: currentStableCoinId,
            disputeReasons: [],
            rejectReason: `${name}: ${values.reason}`,
          }
        );
      }

      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      } else {
        if (isDispute) {
          await getStablecoinApplications();
        } else {
          router.reload(window.location.pathname);
        }
      }

      setReasonVisible(false);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to submit',
        body: err.message,
      });
    }
    setUpdating(false);
  };

  const handleSelectLabels = async (event) => {
    let {
      target: { value },
    } = event;

    let parse = typeof value === 'string' ? value.split(',') : value;
    setLabels(parse);
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
        setDisable(false);
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
    ['NEEDTOREVIEW', 'TOBERELEASED'].map((value) => {
      params.push('status=' + value);
    });

    labels.map((value) => {
      if (value !== 'All') {
        if (value === 'Myself') {
          params.push('address=' + address);
        } else {
          params.push('labels=' + value);
        }
      }
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
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ width: '100%', marginBottom: '10px' }}
        >
          <InputLabel id="reward-select-label">Labels filter:</InputLabel>
          <Select
            labelId="reward-select-label"
            id="reward-select-label"
            value={labels}
            onChange={handleSelectLabels}
            sx={{ height: '44px' }}
          >
            {allLabels.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
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
                Reward
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Source
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Reason
              </TableCell>
              <TableCell sx={{ color: '#666F85' }} align="center">
                Date
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
                  <TableCell sx={{ maxWidth: '50px' }}>
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
                      maxWidth: '300px',
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
                    <StatusLabel status={row.status} record={row} />
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
                    {row.status == 'TOBERELEASED' && hasMemberFirstBadge && (
                      <>
                        <LXButton
                          width={'100px'}
                          variant="outlined"
                          onClick={() => {
                            setIsDispute(true);
                            hanldeOperationBtn(row.id, 'DISPUTE');
                          }}
                        >
                          Dispute
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
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        onClose={() => {
          setReasonVisible(false);
        }}
        open={reasonVisible}
      >
        <Box
          onClick={() => {
            setReasonVisible(false);
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
        <DialogTitle>
          {isDispute ? 'Dispute Reason' : 'Reject Reason'}
        </DialogTitle>
        <DialogContent>
          <ReasonForm
            updating={updating}
            saveReasonHandler={saveReasonHandler}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function ReleasedStablecoinTable({ isAccountingTeam }) {
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
                  Reward
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
                    sx={{ minWidth: '150px', fontSize: '16px' }}
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
                    <StatusLabel status={row.status} record={row} />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: '100px', fontSize: '16px' }}
                  >
                    <Link
                      target="_blank"
                      href={`https://${getEtherScanDomain()}/tx/${row.hash}`}
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
              {isAccountingTeam && (
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
              )}
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

function ReleasedLXPTable() {
  const [hideHistory, setHideHistory] = useState(true);
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [pagination, setPagination] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getLXPApplications = async () => {
    let query = `/lxpoints/list?`;
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

  useEffect(() => {
    (async () => {
      await getLXPApplications();
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
                  Reward
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
                    sx={{ minWidth: '150px', fontSize: '16px' }}
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
                    <StatusLabel status={row.status} record={row} />
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
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

export default function Announcement({ isStart, days }) {
  const { address, isConnected } = useAccount();
  const [loading, currentViewer] = useBuidler(address);

  const [hasMemberFirstBadge, setHasMemberFirstBadge] = useState(false);
  const isAccountingTeam = currentViewer?.role?.includes('Accounting Team');
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    if (currentViewer) {
      const { badges } = currentViewer;
      const filter = badges?.filter((item) => item?.id === 'MemberFirstBadge');
      if (filter && filter[0] && filter[0]?.amount > 0) {
        setHasMemberFirstBadge(true);
      } else {
        setHasMemberFirstBadge(false);
      }
    }
  }, [currentViewer]);

  return (
    <Layout title={`Announcement | LXDAO`}>
      <Container
        sx={{
          mt: 4,
          mb: 8,
          maxWidth: '1216px',
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
          width="100%"
        >
          <Box textAlign="center" gap={6} width="100%">
            <Typography
              fontSize={{ xs: '48px', sm: '70px' }}
              fontWeight={600}
              lineHeight="70px"
              color="#101828"
            >
              Announcement
            </Typography>

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Tabs
                value={tabIndex}
                onChange={handleChangeTab}
                textColor="primary"
                centered
              >
                <Tab
                  value={0}
                  label={
                    <Typography
                      fontSize={{ xs: '24px', sm: '35px' }}
                      lineHeight="60px"
                      color="#101828"
                    >
                      LXP
                    </Typography>
                  }
                />
                <Tab
                  value={1}
                  label={
                    <Typography
                      fontSize={{ xs: '24px', sm: '35px' }}
                      lineHeight="70px"
                      color="#101828"
                    >
                      Stablecoin
                    </Typography>
                  }
                />
              </Tabs>
            </Box>
          </Box>
        </Box>

        {tabIndex === 0 ? (
          <Box width={'100%'}>
            <Box textAlign="center" gap={6} width="100%">
              <Typography
                variant="subtitle1"
                fontWeight={400}
                lineHeight="30px"
                color="#667085"
                marginTop={4}
              >
                To ensure transparency, LXP submitted by LXDAO contributors must
                be publicly announced by the community and approved by the LXDAO
                accounting team. For detailed rules, please refer to this link:{' '}
                <Link
                  href="https://www.notion.so/lxdao/LXP-Rules-80afdaa00f754fb6a222313d5e322917"
                  target="_blank"
                  color={'#667085'}
                >
                  LXP rule
                </Link>{' '}
                .
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                lineHeight="30px"
                color="#667085"
                marginTop={1}
              >
                Ready to submit your LXP application? Click the link:{' '}
                <Link href="/reward/apply" target="_blank" color={'#667085'}>
                  Apply
                </Link>{' '}
                .
              </Typography>
            </Box>
            <Box marginTop={4}>
              <Typography
                fontSize={{ xs: '30px', sm: '48px' }}
                fontWeight={400}
                color={'#666F85'}
              >
                LXP announcement{' '}
                {isStart === false ? 'ends in' : 'starts after'}{' '}
                <span
                  style={{ fontSize: 52, fontWeight: 'bold', color: '#36AFF9' }}
                  fontSize={52}
                  fontWeight={600}
                  color={'#36AFF9'}
                >
                  {days}
                </span>{' '}
                {Math.abs(days) === 1 ? 'Day' : 'Days'}
              </Typography>
            </Box>
            <UnReleasedLXPTable
              isAccountingTeam={isAccountingTeam}
              isConnected={isConnected}
              hasMemberFirstBadge={hasMemberFirstBadge}
              address={currentViewer?.address}
              name={currentViewer?.name}
            />
            <ReleasedLXPTable isAccountingTeam={isAccountingTeam} />
          </Box>
        ) : (
          <Box width={'100%'}>
            <Box textAlign="center" gap={6} width="100%">
              <Typography
                variant="subtitle1"
                fontWeight={400}
                lineHeight="30px"
                color="#667085"
                marginTop={4}
              >
                Ready to submit your Stablecoin application? Click the link:{' '}
                <Link href="/reward/apply" target="_blank" color={'#667085'}>
                  Apply
                </Link>
              </Typography>
            </Box>
            <Box width={'100%'} marginTop={4}>
              <Box>
                <Typography
                  fontSize={{ xs: '30px', sm: '48px' }}
                  fontWeight={400}
                  color={'#666F85'}
                >
                  Stablecoin announcement{' '}
                  {isStart === false ? 'ends in' : 'starts after'}{' '}
                  <span
                    style={{
                      fontSize: 52,
                      fontWeight: 'bold',
                      color: '#36AFF9',
                    }}
                    fontSize={52}
                    fontWeight={600}
                    color={'#36AFF9'}
                  >
                    {days}
                  </span>{' '}
                  {Math.abs(days) === 1 ? 'Day' : 'Days'}
                </Typography>
              </Box>
              <UnReleasedStablecoinTable
                isAccountingTeam={isAccountingTeam}
                isConnected={isConnected}
                hasMemberFirstBadge={hasMemberFirstBadge}
                address={currentViewer?.address}
                name={currentViewer?.name}
              />
              <ReleasedStablecoinTable isAccountingTeam={isAccountingTeam} />
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

function getDays() {
  const now = new Date();
  let isStart = false;
  let days = 0;
  const START_DATE = 3;
  const END_DATE = 10;

  const day = now.getDate();

  if (day < START_DATE) {
    // how many day from now to next start.
    isStart = true;
    days = START_DATE - day;
  } else if (day >= END_DATE) {
    // how many day from now to next start.
    isStart = true;

    let next;
    if (now.getMonth() === 11) {
      next = new Date(now.getFullYear() + 1, 0, START_DATE);
    } else {
      next = new Date(now.getFullYear(), now.getMonth() + 1, START_DATE);
    }
    days = Math.ceil((next.getTime() - now.getTime()) / (1000 * 3600 * 24));
  } else {
    // how many day from now to the end.
    days = END_DATE - day;
  }
  return { isStart, days };
}

export async function getServerSideProps() {
  const { isStart, days } = getDays();
  return { props: { isStart, days } };
}
