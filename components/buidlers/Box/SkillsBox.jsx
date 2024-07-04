import { Box, Typography } from '@mui/material';
import Skills from '@/components/Skills';
import Tag from '@/components/Tag';

export default function SkillsBox({ record }) {
  return (
    <Box flex="1 1" marginTop={3}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        <Box
          border="0.5px solid #D0D5DD"
          borderRadius="6px"
          padding="22px 17px 26.66px 31px"
        >
          <Box display="flex" justifyContent="space-between">
            <Typography
              fontWeight="600"
              variant="body1"
              marginBottom={2}
              display="inline-block"
            >
              Skills
            </Typography>
            <Box display="inline-block">
              <Typography
                fontWeight="400"
                variant="body2"
                display="inline-block"
              >
                <Box
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  display="inline-block"
                  marginRight={1}
                  marginLeft={1}
                  sx={{ background: '#009FFF' }}
                ></Box>
                Senior
              </Typography>
              <Typography
                fontWeight="400"
                variant="body2"
                display="inline-block"
              >
                <Box
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  display="inline-block"
                  marginRight={1}
                  marginLeft={1}
                  sx={{ background: 'rgba(0,159,255,0.7)' }}
                ></Box>
                Intermediate
              </Typography>
              <Typography
                fontWeight="400"
                variant="body2"
                display="inline-block"
              >
                <Box
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  display="inline-block"
                  marginRight={1}
                  marginLeft={1}
                  sx={{ background: 'rgba(0,159,255,0.4)' }}
                ></Box>
                Junior
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <Skills skills={record.skills} />
          </Box>
        </Box>
        <Box
          border="0.5px solid #D0D5DD"
          borderRadius="6px"
          padding="22px 17px 26.66px 31px"
          sx={{ height: '100%' }}
        >
          <Box>
            <Typography
              fontWeight="600"
              variant="body1"
              marginBottom={2}
              display="inline-block"
            >
              Interests
            </Typography>
          </Box>
          <Box display="flex" flexWrap="wrap">
            {record.interests.map((item) => {
              return (
                <Tag
                  background="rgba(255,184,0,0.1)"
                  color="#FFB800"
                  key={item}
                  text={item}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
