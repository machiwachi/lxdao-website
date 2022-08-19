import React, { useState, useEffect } from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
  useSignMessage,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import axios from 'axios';

import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
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
  const { address, isConnected } = useAccount();
  const { data, signMessage } = useSignMessage();

  useEffect(() => {
    if (address) {
      axios
        .get(`http://localhost:3001/buidler/nonce/${address}`)
        .then(({ data }) => {
          const signatureMessage = data?.data?.signature_message;
          console.log('signatureMessage: ', signatureMessage);
          if (signatureMessage) {
            signMessage({
              message: signatureMessage,
            });
          }
        });
    }
  }, [isConnected]);

  useEffect(() => {
    if (data) {
      signIn(data);
    }
  }, [data]);

  const signIn = (signature) => {
    axios
      .post(`http://localhost:3001/auth/signin`, {
        address: address,
        signature: signature,
      })
      .then(({ data }) => {
        const accessToken = data?.data?.access_token;
        if (accessToken) {
          window.localStorage.setItem('accessToken', accessToken);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

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
