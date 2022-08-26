/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { getDefaultWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  useSignMessage,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import API from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';

import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.rinkeby],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'LXDAO Official Website',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const ConnectWalletButton = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const { data, signMessage } = useSignMessage();

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (address && !currentAccessToken) {
      API.get(`/buidler/nonce/${address}`).then(({ data }) => {
        const signatureMessage = data?.data?.signature_message;
        if (signatureMessage) {
          signMessage({
            message: signatureMessage,
          });
        }
      });
    }
  }, [isConnected]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    function signIn(signature) {
      API.post(`/auth/signin`, {
        address: address,
        signature: signature,
      })
        .then(({ data }) => {
          const accessToken = data?.data?.access_token;
          if (accessToken) {
            setLocalStorage('accessToken', accessToken);
          }
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    }
    if (data && !currentAccessToken) {
      signIn(data);
    }
  }, [data]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (isDisconnected && currentAccessToken) {
      removeLocalStorage('accessToken');
    }
  }, [isDisconnected]);

  return (
    <ConnectButton
      showBalance={false}
      chainStatus="none"
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}
    />
  );
};

export { wagmiClient, chains, ConnectWalletButton };
