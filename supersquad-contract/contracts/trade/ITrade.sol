// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

interface ITrade {
  function transfer(address _user) external returns (bool, uint256);
}