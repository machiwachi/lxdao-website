import OnBoardingLayout from '@/components/OnBoardingLayout';

export default function Profile() {
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="How a buddy can help you?"
      back="/onboarding/profile"
      next="done"
    ></OnBoardingLayout>
  );
}
