import React, { useState } from 'react';
import apiWb3 from './api'
import '@/z.css'
// 定义要添加的链的参数
const chainParams = {
  chainId: 65,
  chainName: "OEC Testnet", // 自定义链的名称
  nativeCurrency: {
    name: "OEC Global Utility Token in testnet",
    symbol: "OKT",
    decimals: 18,
  },
  rpcUrls: ["https://exchaintestrpc.okex.org"]
};

function App() {
  const { connectedWalletF, getBalanceF, switchoverChainF, checkChainSupportF, addCustomChainF, transferAccountsF, transferDaiAccountsF, getBlockHeightF, getNonceF, sigMessageF, addTokenContractF } = apiWb3
  const [address, setAddress] = useState('')
  // 连接钱包
  const connectedWallet = async () => {
    const res = await connectedWalletF('BitKeep', "0x5786d52c643d36Da07Bb9A8439Ed3e62317deF3C")
    if (!res.state) return
    setAddress(res.signer.address)
    console.log('连接钱包', res);
  }
  // 查询主网币余额
  const getBalance = async () => {
    if (!address) return
    const res = await getBalanceF(address)
    if (!res.state) return
    console.log('查询主网币余额', res.value);
  }
  // 切换到Fibo链
  const switchoverChain = async () => {
    const res = await switchoverChainF(12306)
    if (!res.state) return
    console.log('切换到Fibo链', res);
  }
  // 获取当前所在的链
  const checkChainSupport = async () => {
    const res = await checkChainSupportF()
    if (!res.state) return
    console.log('获取当前所在的链', res);
  }
  // 切换或添加ok测试链
  const addCustomChain = async () => {
    const res = await addCustomChainF(chainParams)
    if (!res.state) return
    console.log('切换或添加ok测试链', res);
  }
  // 代币转账
  const transferDaiAccounts = async () => {
    const res = await transferDaiAccountsF("0xbBaDeBb6C70f06B1155f3A2574fb8e02038Fe303", 100)
    if (!res.state) return
    console.log('代币转账', res);
    // const ok = await listenerTransferF(res.value.hash)
    // console.log('ok', ok);
  }
  // 查询当前块高
  const getBlockHeight = async () => {
    const res = await getBlockHeightF()
    if (!res.state) return
    console.log('查询当前块高', res);
  }
  // 获取当前nonce
  const getNonce = async () => {
    const res = await getNonceF(address)
    if (!res.state) return
    console.log('获取当前nonce', res);
  }
  // 发送主网币
  const transferAccounts = async () => {
    const res = await transferAccountsF("0xbBaDeBb6C70f06B1155f3A2574fb8e02038Fe303", 0.01)
    console.log('发送主网币错误', res);
    if (!res.state) return
    console.log('发送主网币', res);
  }
  // 签名消息
  const sigMessage = async () => {
    const res = await sigMessageF('hello,world')
    if (!res.state) return
    console.log('签名消息', res);

  }
  // 添加代币合约到钱包
  const addTokenContract = async () => {
    const res = await addTokenContractF({
      type: "ERC20",
      options: {
        address: "0xaf9455e943797928be2d6cbb010b96d662d2c35e",
        symbol: "USDT",
        decimals: 18,
        image: "https://chainfb.oss-cn-hangzhou.aliyuncs.com/ETH/1230/USDT_0xAF9455E943797928be2D6CBb010b96D662d2C35E.png",
      },
    })
    console.log('res', res);

  }
  return (
    <div className="App">
      <button onClick={connectedWallet}>连接钱包</button>
      <button onClick={checkChainSupport}>检测用户在那条链</button>
      <button onClick={addCustomChain}>添加ok测试链</button>
      <button onClick={switchoverChain}>切链Fibo</button>
      <button onClick={getBalance}>查询主网币余额</button>
      <button onClick={transferDaiAccounts}>代币转帐</button>
      <button onClick={getBlockHeight}>查询当前块高</button>
      <button onClick={getNonce}>获取当前nonce</button>
      <button onClick={transferAccounts}>发送主网币</button>
      <button onClick={sigMessage}>签名消息</button>
      <button onClick={addTokenContract}>添加代币合约到钱包</button>
    </div>
  );
}

export default App;
