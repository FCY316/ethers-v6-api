import { walletDownloadListType, walletNameListType } from "@/interface";

// 钱包是否存在参数列表
export const walletNameListShow: walletNameListType = {
  MetaMask: "ethereum",
  BitKeep: "bitkeep.ethereum",
  TokenPocket: "ethereum.isTokenPocket",
};
// 钱包连接列表
export const walletNameList: walletNameListType = {
  MetaMask: "ethereum",
  BitKeep: "bitkeep.ethereum",
  TokenPocket: "ethereum",
};
// 钱包下载地址列表
export const download: walletDownloadListType = {
  MetaMask: "https://metamask.io/",
  BitKeep: "https://bitkeep.com/en/download?type=2",
  TokenPocket: "https://extension.tokenpocket.pro/#/",
};
