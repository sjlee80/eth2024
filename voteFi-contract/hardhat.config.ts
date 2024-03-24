import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';

dotenv.config();

const { ACCOUNT, INFURA_API_KEY } = process.env;

if (!ACCOUNT) {
  throw new Error('The ACCOUNT environment variable is not defined');
}

if (!INFURA_API_KEY) {
  throw new Error('The INFURA_API_KEY environment variable is not defined');
}

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT],
    },
    baseSepolia: {
      url: 'https://sepolia.base.org',
      accounts: [ACCOUNT],
    },
    cardonaPolygon: {
      url: 'https://rpc.cardona.zkevm-rpc.com',
      accounts: [ACCOUNT],
    },
    scrollSepolia: {
      url: 'https://sepolia-rpc.scroll.io/',
      accounts: [ACCOUNT],
    },
    lineaGoerli: {
      url: 'https://rpc.goerli.linea.build',
      accounts: [ACCOUNT],
    },
  },
};

export default config;
