import { provider, signer } from "./connectedWallet";
import { formatUnits, parseUnits } from "@/utils";
// 查询主网币余额
export const getBalanceF = async (address: string, decimals: number = 18) => {
    try {
      const balance = await provider.getBalance(address);
      return { value: formatUnits(balance, decimals), state: true };
    } catch (e) {
      return { e, state: false };
    }
  };
  // 查询当前块高
  export const getBlockHeightF = async () => {
    try {
      const blockNumber = await provider.getBlockNumber();
      return { value: blockNumber, state: true };
    } catch (e) {
      return { e, state: false };
    }
  };
  // 获取发送事务所需的下一个nonce
  export const getNonceF = async (address: string) => {
    try {
      const nonce = await provider.getTransactionCount(address);
      return { value: nonce, state: true };
    } catch (e) {
      return { e, state: false };
    }
  };
  // 签名消息
  export const sigMessageF = async (message: string) => {
    try {
      const sigMessage = await signer.signMessage(message);
      return { value: sigMessage, state: true };
    } catch (e) {
      return { e, state: false };
    }
  };
  // 发送交易(主网币)
  export const transferAccountsF = async (
    address: string,
    money: number,
    decimals: number = 18
  ) => {
    try {
      const tx = await signer.sendTransaction({
        to: address,
        value: parseUnits(money.toString(), decimals),
      });
      return { value: tx, state: true };
    } catch (e) {
      return { e, state: false };
    }
  };