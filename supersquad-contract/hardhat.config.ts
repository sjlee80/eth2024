import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${"a56f310dd02346b098e9732b5343b0c8"}`,
      accounts: ["82464dbafe8d0199db36b7874a9325cecc569863b54169b6ae80a36cc6b44a76"],
    },
    baseSepolia: {
      url: 'https://sepolia.base.org',
      accounts: ["82464dbafe8d0199db36b7874a9325cecc569863b54169b6ae80a36cc6b44a76"],
    }
  },
};

export default config;
