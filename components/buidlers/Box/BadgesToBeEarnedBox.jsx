import { Box, Typography } from '@mui/material';
import BadgeCard from '@/components/BadgeCard';

export default function BadgesToBeEarnedBox({ record, address }) {
  return (
    <Box
      sx={{
        border: '0.5px solid #D0D5DD',
        borderRadius: '6px',
        padding: '30px',
        marginBottom: '24px',
      }}
    >
      <Typography
        sx={{
          fontSize: '16x',
          fontWeight: 800,
          color: '#101828',
          marginBottom: '15px',
        }}
      >
        Badges to be earned
      </Typography>
      <Box display="flex" gap="15px" flexDirection="column">
        {record?.badges &&
          record?.badges.map((badge, index) => {
            if (badge?.id === 'MemberFirstBadge') {
              badge.linkText = 'Earn now';
              badge.linkUrl = '/firstBadge';
            }
            return badge.amount === 0 ? (
              <BadgeCard
                key={index}
                {...badge}
                isOneself={record.address === address}
              />
            ) : null;
          })}
        {(record?.status === 'PENDING' || record?.status === 'READYTOMINT') && (
          <BadgeCard
            isOneself={record.address === address}
            image={`/images/card.png`}
            name="Buidler card (SBT)"
            description="Governance rights entitled"
            eligible="Eligibility: Contribute in projects or working groups to earn up to 500 LXU reward."
            linkText="Contribute to earn"
            linkUrl="/SBTCard"
          />
        )}
      </Box>
    </Box>
  );
}
