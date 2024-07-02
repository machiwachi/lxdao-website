import React, { useRef, useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

import API, { refreshAPIToken } from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';
import showMessage from '@/components/showMessage';

const wagmiConfig = getDefaultConfig({
  appName: 'LXDAO Official Website',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const ConnectWalletButton = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: signature, signMessageAsync } = useSignMessage();
  const addressInfo = useRef({ address });

  useEffect(() => {
    (async () => {
      if (isConnected) {
        const currentAccessToken = getLocalStorage('accessToken');
        if (address && !currentAccessToken) {
          await handleNonce(address);
        }
      }
    })();
  }, [isConnected]);

  useEffect(() => {
    (async () => {
      const currentAccessToken = getLocalStorage('accessToken');
      if (signature && !currentAccessToken) {
        await signIn(signature);
      }
    })();
  }, [signature]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (isDisconnected && currentAccessToken) {
      removeLocalStorage('accessToken');
      refreshAPIToken();
    }
  }, [isDisconnected]);

  useEffect(() => {
    (async () => {
      if (
        addressInfo.current.address &&
        addressInfo.current.address !== address
      ) {
        removeLocalStorage('accessToken');
        refreshAPIToken();
        disconnect();
        addressInfo.current.address = undefined;
        window.location.reload();
      }
    })();
  }, [address]);

  const handleNonce = async () => {
    try {
      const nonceRes = await API.get(`/buidler/${address}/nonce`);
      const signatureMessage = nonceRes.data?.data?.signature_message;
      if (signatureMessage) {
        await signMessageAsync({
          message: signatureMessage,
        });
      }
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to sign-in',
        body: err.message,
      });
      disconnect();
    }
  };

  const signIn = async (signature) => {
    try {
      const signinRes = await API.post(`/auth/signin`, {
        address: address,
        signature: signature,
      });

      const accessToken = signinRes.data?.data?.access_token;
      setLocalStorage('accessToken', accessToken);
      refreshAPIToken();
      addressInfo.current.address = address;
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to sign-in',
        body: err.message,
      });
      disconnect();
    }
  };

  return (
    <ConnectButton
      showBalance={false}
      chainStatus="none"
      accountStatus="address"
    />
  );
};

export { wagmiConfig, ConnectWalletButton };
