// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

interface IPool {
  function setTokenAddress(address _token) external;
  
  function changeOwner(address payable _address) external;

  function targetClaim() external returns (bool, uint256);

  function creatorClaim() external returns (bool, uint256);

  function getTargetShare() external returns (uint256);

  function getCreatorShare() external returns (uint256);

  function getMaxSupply() external returns (uint256);

  function getMintedAmount() external returns (uint256);

  function getToken() external returns (address);
}