/* eslint-disable react/no-unescaped-entities */

/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import BuidlerContacts from '@/components/BuidlerContacts';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Button from '@/components/Button';
import Container from '@/components/Container';
import CopyText from '@/components/CopyText';
import DebouncedInput from '@/components/DebouncedInput';
import Layout from '@/components/Layout';
import SingleSelect from '@/components/Select';

import API from '@/common/API';
import { BuilderRole } from '@/models/builder';
import {
  formatAddress,
  getMemberFirstBadgeAmount,
  totalLXPoints,
  totalStableCoins,
} from '@/utils/utility';

const skillNames = [
  'All',
  'UI/UX Design',
  'Project Management',
  'Product Management',
  'FrontEnd',
  'FullStack',
  'BackEnd',
  'Operation',
  'Solidity',
  'Blockchain',
  'Others',
];

const memberStatusNames = [
  'All',
  'Buidler Card Holder',
  'Member',
  'Onboarding',
];

function TablePaginationActions(props) {
  const theme = useTheme();
  const [pagei, setPagei] = useState(0);
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

export default function Buidlers() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [memberStatus, setMemberStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState({});

  const searchList = async (
    search = '',
    role = '',
    memberStatus = ''
  ) => {
    let query = `/buidler?`;
    let params = [];
    const trimmedSearch = search.trim();
    const trimmedRole = role === 'All' ? '' : role.trim();
    const trimmedMemberStatus =
      memberStatus === 'All' ? '' : memberStatus.trim();
    if (trimmedSearch) {
      params.push('search=' + trimmedSearch);
    }
    if (trimmedRole) {
      params.push('role=' + trimmedRole);
    }
    if (trimmedMemberStatus) {
      if (trimmedMemberStatus === 'Buidler Card Holder') {
        params.push('status=ACTIVE');
      } else if (trimmedMemberStatus === 'Member') {
        params.push('status=ACTIVE&status=PENDING&status=READYTOMINT');
        params.push(`memberFirstBadge=1`);
      } else if (trimmedMemberStatus === 'Onboarding') {
        params.push('status=PENDING');
        params.push(`memberFirstBadge=0`);
      }
    } else {
      params.push('status=ACTIVE&status=READYTOMINT&status=PENDING');
    }
    params.push(`page=${page + 1}`);
    params.push(`per_page=${rowsPerPage}`);
    query += params.join('&');
    setLoading(true);

    try {
      const res = await API.get(query);
      const result = res.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      const records = result.data;
      setPagination(result.pagination);
      setLoading(false);
      setList(records);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    searchList(search, role, memberStatus);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const MemberBasicInfo = (props) => {
    const { avatar, name, address, status, badges, contacts: allContacts } = props;
    const contacts = { twitter: allContacts?.twitter }

    let memberStatusImgUrl = '/icons/member-status-grey.svg';
    let memberStatusText = 'Onboarding';
    if (status === 'ACTIVE') {
      memberStatusImgUrl = '/icons/member-status-blue.svg';
      memberStatusText = 'SBT Card Holder';
    } else if (
      (status === 'READYTOMINT' || status === 'PENDING') &&
      getMemberFirstBadgeAmount(badges) > 0
    ) {
      memberStatusImgUrl = '/icons/member-status-green.svg';
      memberStatusText = 'Member';
    }
    return (
      <Box
        display="flex"
        gap={{ xs: '12px', md: '22px' }}
        alignItems="center"
        position="relative"
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <Tooltip title={memberStatusText}>
          <Box
            component="img"
            src={memberStatusImgUrl}
            sx={{ position: 'absolute', top: 0, left: 0 }}
          />
        </Tooltip>
        <Link href={`/buidlers/${address}`} target="_blank">
          <Box
            component="img"
            src={avatar || '/images/placeholder.jpeg'}
            alt="avatar"
            sx={{
              width: '80px',
              height: '80px',
              border: '0.5px solid #E5E5E5',
              borderRadius: '6px',
            }}
          />
        </Link>
        <Box display="flex" flexDirection="column" gap="8px">
          <Link
            href={`/buidlers/${address}`}
            target="_blank"
            sx={{ textDecoration: 'none' }}
          >
            <Typography fontSize="22px" lineHeight="24px">
              {name}
            </Typography>
          </Link>
          <CopyText
            textAlign="center"
            textStyle={{ color: '#666F85', fontSize: '14px' }}
            iconSize="14px"
            copyTextOriginal={address}
            copyText={formatAddress(address)}
          />
          <Box>
            <BuidlerContacts contacts={contacts} withLabel={false} />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Layout title="LXDAO Members | LXDAO">
      <Container paddingY={{ md: 12, xs: 8 }} maxWidth={1216}>
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
              LXDAO Members
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              lineHeight="30px"
              color="#667085"
              marginTop={4}
            >
              Welcome to Join Us, let's buidl more valuable Web3 products
              together!
            </Typography>
          </Box>
          <Link
            href={`/onboarding/intro`}
            color="#ffffff"
            sx={{
              textDecoration: 'none',
            }}
          >
            <Button variant="gradient" width="200px" marginBottom={2}>
              JOIN US
            </Button>
          </Link>
        </Box>
        <Box display="flex" flexDirection="column" gap="24px">
          <Box display="flex" gap="10px" alignItems="center">
            <DebouncedInput
              value={search}
              onChange={(value) => {
                setPage(0);
                setSearch(value);
                searchList(value, role, memberStatus);
              }}
              label="Search"
              placeholder="Search members"
            />
          </Box>
          <Box display="flex" gap="16px">
            <SingleSelect
              value={role}
              label="Role"
              dropdown={['All', ...Object.values(BuilderRole)]}
              onChange={(value) => {
                setPage(0);
                setRole(value);
                searchList(search, value, memberStatus);
              }}
            />
            <SingleSelect
              value={memberStatus}
              label="Member Status"
              dropdown={memberStatusNames}
              onChange={(value) => {
                setPage(0);
                setMemberStatus(value);
                searchList(search, role, value);
              }}
            />
          </Box>
        </Box>

        <Box
          marginTop={10}
          display={loading ? 'flex' : 'none'}
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
        <Box marginTop={6.25} display={loading ? 'none' : 'block'}>
          {list.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              alignItems="center"
              paddingY={4}
            >
              <img width="80px" src="/icons/no-records.png" />
              <Typography marginTop={4} color="#D0D5DD" fontSize="16px">
                No builders found with the search criteria
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: '16px',
                        color: '#666F85',
                        fontWeight: 400,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: '16px',
                        color: '#666F85',
                        fontWeight: 400,
                      }}
                    >
                      Self-Introduction
                    </TableCell>
                    {/* 桌面端显示“Joined Since”，移动端隐藏 */}
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: '16px',
                        color: '#666F85',
                        fontWeight: 400,
                        width: '200px',
                        display: { xs: 'none', md: 'table-cell' },
                      }}
                    >
                      Joined Since
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: '16px',
                        color: '#666F85',
                        fontWeight: 400,
                      }}
                    >
                      Compensation
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        <MemberBasicInfo
                          avatar={member?.avatar}
                          name={member?.name}
                          address={member?.address}
                          status={member?.status}
                          badges={member?.badges}
                          contacts={member?.contacts}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box display="flex" flexWrap="wrap">
                          {member.description}
                        </Box>
                      </TableCell>
                      {/* 桌面端显示“Joined Since”，移动端隐藏 */}
                      <TableCell
                        align="left"
                        sx={{
                          display: { xs: 'none', md: 'table-cell' },
                        }}
                      >
                        {format(new Date(member?.createdAt), 'yyyy-MM-dd')}
                      </TableCell>
                      <TableCell align="left">
                        <Box>
                          {totalLXPoints(member) !== 0 && (
                            <Typography
                              sx={{
                                color: '#101828',
                                fontSize: '16px',
                                fontWeight: 700,
                              }}
                            >{`${totalLXPoints(member)}`}</Typography>
                          )}
                          {totalStableCoins(member) !== 0 && (
                            <Typography
                              sx={{
                                color: '#101828',
                                fontSize: '16px',
                                fontWeight: 700,
                              }}
                            >{`${totalStableCoins(member)}`}</Typography>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {list.length && (
                  <TableFooter>
                    {list.length > 0 ? (
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            10,
                            25,
                            50,
                            { label: 'All', value: pagination.total },
                          ]}
                          count={pagination?.total}
                          rowsPerPage={rowsPerPage}
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
                )}
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </Layout>
  );
}
