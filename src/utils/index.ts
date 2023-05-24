import { ethers } from "ethers";
export const formatEtherF = (value: any) => {
  const result = ethers.formatEther(value);
  return result
};
