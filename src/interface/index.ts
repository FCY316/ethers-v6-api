export interface walletNameListType {
  [key: string]: string;
}
export interface walletDownloadListType {
  [key: string]: string;
}
export interface addCustomChainType {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
}
export interface addTokenContractType {
  type: string;
  options: {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
  };
}
