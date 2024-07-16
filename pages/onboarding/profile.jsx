import React, { useState } from 'react';

import { useRouter } from 'next/router';

import ProfileForm from '@/components/ProfileForm';
import OnBoardingLayout from '@/components/onboarding/OnBoardingLayout';
import showMessage from '@/components/showMessage';
import useBuidler from '@/components/useBuidler';

import { useAccount } from 'wagmi';

import API from '@/common/API';

import _ from 'lodash';

export default function Profile() {
  const { address } = useAccount();
  const [, record, , refresh] = useBuidler(address);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const saveProfileHandler = async (newMetaData) => {
    setUpdating(true);
    const userProfile = {
      ...newMetaData,
      role: record?.role.length === 0 ? ['Buidler'] : record?.role,
      // set the NFT image
      image: `${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record?.address}/card`,
    };
    try {
      const response = await API.put(`/buidler/${address}`, {
        metaData: userProfile,
      });
      const result = response?.data;
      try {
        API.get(`/email/sendEmailAfterApplyMember?address=${address}`);
      } catch (err) {
        console.log('邮件发送失败');
      }
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      }
      refresh();
      router.push(`/buidlers/${address}?isFromOnboarding=true`);
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to update profile',
        body: err.message,
      });
    }
    setUpdating(false);
  };

  return (
    <OnBoardingLayout
      title="Learning about you"
      back="/onboarding/intro"
      next={`/buidlers/xxxxx?onboarding=true`}
      disableNext={!record?.name}
      currentStep={2}
      hideButton={true}
    >
      {(address && address === record?.address) ||
      (address && !record?.name) ? (
        <ProfileForm
          updating={updating}
          innerContainerStyle={{
            maxWidth: '888px',
            marginBottom: '48px',
            border: '0.5px solid #D0D5DD',
            borderRadius: '12px',
            padding: '24px 40px',
          }}
          isOnboardingProcess={true}
          backUrl="/onboarding/intro"
          values={_.cloneDeep(
            _.pick(record, [
              'avatar',
              'name',
              'description',
              'skills',
              'interests',
              'contacts',
              'privateContacts',
            ])
          )}
          saveProfileHandler={saveProfileHandler}
        />
      ) : (
        <div style={{ color: 'red', textAlign: 'center' }}>
          Please connect your wallet first (no gas fee).
        </div>
      )}
    </OnBoardingLayout>
  );
}
