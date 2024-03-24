// SPDX-License-Identifier: UNLICENSED

import { Vote } from './../vote/Vote.sol';
import { Struct } from './../utils/Struct.sol';

pragma solidity ^0.8.24;

interface IVoteFactory is Struct {
  function createVote(string memory _name, address _target, uint256 _maxSupply) external returns (VoteSet memory);
}