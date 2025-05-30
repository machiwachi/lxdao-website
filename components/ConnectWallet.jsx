import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

import showMessage from '@/components/showMessage';

import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { mainnet, optimism, optimismSepolia, sepolia } from 'wagmi/chains';

import API, { refreshAPIToken } from '@/common/API';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/utils/utility';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Create a custom Sepolia chain with the specified RPC URL
const customSepolia = {
  ...sepolia,
  rpcUrls: {
    ...sepolia.rpcUrls,
    default: {
      http: ['https://sepolia.infura.io/v3/6959166847ff4ba499178f3d110c920f'],
    },
    public: {
      http: ['https://sepolia.infura.io/v3/6959166847ff4ba499178f3d110c920f'],
    },
  },
};

const wagmiConfig = getDefaultConfig({
  appName: 'LXDAO Official Website',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, optimism, optimismSepolia, customSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  infuraAPIKey: '6959166847ff4ba499178f3d110c920f',
});

const ConnectWalletButton = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: signature, signMessageAsync } = useSignMessage();
  const [retries, setRetries] = useState(0);
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
    let currentAccessToken = getLocalStorage('accessToken');
    // validate access token is jwt
    if (currentAccessToken) {
      try {
        const decoded = jwtDecode(currentAccessToken);
        if (decoded.exp < Date.now() / 1000) {
          throw new Error('access token expired');
        }
      } catch (err) {
        removeLocalStorage('accessToken');
        console.log('err', err);
        window.location.reload();
      }
    }
    if (isDisconnected && currentAccessToken && retries > 10) {
      removeLocalStorage('accessToken');
      refreshAPIToken();
    } else {
      if (isDisconnected && retries <= 10) setRetries(retries + 1);
    }
  }, [isDisconnected, retries]);

  useEffect(() => {
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
  }, [address, addressInfo]);

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

function jwtDecode(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}
