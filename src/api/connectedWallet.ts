import { download, walletNameList, walletNameListShow } from "./walletName";
import { ethers } from "ethers";
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
export {provider,signer,erc20Contract}