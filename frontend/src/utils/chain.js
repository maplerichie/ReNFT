export const NETWORK = 'mainnet';

export const NETWORKS = {
    localhost: {
        name: "localhost",
        chainId: 1337,
        blockExplorer: "",
        rpcUrl: "http://" + window.location.hostname + ":8545",
        symbol: "Ξ"
    },
    rinkeby: {
        name: "Rinkeby",
        chainId: 4,
        blockExplorer: "https://rinkeby.etherscan.io/",
        rpcUrl: "https://rinkeby.infura.io/v3/%API_KEY%",
        symbol: "ETH"
    },
    mainnet: {
        name: "Ethereum Mainnet",
        chainId: 1,
        blockExplorer: "https://www.etherscan.io/",
        rpcUrl: "https://mainnet.infura.io/v3/%API_KEY%",
        symbol: "ETH"
    },
    bsc: {
        name: "Binance Smart Chain",
        chainId: 56,
        blockExplorer: "https://www.bscscan.com/",
        rpcUrl: "https://bsc-dataseed1.defibit.io/",
        symbol: "BNB"
    },
    xdai: {
        name: "xDAI Chain",
        chainId: 100,
        blockExplorer: "https://blockscout.com/xdai/mainnet/",
        rpcUrl: "https://dai.poa.network",
        symbol: "xDAI"
    },
    polygon: {
        name: "Matic(Polygon) Mainnet",
        chainId: 137,
        blockExplorer: "https://polygonscan.com/",
        rpcUrl: "https://rpc-mainnet.matic.network",
        symbol: "MATIC"
    },
};

export function getChainData(chainId) {
    if (!chainId) {
      return null
    }

    let chainData;
    for(let network in NETWORKS){
        if(NETWORKS[network].chainId === chainId){
            chainData = NETWORKS[network];
            break;
        }
    }
  
    if (!chainData) {
      throw new Error('ChainId missing or not supported')
    }
  
    if (
      chainData.rpcUrl.includes('infura.io') &&
      chainData.rpcUrl.includes('%API_KEY%')
    ) {
      const rpcUrl = chainData.rpcUrl.replace('%API_KEY%', process.env.REACT_APP_INFURA_API)
  
      return {
        ...chainData,
        rpcUrl: rpcUrl,
      }
    }
  
    return chainData
  }
  
  export function ellipseAddress(address = '', width = 4) {
    if (!address) {
      return ''
    }
    return `${address.slice(0, width + 2)}......${address.slice(-width)}`
  }