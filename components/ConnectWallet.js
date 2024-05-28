import React, { useRef, useEffect } from 'react';
import { getDefaultWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createConfig,
  useAccount,
  useSignMessage,
  useDisconnect,
} from 'wagmi';
import { mainnet, goerli, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import API, { refreshAPIToken } from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';
import showMessage from '@/components/showMessage';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'LXDAO Official Website',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
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

export { wagmiConfig, chains, ConnectWalletButton };
