import OnBoardingLayout from '@/components/OnBoardingLayout';

export default function Follow() {
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="How a buddy can help you?"
      back="/onboarding/flow"
      next="/onboarding/profile"
    ></OnBoardingLayout>
  );
}
