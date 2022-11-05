/* eslint-disable no-undef */
import React, { useRef, useEffect } from 'react';
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

import API, { refreshAPIToken } from '@/common/API';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/utils/utility';
import showMessage from '@/components/showMessage';

import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
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
      const nonce = nonceRes.data?.data?.nonce;
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
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}
    />
  );
};

export { wagmiClient, chains, ConnectWalletButton };
