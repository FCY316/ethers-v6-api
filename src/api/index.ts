import {
  addCustomChainF,
  checkChainSupportF,
  connectedWalletF,
  getBalanceF,
  switchoverChainF,
  transferAccountsF,
  listenerTransferF,
  transferDaiAccountsF,
  getBlockHeightF,
  getNonceF,
  sigMessageF,
  addTokenContractF
} from "./walletApi";
import {  watchWalletAddressF,
  watchWalletNetworkF} from './watch'
const apiWb3 = {
  // 连接钱包
  connectedWalletF,
  // 查主网币余额
  getBalanceF,
  // 切换链不同的网络
  switchoverChainF,
  // 检测用户当前在那条链上
  checkChainSupportF,
  // 添加链但也有切换链功能
  addCustomChainF,
  // 监听钱包网络
  watchWalletNetworkF,
  // 监听钱包地址变化
  watchWalletAddressF,
  // 主网币转账
  transferAccountsF,
  // 监听交易是否成功
  listenerTransferF,
  // 代币转账
  transferDaiAccountsF,
  // 查询当前块高
  getBlockHeightF,
  // 获取nonce
  getNonceF,
  // 签名消息
  sigMessageF,
  // 添加代币合约到钱包
  addTokenContractF
};

export default apiWb3;
