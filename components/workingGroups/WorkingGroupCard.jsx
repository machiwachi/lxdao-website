import { Box, Link, Typography } from '@mui/material';

export default function WorkingGroupCard({ data, width }) {
  const normalMembers = data?.membersInWorkingGroup?.filter(
    (member) => !member?.role?.includes('Working Group Leader')
  );
  const leader = data?.membersInWorkingGroup?.filter((member) =>
    member?.role?.includes('Working Group Leader')
  );
  return (
    <Link
      href={`/workingGroups/${data?.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        borderRadius: '5px',
        border: '0.5px solid #D0D5DD',
        width: width || '384px',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${data?.bannerURI})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '5px 5px 0 0',
        }}
        width="100%"
        height="160px"
      />
      <Box padding="16px 24px" textAlign="left">
        <Typography
          color="#101828"
          fontSize="16px"
          fontWeight={600}
          marginBottom="16px"
        >
          {data?.name}
        </Typography>
        <Typography
          color="#666F85"
          fontSize="16px"
          fontWeight={400}
          lineHeight="24px"
          marginBottom="16px"
          maxHeight={'100px'}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {data?.shortDescription}
        </Typography>
        <Typography
          color="#101828"
          fontSize="16px"
          fontWeight={600}
          marginBottom="16px"
        >
          Members
        </Typography>
        <Box display="flex" gap="10px" overflow="hidden">
          {leader &&
            leader.map((member, index) => (
              <Link
                sx={{
                  border: '0.5px solid #d0d5dd',
                  borderRadius: '2px',
                  width: '60px',
                  height: '60px',
                  position: 'relative',
                }}
                target="_blank"
                href={`/buidlers/${member?.member?.address}`}
                key={index}
              >
                <Box
                  component="img"
                  src={member?.member?.avatar}
                  alt="avatar"
                  style={{
                    width: '59px',
                    height: '59px',
                  }}
                />
                <Typography
                  position="absolute"
                  sx={{
                    right: 0,
                    bottom: 0,
                    fontSize: '10px',
                    lineHeight: '12px',
                    color: '#fff',
                    background: '#36AFF9',
                    width: '28px',
                    zIndex: 3,
                    textAlign: 'center',
                  }}
                >
                  Lead
                </Typography>
              </Link>
            ))}
          {normalMembers &&
            normalMembers.map((member, index) => (
              <Link
                sx={{
                  border: '0.5px solid #d0d5dd',
                  borderRadius: '2px',
                  width: '60px',
                  height: '60px',
                  position: 'relative',
                }}
                target="_blank"
                href={`/buidlers/${member?.member?.address}`}
                key={index}
              >
                <Box
                  component="img"
                  src={member?.member?.avatar}
                  alt="avatar"
                  style={{
                    width: '59px',
                    height: '59px',
                  }}
                />
              </Link>
            ))}
        </Box>
      </Box>
    </Link>
  );
}
