import {
  Box,
  Container,
  Typography,
  Input,
  InputAdornment,
  Button,
  Grid,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Paper,
  IconButton,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import LXButton from '@/components/Button';

import Layout from '@/components/Layout';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../components/TextInput';
import { stringCut } from '@/utils/utility';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ConstructionOutlined } from '@mui/icons-material';

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
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
  ),
  createData(
    'Bruce',
    '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    '1000LXP',
    'MetaPavo',
    'did the project design work, \n8h * 50U = 400 * 0.3 = 120 LXP',
    '2022.10.08',
    'released'
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

export default function Publicity() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
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
              <span style={{ 'text-decoration': 'underline' }}>LX Points</span>{' '}
              ? LX Points issuance{' '}
              <span style={{ 'text-decoration': 'underline' }}>rules</span>{' '}
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
                28
              </span>{' '}
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
                'border-radius': '6px',
                padding: '32px',
                marginTop: '48px',
              }}
            >
              <Table stickyHeader>
                <TableHead sx={{ color: '#666F85' }}>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Remuneration</TableCell>
                    <TableCell align="center">Source</TableCell>
                    <TableCell align="center">Reason</TableCell>
                    <TableCell align="center">Apply Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                        {row.Address.slice(0, 4)}...{row.Address.slice(-4)}
                      </TableCell>
                      <TableCell align="center" sx={{ maxWidth: '100px' }}>
                        {row.Remuneration}
                      </TableCell>
                      <TableCell align="center" sx={{ maxWidth: '100px' }}>
                        {row.Source}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: '300px' }}>
                        {row.Reason}
                      </TableCell>
                      <TableCell align="center" sx={{ maxWidth: '100px' }}>
                        {row.ApplyDate}
                      </TableCell>
                      <TableCell align="center" sx={{ maxWidth: '100px' }}>
                        {row.Status}
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
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
