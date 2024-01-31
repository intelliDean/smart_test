require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */


const {URL, KEY} = process.env;

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: URL,
      accounts: [`0x${KEY}`]
    }
  }
};
