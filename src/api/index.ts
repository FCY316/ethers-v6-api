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
  addTokenContractF,
  getBalanceDaiAccountsF,
  getAuthorizationF,
  approveF,
  getDecimalsF,
  getTokenSymbolF,
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
  addTokenContractF,
  // 查询代币余额
  getBalanceDaiAccountsF,
  // 查询用户授权额度
  getAuthorizationF,
  // 合约授权
  approveF,
  // 获取精度
  getDecimalsF,
  // 获取代币符号
  getTokenSymbolF
};

export default apiWb3;
