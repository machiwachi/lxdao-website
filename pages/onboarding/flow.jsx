import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Link,
} from '@mui/material';
import OnBoardingLayout from '@/components/OnBoardingLayout';

export default function Flow() {
  const data = [
    {
      icon: '/icons/onboarding/IDEA.svg',
      title: 'IDEA',
      content: 'Share or join the discussion on ideas',
    },
    {
      icon: '/icons/onboarding/PROPOSAL.svg',
      title: 'PROPOSAL',
      content: 'Brainstorm and polish the idea and turn it intoi a proposal.',
    },
    {
      icon: '/icons/onboarding/VOTE.svg',
      title: 'VOTE',
      content: 'Vote for the porposal.',
    },
    {
      icon: '/icons/onboarding/BUIDL.svg',
      title: 'BUIDL',
      content: 'Assemble the team to work on it ',
    },
    {
      icon: '/icons/onboarding/REWARDS.svg',
      title: 'REWARDS',
      content: 'Share the rewards',
    },
  ];
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="HOW DOES LXDAO WORKS?"
      back="/onboarding/intro"
      next="/onboarding/flow"
    >
      <Container
        sx={{
          display: 'flex',
          mt: '64px',
          mb: '60px',
          overflow: 'scroll',
          justifyContent: 'space-between',
        }}
      >
        {data.map((value, index) => (
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
              }}
            >
              <Card
                sx={{
                  width: 224,
                  height: 280,
                  border: '0.5px solid #D0D5DD',
                  borderRadius: '6px',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ paddingTop: '40px', paddingX: '11' }}>
                  <Box component={'img'} src={value.icon} />
                  <Typography
                    fontWeight={800}
                    variant="subtitle1"
                    mt="43px"
                    lineHeight="24px"
                  >
                    <span style={{ color: '#36AFF9' }}>
                      {'0' + (index + 1) + ' '}
                    </span>
                    {value.title}
                  </Typography>
                  <Typography
                    color="#666F85"
                    variant="body1"
                    mt="16px"
                    textTransform="capitalize"
                  >
                    {value.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ))}
      </Container>
      <Link color="#101828">
        <Typography marginBottom="106px">Learn more →</Typography>
      </Link>
    </OnBoardingLayout>
  );
}
