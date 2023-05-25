import { ethers } from "ethers";
// 将BigNumber 转换为普通数
export const formatUnits = (value: string, decimals: number = 18) => {
  const result = ethers.formatUnits(value, decimals);
  return result;
};
// 将普通数转换为BigNumber
export const parseUnits = (value: string, decimals: number = 18) => {
  const result = ethers.parseUnits(value, decimals);
  return result;
};
// 一般用于授权额度，最大额度
export const MaxUint256 = ethers.MaxUint256;
