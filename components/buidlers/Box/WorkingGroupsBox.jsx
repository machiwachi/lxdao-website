import { Box, Grid, Link, Typography } from '@mui/material';

import LXButton from '@/components/Button';
import WorkingGroupSimpleCard from '@/components/WorkingGroupSimpleCard';

export default function WorkingGroupsBox({ record }) {
  return (
    <Box marginTop={3} marginBottom={3}>
      <Box display="flex" alignItems="center" gap={1.5} marginBottom={2}>
        <Typography color="#101828" fontWeight="600" variant="body1">
          Working Group
        </Typography>
        <Box
          sx={{
            backgroundColor: '#FEF3F2',
            border: '1px solid #FEE4E2',
            borderRadius: '6px',
            padding: '4px 8px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Typography
            fontSize="12px"
            fontWeight="500"
            color="#B42318"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.3px' }}
          >
            Archive
          </Typography>
        </Box>
      </Box>
      <Box display="flex" marginTop={2}>
        {record?.workingGroups?.length ? (
          <Box width="100%">
            <Grid container spacing={3}>
              {record?.workingGroups?.length > 0 &&
                record?.workingGroups?.map((group, index) => {
                  return (
                    <WorkingGroupSimpleCard
                      key={index}
                      id={group?.workingGroup?.id}
                      role={group.role}
                      name={group?.workingGroup?.name}
                    />
                  );
                })}
            </Grid>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="148px"
            alignItems="center"
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            padding={2}
          >
            <Typography
              marginTop={{ xs: 0, sm: 2 }}
              marginBottom={{ xs: '16px', sm: '21px' }}
              color="#D0D5DD"
              variant="body1"
              fontWeight="400"
            >
              You haven&apos;t joined the workgroup, go and choose one to join
            </Typography>
            <LXButton size="small" variant="outlined">
              <Link
                href={`https://lxdao.notion.site/95fde886aef24c9ca63b8bae95fa8456`}
                target="_blank"
                sx={{
                  textDecoration: 'none',
                }}
              >
                View Working Group
              </Link>
            </LXButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
