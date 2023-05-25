import { erc20Contract } from "./connectedWallet";
import { MaxUint256, formatUnits, parseUnits } from "@/utils";
// 发送代币
export const transferDaiAccountsF = async (
  address: string,
  money: number,
  decimals: number = 18
) => {
  if (!erc20Contract) return { e: "您并未实例化erc20", state: false };
  try {
    const tx = await erc20Contract.transfer(
      address,
      parseUnits(money.toString(), decimals)
    );
    return { value: tx, state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 查看代币余额
export const getBalanceDaiAccountsF = async (
  address: string,
  decimals: number = 18
) => {
  if (!erc20Contract) return { e: "您并未实例化erc20", state: false };
  try {
    const balance = await erc20Contract.balanceOf(address);
    return { value: formatUnits(balance, decimals), state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 查询用户授权额度
export const getAuthorizationF = async (
  address: string,
  contractAddress: string,
  decimals: number = 18
) => {
  if (!erc20Contract) return { e: "您并未实例化erc20", state: false };
  try {
    const limit = await erc20Contract.allowance(address, contractAddress);
    return { value: formatUnits(limit, decimals), state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 授权
export const approveF = async (
  stakingAddress: string,
  limit?: number,
  decimals: number = 18
) => {
  if (!erc20Contract) return { e: "您并未实例化erc20", state: false };
  try {
    const authorization = limit
      ? parseUnits(limit.toString(), decimals)
      : MaxUint256;
    const res = await erc20Contract.approve(stakingAddress, authorization);
    return { value: res, state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 获取代币的精度
export const getDecimalsF = async () => {
  if (!erc20Contract) return { e: "您并未实例化erc20", state: false };
  try {
    const decimals = await erc20Contract.decimals();
    return { value: decimals.toString(), state: true };
  } catch (e) {
    console.log("e", e);

    return { e, state: false };
  }
};
// 获取代币符号
export const getTokenSymbolF = async () => {
  if (!erc20Contract) return { e: "您并未实例化erc20", state: false };
  try {
    const symbol = await erc20Contract.symbol();
    return { value: symbol, state: true };
  } catch (e) {
    return { e, state: false };
  }
};
