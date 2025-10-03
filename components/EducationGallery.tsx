import { Box, Typography } from '@mui/material';

export interface EducationEventItem {
  title: string;
  date: string;
  location: string;
  img: string;
}

export default function EducationGallery({
  items = [] as EducationEventItem[],
}) {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'scroll',
        mt: { md: '120px', xs: '60px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          width: 'fit-content',
          borderRadius: '24px',
          ml: 'calc((100vw - Min(90vw, 1216px))/2)',
          backgroundColor: '#CEE8F8',
          padding: '12px',
        }}
      >
        {items.map(({ title, date, location, img }) => (
          <Box
            key={`${title}-${date}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              width: '300px',
              height: '400px',
              color: 'white',
              borderRadius: '20px',
              padding: '10px 20px',
              backgroundSize: 'cover',
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent),url(${img})`,
            }}
          >
            <Typography fontSize="16px" fontWeight="600">
              {title}
            </Typography>
            <Box display="flex" justifyContent="space-between" minHeight="30px">
              <Typography fontSize="12px">{date}</Typography>
              <Typography fontSize="12px" textAlign="end">
                {location}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
