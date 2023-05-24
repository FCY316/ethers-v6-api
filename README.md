### 个人使用，用于开发 web3 应用时的 api 调用，，只会暴露通用 api, 插件使用的是ethers@6.3.0，也会进行暴露

### 每个函数都会返回一个对象，对象里面有 state 参数 这个参数可以用与判断 true 成功 false 失败

## 所有函数正确会返回{你需要的参数，state:true} 错误会返回{e:xxx,state:false} 正确返回的值可能会不一样，但错误的一定是一样的格式

## 1.connectedWalletF(MetaMask:string,?contractAddress:string) 函数用于连接钱包,new Erc20，

    可以连接MetaMask，BitKeep，TokenPocket(与MetaMask连接钱包方法相同，所以需要在TokenPocket把默认钱包改为小狐狸)
    如果没有检测到钱包会自动跳转到各自的钱包的下载官网
    返回值为 { provider, signer, state } provider只能用于只读，signer用于交互里面还有地址，详情见ethers v6文档 https://docs.ethers.org/v6/getting-started/#starting-glossary

## 2.checkChainSupportF() 函数用于检测用户当前在那条链上

    返回值为 { value: chainId, state: true }  chainId是经过处理后的，不用进行二次处理

## 3.addCustomChainF(chainParams) 添加链和切换链功能，虽然有切链的功能，但是并不能监听成功的回调

    返回值为 { value: 1 or 2, state: true }; 1 添加了链且切换到添加的链或者切换到某个链，2 添加了某个链但没切换到添加的链或者没切换到某个链 传入的参数chainParams是以下格式：
    {
    chainId: number,
    chainName: string,
    nativeCurrency: {
      name: string,
      symbol: string,
      decimals: number,
    },
    rpcUrls: string[]
    }
    暂时没有添加区块浏览器的参数

## 4.switchoverChainF(chainId:number)切换链，但在钱包没有这条链的情况下，报错

    返回值为 { value: "切换链成功", state: true }

## 5.getBalanceF(address: string)查询主网币余额

    返回值为 return { value: balance, state: true }; balance是进行过处理的数据

## 6.getBlockHeightF()查询当前块高

    返回值为 return { value: blockNumber, state: true }; blockNumber的当前块高

## 7.getNonceF()获取发送事务所需的下一个 nonce

    返回值为 return { value: nonce, state: true };

## 8.sigMessageF(message: string)签名消息

    返回值为 return { value: sigMessage, state: true }; sigMessage签名出来的消息

## 9.transferAccountsF(address: string, money: number) 发送交易(主网币)

    返回值为 return { value: tx, state: true }; tx里面有上链的一系列参数

## 10.transferDaiAccountsF(address: string, money: number)发送代币

    返回值为 return { value: tx, state: true }; tx里面有上链的一系列参数

## 11.addTokenContractF(params) 添加代币合约

    params Type :{
    type: string;
    options: {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
    };
    }
    返回值为 return { value: 添加合约成功, state: true };

## 12.getBalanceDaiAccountsF(address:string) 查看代币余额

    return { value: balance, state: true }; balance是进行过处理的数据

## 13.getAuthorizationF( address: string,contractAddress: string) // 查询用户授权额度

    return { value: limit, state: true }; limit是进行过处理的数据

## listenerTransferF(transactionHash:string) 查询交易会自动 padding

    返回值为 return true or false true交易成功，false交易失败
