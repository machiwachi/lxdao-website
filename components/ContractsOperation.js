import contractABI from '@/abi.json';

export const contractInfo = () => {
  return {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractABI,
  };
};
