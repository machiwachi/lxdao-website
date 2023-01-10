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
  Tooltip,
  IconButton,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';

import * as React from 'react';
import PropTypes from 'prop-types';

import LXButton from '@/components/Button';
import Layout from '@/components/Layout';

function createData(
  Name,
  Address,
  Remuneration,
  Source,
  Reason,
  ApplyDate,
  Status
) {
  return { Name, Address, Remuneration, Source, Reason, ApplyDate, Status };
}

const rows = [
  createData(
    'Bruce123132131231231',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, 8h * 50U = 400 * 0.3 = 120 LXP,did the project design work, 8h * 50U = 400 * 0.3 = 120 LXPdid the project design work, 8h * 50U = 400 * 0.3 = 120 LXP,did the project design work, 8h * 50U = 400 * 0.3 = 120 LXPdid the project design work, 8h * 50U = 400 * 0.3 = 120 LXP,did the project design work, 8h * 50U = 400 * 0.3 = 120 LXPdid the project design work, 8h * 50U = 400 * 0.3 = 120 LXP,did the project design work, 8h * 50U = 400 * 0.3 = 120 LXPdid the project design work, 8h * 50U = 400 * 0.3 = 120 LXP,did the project design work, 8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '0'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '1'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '2'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '3'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '4'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '0'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '0'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '0'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    '0'
  ),
];

function TablePaginationActions(props) {
  const theme = useTheme();
  const [pagei, setPagei] = React.useState(1);
  const { count, page, rowsPerPage, onPageChange } = props;

  const handlePageInput = (event) => {
    setPagei(event.target.value - 1);
  };
  const handlePageInputConfirm = (event) => {
    if (event.key == 'Enter') {
      let max = Math.ceil(count / rowsPerPage);
      console.log(max);
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

  React.useEffect(() => {
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
        style={{ width: '2rem', 'text-align': 'center' }}
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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function StatuLabel({ statu }) {
  switch (statu) {
    case '0':
      return <Typography color={'#4DCC9E'}>RELEASED</Typography>;
    case '1':
      return <Typography color={'#666F85'}>TO BE RELEASED</Typography>;
    case '2':
      return <Typography color={'#D0D5DD'}>REJECTED</Typography>;
    case '3':
      return <Typography color={'#36aff9'}>MINTED</Typography>;
    case '4':
      return <Typography color={'#ffac1d'}>NEED TO REVIEW</Typography>;
  }
}

export default function Publicity() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [copied, setCopied] = React.useState(false);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Layout title={`Apply LX Points | LXDAO`}>
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
              LX Points Publicity List
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              lineHeight="30px"
              color="#667085"
              marginTop={4}
            >
              What is{' '}
              <Link style={{ 'text-decoration': 'underline' }}>LX Points</Link>{' '}
              ? LX Points issuance{' '}
              <Link style={{ 'text-decoration': 'underline' }}>rules</Link>{' '}
            </Typography>
          </Box>
        </Box>
        <Box width={'100%'} marginTop={6}>
          <Box>
            <Typography fontSize={48} fontWeight={400} color={'#666F85'}>
              {/* todo: update the link */}
              <Link
                style={{ fontSize: 52, fontWeight: 'bold', color: '#36AFF9' }}
                fontSize={52}
                fontWeight={600}
                color={'#36AFF9'}
              >
                28
              </Link>{' '}
              Days后开始公示
            </Typography>
          </Box>

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
                <TableBody sx={{ fontSize: '16px', color: '#f14d16' }}>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          maxWidth: '100px',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        {row.Name}
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
                                console.log(e);
                              }
                            );
                          }}
                        >
                          <span>
                            {row.Address.slice(0, 4)}...{row.Address.slice(-4)}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ maxWidth: '100px', fontSize: '16px' }}
                      >
                        {row.Remuneration}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ maxWidth: '100px', fontSize: '16px' }}
                      >
                        {row.Source}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ minWidth: '300px', fontSize: '16px' }}
                      >
                        {row.Reason}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ maxWidth: '100px', fontSize: '16px' }}
                      >
                        {row.ApplyDate}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '16px',
                        }}
                      >
                        <StatuLabel statu={row.Status} />
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: '16px' }}>
                        <LXButton
                          style={{ marginBottom: '16px' }}
                          width={'100px'}
                          variant="outlined"
                        >
                          Reject
                        </LXButton>
                        <LXButton width={'100px'} variant="outlined">
                          Republish
                        </LXButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
