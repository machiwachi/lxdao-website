import { useState } from 'react';

import Button from '@/components/Button';
import showMessage from '@/components/showMessage';

import { waitForTransactionReceipt } from 'viem/actions';

import {
  useAccount,
  useClient,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from 'wagmi';

import { voteContract } from 'abi';

export default function GovernanceRightClaimBtn({ record }) {
  const { address, chainId } = useAccount();
  const client = useClient();
  const { switchChainAsync } = useSwitchChain();
  const [loading, setLoading] = useState(false);
  const { data: currentSeason } = useReadContract({
    ...voteContract,
    functionName: 'currentSeason',
    args: [],
  });

  // Per discussion w/ 0xhardman, to avoid user who has claimed that has to be claimed again. -wachi 2025/10/18
  const season = new Date().getFullYear();

  const { data: balanceOf } = useReadContract({
    ...voteContract,
    functionName: 'balanceOf',
    args: [address, currentSeason],
  });
  const { writeContractAsync } = useWriteContract();
  const handleClaim = async () => {
    try {
      setLoading(true);
      if (chainId !== voteContract.chainId) {
        await switchChainAsync({
          chainId: voteContract.chainId,
        });
      }
      const tx = await writeContractAsync({
        ...voteContract,
        functionName: 'mint',
      });
      console.log({ tx });
      const res = await waitForTransactionReceipt(client, { hash: tx });
      showMessage({
        type: 'success',
        title: 'Governance Right Claimed',
        body: `Transaction hash: ${res.transactionHash}`,
      });
    } catch (error) {
      showMessage({
        type: 'error',
        title: 'Failed to claim governance right',
        body: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const claimed = balanceOf > 0;
  if (record.address !== address) {
    return null;
  }

  return (
    <Button
      variant="gradient"
      style={{
        textAlign: 'center',
      }}
      onClick={handleClaim}
      disabled={claimed || loading}
    >
      {loading
        ? 'Please Wait...'
        : claimed
          ? `Governance Right Claimed In ${season}`
          : `Claim Governance Right In ${season}`}
    </Button>
  );
}
