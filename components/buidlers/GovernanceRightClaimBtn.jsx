import { use, useState } from 'react';

import Button from '@/components/Button';
import showMessage from '@/components/showMessage';

import { waitForTransactionReceipt } from 'viem/actions';

import {
  useAccount,
  useClient,
  useReadContract,
  useWriteContract,
} from 'wagmi';

import { voteContract } from 'abi';

export default function GovernanceRightClaimBtn({ record }) {
  const { address } = useAccount();
  const client = useClient();
  const [loading, setLoading] = useState(false);
  const { data: currentSeason, error } = useReadContract({
    ...voteContract,
    functionName: 'currentSeason',
    args: [],
  });
  const { data: balanceOf } = useReadContract({
    ...voteContract,
    functionName: 'balanceOf',
    args: [address, currentSeason],
  });
  const { writeContractAsync, isError } = useWriteContract();
  const handleClaim = async () => {
    try {
      setLoading(true);
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
  if (record.address != address) {
    return null;
  }

  return (
    <Button
      variant={'gradient'}
      style={{
        textAlign: 'center',
      }}
      onClick={handleClaim}
      disabled={claimed || loading}
    >
      {loading
        ? 'Please Wait...'
        : claimed
          ? `Governance Right Claimed In S${currentSeason?.toString()}`
          : `Claim Governance Right In S${currentSeason?.toString()}`}
    </Button>
  );
}
