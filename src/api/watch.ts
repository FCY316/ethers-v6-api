// 监听钱包的网络

export const watchWalletNetworkF = () => {
  try {
    (window as any).ethereum?.on("chainChanged", (newNetwork: any, oldNetwork: any) => {
      console.log("网络切换事件:");
      console.log("新网络:", newNetwork);
      console.log("旧网络:", oldNetwork);
    });
  } catch (e) {
    console.log("e", e);
    return { e, state: false };
  }
};
// 监听地址变化
export const watchWalletAddressF = () => {
  try {
    (window as any).ethereum?.on("accountsChanged", (accounts: any[]) => {
      console.log("accounts", accounts[0]);
    });
  } catch (e) {
    return { e, state: false };
  }
};
