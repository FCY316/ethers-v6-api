import { addCustomChainType, addTokenContractType } from "@/interface";
import { provider } from "./connectedWallet";
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