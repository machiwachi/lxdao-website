import { Typography } from '@mui/material';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import OnBoardingBottom from '@/components/OnBoardingBottom';

export default function OnBoardingLayout({
  children,
  title,
  desc,
  back,
  next,
  disableNext,
}) {
  return (
    <Layout>
      <Container paddingY={{ md: 12, xs: 8 }} maxWidth={1216}>
        <Typography
          color="#666F85"
          variant="subtitle1"
          fontFamily="Inter"
          sx={{ fontWeight: 400 }}
        >
          {title}
        </Typography>
        <Typography
          variant="h2"
          lineHeight="70px"
          mt="24px"
          textTransform="uppercase"
          sx={{ fontWeight: 800 }}
        >
          {desc}
        </Typography>
        {children}
        <OnBoardingBottom back={back} next={next} disableNext={disableNext} />
      </Container>
    </Layout>
  );
}
