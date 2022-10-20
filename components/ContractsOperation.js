import contractABI from '@/abi.json';

export const contractInfo = () => {
  return {
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractABI,
  };
};
