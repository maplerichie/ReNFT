require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork: "testnet",
  networks: {
    hardhat: {
      chainId: 1337
    },
    testnet: {
      url: "https://rinkeby.infura.io/v3",
      chainId: 1,
      accounts: [process.env.ADDR_PRIV_KEY]
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3",
      chainId: 2,
      accounts: [process.env.ADDR_PRIV_KEY]
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    // tests: "./test",
    // cache: "./cache",
    artifacts: "./frontend/src/artifacts"
  }
}
