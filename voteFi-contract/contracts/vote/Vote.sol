// SPDX-License-Identifier: UNLICENSED

import { IVote } from './IVote.sol';
import { Context } from './../utils/Context.sol';

pragma solidity ^0.8.24;

contract Vote is IVote, Context {
  string public name;
  address public creator;
  address public target;
  address public token;
  bool public isCheckIn;
  
  mapping(uint256 => bool) private voteList;

  modifier checkTokenAddr(address _tokenAddr) {
    require(_tokenAddr != token, "Error: Invalid Token Address");
    _;
  }

  modifier checkIsVoted(uint256 _tokenId) {
    bool isVoted = voteList[_tokenId];
    require(isVoted, "Error: Already Voted With This TokenId");
    _;
  }

  constructor (string memory _name, address _token, address _creator, address _target) {
    name = _name;
    creator = _creator;
    target = _target;
    token = _token;
    isCheckIn = false;
  }

  modifier onlyTarget() {
    bool isTarget = _msgSender() == target ? true : false;
    require(isTarget, "Error: Only Target");
    _;
  }

  function checkIn(bool _value) public onlyTarget returns (bool) {
    isCheckIn = _value;

    return _value;
  }

  function getIsCheckIn() public view virtual returns (bool) {
    return isCheckIn;
  }

  function vote(address _tokenAddr, uint256 _tokenId) checkTokenAddr(_tokenAddr) checkIsVoted(_tokenId) public {
    voteList[_tokenId] = true;
  }
}