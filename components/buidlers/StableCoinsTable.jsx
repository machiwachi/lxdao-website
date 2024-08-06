import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import { getOpEtherScanDomain } from '@/utils/utility';

export default function StableCoinsTable({ points }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        '&.MuiPaper-root': {
          overflowX: 'unset',
        },
        boxShadow: 'none',
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingLeft: 0 }} width="15%" align="left">
              <Typography color="#666F85" variant="body2" fontWeight="400">
                Remuneration
              </Typography>
            </TableCell>
            <TableCell width="20%" align="left">
              <Typography color="#666F85" variant="body2" fontWeight="400">
                Reason
              </Typography>
            </TableCell>
            <TableCell width="15%" align="left">
              <Typography color="#666F85" variant="body2" fontWeight="400">
                Source
              </Typography>
            </TableCell>
            <TableCell width="15%" align="left">
              <Typography
                sx={{
                  width: '89px',
                }}
                color="#666F85"
                variant="body2"
                fontWeight="400"
              >
                Release Time
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingRight: 0 }} width="15%" align="right">
              <Typography
                sx={{
                  width: '110px',
                }}
                color="#666F85"
                variant="body2"
                fontWeight="400"
              >
                Transaction Link
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {points.map((point) => {
            let pointStatus = point.status;
            if (point.status === 'RELEASED') {
              pointStatus = point.updatedAt.split('T')[0];
            } else if (point.status !== 'REJECTED') {
              pointStatus = 'PENDING';
            }
            return (
              <TableRow
                key={point.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: '0.5px solid #E5E5E5',
                }}
              >
                <TableCell
                  sx={{ color: '#101828', paddingLeft: 0 }}
                  component="th"
                  scope="row"
                >
                  <Typography variant="body1" fontWeight="600">
                    {`${point.value?.toFixed(2)} U`}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: '#101828' }} align="left">
                  <Tooltip title={point.reason}>
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: { xs: '150px', sm: '300px' },
                      }}
                      variant="body2"
                      fontWeight="400"
                    >
                      {point.reason}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ color: '#101828' }} align="left">
                  {point.source}
                </TableCell>
                <TableCell sx={{ color: '#101828' }} align="left">
                  <Typography
                    sx={{
                      width: '89px',
                    }}
                    variant="body2"
                    fontWeight="400"
                  >
                    {pointStatus}
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingRight: 0 }} align="right">
                  <Link
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                    href={`https://${getOpEtherScanDomain()}/tx/${point.hash}`}
                  >
                    <Typography
                      sx={{
                        width: '110px',
                      }}
                      color="#36AFF9"
                      variant="body1"
                      fontWeight="400"
                    >
                      {point.status === 'RELEASED' && 'View'}
                    </Typography>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
