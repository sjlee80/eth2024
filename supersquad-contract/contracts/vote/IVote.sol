// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

interface IVote {
  function checkIn(bool _value) external returns (bool);

  function vote(address _tokenAddr, uint256 _tokenId) external;

  function getIsCheckIn() external returns (bool);
}