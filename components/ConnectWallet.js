/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Link, Box } from '@mui/material';
import { getDefaultWallets, ConnectButton } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  useSignMessage,
  useDisconnect,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import API from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';
import showMessage from '@/components/showMessage';

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
  const [preAddress, setPreAddress] = useState(address);
  const { disconnect } = useDisconnect();
  const { data, signMessage } = useSignMessage();

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
    if (address && !currentAccessToken) {
      setPreAddress(address);
      handleSignature(address);
    }
  }, [isConnected]);

  useEffect(() => {
    const currentAccessToken = getLocalStorage('accessToken');
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

  useEffect(() => {
    if (preAddress && preAddress !== address) {
      removeLocalStorage('accessToken');
      setPreAddress(address);
      handleSignature(address);
    }
  }, [address]);

  const handleSignature = (address) => {
    API.get(`/buidler/${address}/nonce`)
      .then(({ data }) => {
        const signatureMessage = data?.data?.signature_message;
        const nonce = data?.data?.nonce;
        // no builder record in DB
        if (!nonce) {
          showMessage({
            type: 'error',
            title: 'Cannot find your LXDAO builder record',
            body: (
              <Box>
                It seems you are not a LXDAO buidler, welcome to{' '}
                <Link marginBottom={2} target="_blank" href={`/joinus`}>
                  join us
                </Link>
                . Let&apos;s buidler a better Web3 together!
              </Box>
            ),
          });
          disconnect();
        } else if (signatureMessage) {
          signMessage({
            message: signatureMessage,
          });
        }
      })
      .catch((err) => {
        showMessage({
          type: 'error',
          title: 'Failed to sign-in',
          body: err.message,
        });
        disconnect();
      });
  };

  const signIn = (signature) => {
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
        showMessage({
          type: 'error',
          title: 'Failed to sign-in',
          body: err.message,
        });
        disconnect();
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
