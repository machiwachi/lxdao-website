import { Box, Link, Typography } from '@mui/material';

import Container from '@/components/Container';

export default function NewSectionConnections({
  twitterData = [],
  partnersData = [],
}) {
  return (
    <Box
      sx={{
        width: '100vw',
        background: `#C6F5F1`,
        position: 'relative',
        pt: '80px',
        pb: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        width="430px"
        src="/images/new/white.png"
        sx={{
          position: 'absolute',
          top: '76px',
          right: '-40px',
        }}
      />
      <Box
        position="relative"
        fontSize={{ md: '40px', xs: '28px' }}
        textAlign="center"
        fontWeight="700"
        width="fit-content"
      >
        <Box
          component="img"
          src="/images/new/quote-right.svg"
          sx={{
            position: 'absolute',
            width: { md: '30px', xs: '20px' },
            left: { md: '-80px', xs: '-20px' },
          }}
        />
        Heart from our community
        <Box
          component="img"
          src="/images/new/quote-left.svg"
          sx={{
            position: 'absolute',
            width: { md: '30px', xs: '20px' },
            top: { md: '40px', xs: '0px' },
            right: { md: '-90px', xs: '-20px' },
          }}
        />
      </Box>

      <Box
        width="100%"
        height="910px"
        sx={{
          overflow: 'scroll',
          top: '0',
          left: '0',
          mt: { md: '150px', xs: '30px' },
          ml: { xl: 'calc((100vw - Min(90vw, 1216px))/2)' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            flexWrap: 'wrap',
            gap: { md: '37px', xs: '20px' },
            height: '910px',
            px: '20px',
            maxWidth: '1216px',
          }}
        >
          {twitterData.map((item) => (
            <TweetCard key={item.id} item={item} />
          ))}
        </Box>
      </Box>
      <Container minHeight="910px">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            mt: '120px',
            width: '100%',
            justifyContent: { md: 'space-between', xs: 'center' },
            alignItems: { md: 'start', xs: 'center' },
          }}
        >
          <Box
            fontSize={{ md: '36px', xs: '28px' }}
            fontWeight="700"
            maxWidth={{ md: '280px', xs: '100%' }}
            textAlign={{ md: 'start', xs: 'center' }}
          >
            LXDAO Partners
          </Box>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mt={{ md: '0px', xs: '20px' }}
            maxWidth={{ md: '800px', xs: '100%' }}
            justifyContent={{ md: 'end', xs: 'center' }}
          >
            {partnersData.map((partner) => {
              return (
                <Link href={partner.link} target="_blank" key={partner.name}>
                  <Box component={'img'} src={partner.logo} />
                </Link>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { md: '96px', xs: '20px' },
            mt: { md: '120px', xs: '60px' },
            maxWidth: '1218px',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(135deg, #2975DF 0%, #32A5E1 50%, #3ACFE3 100%)',
            borderRadius: '24px',
            padding: { md: '120px 100px', xs: '60px 40px' },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: '48px', xs: '32px' },
              fontWeight: '700',
              color: 'white',
            }}
          >
            Support LXDAO
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography color="white" maxWidth="420px">
              The problem we try to tackle at LXDAO requires long-term
              endeavors. We have been here for two years, yet still need support
              for the future works to happen.
              <br />
              <br />
              If you agree with our ideas, please support us for a longer
              runway.
            </Typography>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: '24px',
                width: '240px',
                mt: { md: '0px', xs: '40px' },
                height: 'fit-content',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                  textAlign: 'center',
                  py: '18px',
                  bgcolor: 'white',
                  width: '240px',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  backgroundImage:
                    'linear-gradient(to right, #2975DF, #32A5E1, #3ACFE3)',
                }}
              >
                <Box
                  sx={{
                    fontSize: '22px',
                    fontWeight: 700,
                    py: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.open(
                      'https://lxdao.notion.site/Two-Years-of-DAO-From-Nearly-Depleted-Treasury-to-Community-Envisioning-the-Decade-Ahead-286dceffe40b8013ae5fd1d232b4accd?pvs=74',
                      '_blank'
                    );
                  }}
                >
                  Support Guide
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TweetCard({ item }) {
  return (
    <Box
      width="280px"
      sx={{
        p: '47px 34px',
        background: 'white',
        borderRadius: '20px',
        zIndex: 100,
        cursor: 'pointer',
      }}
      onClick={() => {
        const maybeId = String(item?.id || '').match(/\d{15,21}/)?.[0];
        if (maybeId) {
          window.open(`https://x.com/i/status/${maybeId}`, '_blank');
        }
      }}
    >
      <Box
        sx={{
          wordWrap: 'break-word',
        }}
      >
        {item?.text}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          mt: '48px',
        }}
      >
        <Box
          width="40px"
          height="40px"
          component="img"
          src={item?.profile}
          sx={{
            borderRadius: '50%',
          }}
        ></Box>
        <Box>
          <Box>{item?.user_name}</Box>
          <Box
            sx={{
              fontSize: '12px',
            }}
          >
            {item?.user_handler}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
