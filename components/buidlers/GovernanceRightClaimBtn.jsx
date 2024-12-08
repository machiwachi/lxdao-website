import Button from '@/components/Button';
import showMessage from '@/components/showMessage';

import { waitForTransactionReceipt } from 'viem/actions';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { voteContract } from 'abi';

export default function GovernanceRightClaimBtn({ record }) {
  const { address } = useAccount();
  const {
    data: currentSeason,
    error,
    isLoading,
  } = useReadContract({
    ...voteContract,
    functionName: 'currentSeason',
    args: [],
  });
  console.log({ currentSeason, error, isLoading });
  const { data: balanceOf } = useReadContract({
    ...voteContract,
    functionName: 'balanceOf',
    args: [address, currentSeason],
  });
  console.log({ balanceOf, currentSeason });
  const { writeAsync } = useWriteContract();
  const handleClaim = async () => {
    try {
      const tx = await writeAsync({
        ...voteContract,
        functionName: 'mint',
      });
      const res = await waitForTransactionReceipt(tx);
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
    }
  };
  const claimed = balanceOf > 0;
  if (record.address != address) {
    return null;
  }
  return (
    <Button
      variant="outlined"
      style={{
        textAlign: 'center',
      }}
      onClick={handleClaim}
      disabled={claimed}
    >
      {claimed
        ? `Governance Right Claimed In S${currentSeason?.toString()}`
        : `Claim Governance Right In S${currentSeason?.toString()}`}
    </Button>
  );
}
