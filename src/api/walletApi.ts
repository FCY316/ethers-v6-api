import { ethers } from "ethers";
import { download, walletNameList, walletNameListShow } from "./walletName";
import { addCustomChainType, addTokenContractType } from "@/interface";
const erc20 = require("@/abi/erc20.json");
// 区块链的只读连接
let provider: any = null;
// 包装与帐户交互的所有操作
let signer: any = null;
// erc20new出来的实例对象
let erc20Contract: any = null;
// 连接钱包
export const connectedWalletF = async (
  walletName: string,
  contractAddress?: string
) => {
  try {
    // 判断有没有选中的钱包
    // eslint-disable-next-line no-eval
    if (eval(`window.${walletNameListShow[walletName]}`)) {
      // 有的话连接钱包
      provider = new ethers.BrowserProvider(
        // eslint-disable-next-line no-eval
        eval(`window.${walletNameList[walletName]}`)
      );
      signer = await provider.getSigner();
      // new 出erc20的合约实例
      if (contractAddress) {
        erc20Contract = new ethers.Contract(contractAddress, erc20, signer);
      }
      return { provider, signer, state: true };
      // 没有的话去跳转到官网下载
    } else {
      window.open(download[walletName]);
      return { value: "转到官网下载", state: false };
    }
  } catch (e) {
    return { e, state: false };
  }
};

// 检测用户当前在那条链上
export const checkChainSupportF = async () => {
  try {
    // 获取网络信息
    const network = await provider.getNetwork();
    // 输出当前连接的链的信息
    // 将链 ID 转换为字符串，并去掉后缀 "n"
    const chainId = network.chainId.toString();
    const chainIdWithoutSuffix = chainId.endsWith("n")
      ? chainId.slice(0, -1)
      : chainId;
    return { value: chainIdWithoutSuffix, state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 添加链但也有切换链功能
export const addCustomChainF = async (chainParams: addCustomChainType) => {
  try {
    const data = {
      ...chainParams,
      chainId: `0x${chainParams.chainId.toString(16)}`,
    };
    // 发送添加链的请求
    await provider.send("wallet_addEthereumChain", [data]);
    // 查询目前所在网络
    const netWork = await checkChainSupportF();
    if (Number(netWork.value) === chainParams.chainId)
      return { value: 1, state: true };
    return { value: 2, state: true };
  } catch (e) {
    return { e: e, state: false };
  }
};

// 切换链不同的网络
export const switchoverChainF = async (chainId: number) => {
  try {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: `0x${chainId.toString(16)}` },
    ]);
    return { value: "切换链成功", state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 自动添加代币合约
export const addTokenContractF = async (params: addTokenContractType) => {
  try {
    await provider.send("wallet_watchAsset", params);
    return { value: "添加合约成功", state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 查询主网币余额
export const getBalanceF = async (address: string) => {
  try {
    const balance = await provider.getBalance(address);
    return { value: ethers.formatEther(balance), state: true };
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
export const transferAccountsF = async (address: string, money: number) => {
  try {
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.parseEther(money.toString()),
    });
    return { value: tx, state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 发送代币
export const transferDaiAccountsF = async (address: string, money: number) => {
  try {
    const tx = await erc20Contract.transfer(
      address,
      ethers.parseEther(money.toString())
    );
    return { value: tx, state: true };
  } catch (e) {
    return { e, state: false };
  }
};
// 查询交易是否成功
export const listenerTransferF = (transactionHash: any) => {
  return new Promise((reslove, reject) => {
    provider.once(transactionHash, (receipt: any) => {
      if (receipt.status) {
        reslove(true);
      }
      reslove(false);
    });
  });
};
