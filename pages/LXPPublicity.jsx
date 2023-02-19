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
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import API from '@/common/API';

import abi_lxp from '../abi-lxp.json';

import LXButton from '@/components/Button';
import Layout from '@/components/Layout';
import useBuidler from '@/components/useBuidler';
import showMessage from '@/components/showMessage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const [pagei, setPagei] = useState(1);
  const { count, page, rowsPerPage, onPageChange } = props;

  const handlePageInput = (event) => {
    setPagei(event.target.value - 1);
  };

  const handlePageInputConfirm = (event) => {
    if (event.key == 'Enter') {
      let max = Math.ceil(count / rowsPerPage);
      if (parseInt(event.target.value) > max) {
        onPageChange(event, max - 1);
        return;
      }
      setPagei(max - 1);
      onPageChange(event, pagei);
      return;
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

function UnReleasedTable({ isAccountingTeam, isConnected }) {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [pagination, setPagination] = useState({});

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * perPage - rows.length) : 0;

  const hanldeOperationBtn = async (id, operation) => {
    try {
      const res = await API.put(`/lxpoints/${id}`, { operation: operation });

      const result = res.data;
      if (result.status !== 'SUCCESS') {
        alert(result.message);
        // error todo Muxin add common alert, wang teng design
        return;
      }
      if (operation == 'REJECT') {
        router.reload(window.location.pathname);
      }
      getLXPApplications();
    } catch (err) {
      showMessage({
        type: 'error',
        title: err.error_code,
        body: err.message,
      });
    }
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
    ['TOBERELEASED'].map((value, index) => {
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
    const addresses = rawData.map((value, index) => value.address);
    const amounts = rawData.map((value, index) => value.value);
    return [addresses, amounts];
  };

  const hanldeReleaseBtn = async () => {
    // mint all and store the transaction hash
    setDisable(true);
    try {
      // read all record
      const [addresses, amounts] = await getAllTOBERELEASEDLXP();
      if (addresses.length == 0) {
        throw { message: 'No to be released lxp' };
      }
      const hash = await mintAll(addresses, amounts);
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
          padding: '32px 32px 0 32px',
          marginTop: '48px',
          backgroundColor: '#F3FAFF',
        }}
      >
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
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ fontSize: '16px' }}>
            {rows.map((row, index) => {
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
                    {row.name}
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
                    sx={{ maxWidth: '100px', fontSize: '16px' }}
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
                    {row.status == 'TOBERELEASED' && isConnected && (
                      <LXButton
                        width={'100px'}
                        variant="outlined"
                        onClick={() => {
                          hanldeOperationBtn(row.id, 'DISPUTE');
                        }}
                      >
                        Dispute
                      </LXButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={pagination?.total}
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
            {isAccountingTeam && (
              <TableRow sx={{ justifyContent: 'center' }}>
                <TableCell colSpan={8}>
                  <Box display="flex" justifyContent="center">
                    <LXButton
                      width="200px"
                      variant="gradient"
                      onClick={hanldeReleaseBtn}
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
    </Box>
  );
}

function ReleasedTable({ isAccountingTeam }) {
  const [hideHistory, setHideHistory] = useState(true);
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [pagination, setPagination] = useState({});

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * perPage - rows.length) : 0;

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
    ['RELEASED', 'REJECTED'].map((value, index) => {
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
              </TableRow>
            </TableHead>
            <TableBody sx={{ fontSize: '16px', color: '#f14d16' }}>
              {rows.length <= 0 ? (
                <TableRow>
                  <TableCell
                    colspan="7"
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
                    {row.name}
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
                    sx={{ maxWidth: '100px', fontSize: '16px' }}
                  >
                    {row.source}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ minWidth: '300px', fontSize: '16px' }}
                  >
                    {row.reason}
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
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

export default function Publicity({ days }) {
  const { address, isConnected } = useAccount();
  const [_loading, currentViewer] = useBuidler(address);
  const isAccountingTeam = currentViewer?.role.includes('Accounting Team');
  return (
    <Layout title={`LX Points Public Announcement | LXDAO`}>
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
          <Box textAlign="center" gap={6}>
            <Typography
              fontSize="70px"
              fontWeight={600}
              lineHeight="70px"
              color="#101828"
            >
              LX Points Public Announcement
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              lineHeight="30px"
              color="#667085"
              marginTop={4}
            >
              To ensure transparency, LX Points submitted by LXDAO contributors
              must be publicly announced by the community and approved by the
              LXDAO accounting team. For detailed rules, please refer to this
              link:{' '}
              <Link
                href="https://www.notion.so/lxdao/LXP-Rules-80afdaa00f754fb6a222313d5e322917"
                target="_blank"
                color={'#667085'}
              >
                LX Points rule
              </Link>{' '}
              .
            </Typography>
          </Box>
        </Box>

        <Box width={'100%'} marginTop={6}>
          <Box>
            <Typography fontSize={48} fontWeight={400} color={'#666F85'}>
              <span
                style={{ fontSize: 52, fontWeight: 'bold', color: '#36AFF9' }}
                fontSize={52}
                fontWeight={600}
                color={'#36AFF9'}
              >
                {days < 0 ? -days : days}
              </span>{' '}
              {days < 0 ? 'Days后结束公示' : 'Days后开始公示'}
            </Typography>
          </Box>
          {days < 0 && (
            <UnReleasedTable
              isAccountingTeam={isAccountingTeam}
              isConnected={isConnected}
            />
          )}
          <ReleasedTable isAccountingTeam={isAccountingTeam} />
        </Box>
      </Container>
    </Layout>
  );
}

function getDays() {
  const now = new Date('2023-03-01');
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
    days = now.getDate() - 7;
  }
  return days;
}

export async function getServerSideProps() {
  const days = getDays();
  return { props: { days } };
}
