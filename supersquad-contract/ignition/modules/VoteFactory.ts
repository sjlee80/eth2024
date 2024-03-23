const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const FactoryModule = buildModule("VoteFactoryModule", (contract: any) => {
  const factory = contract.contract("VoteFactory", ["0xf6edeDC217E4DEE1b873853ca51cc1322614A313"]);

  return { factory };
});

module.exports = FactoryModule;