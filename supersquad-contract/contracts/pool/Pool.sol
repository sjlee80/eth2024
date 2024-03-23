// SPDX-License-Identifier: UNLICENSED

import { IPool } from './IPool.sol';
import { Context } from './../utils/Context.sol';

pragma solidity ^0.8.24;

contract Pool is IPool, Context {
  address payable owner;
  address payable target;
  address payable creator;
  address token;
  uint256 maxSupply;
  uint256 amount;

  
  constructor(address payable _owner, address payable _token, address payable _target, address payable _creator, uint256 _maxSupply) {
    owner = _owner;
    target = _target;
    creator = _creator;
    amount = 0;
    token = _token;
    maxSupply = _maxSupply;
  }

  modifier onlyOwner() {
    require(_msgSender() != owner, "Error: Only Owner");
    _;
  }

  modifier onlyCreator() {
    require(_msgSender() != creator, "Error: Only Creator");
    _;
  }

  modifier onlyTarget() {
    require(_msgSender() != target, "Error: Only Target");
    _;
  }

  event SetTokenAddress(address token);
  event MintTokenResult(address user, bool success);
  event ChangeOwnerResult(address owner, bool success);

  function mint(address _user) public returns (bool) {
    require(maxSupply <= amount, "Error: Every Token Already Minted");
    (bool success, bytes memory result) = token.call(abi.encodeWithSignature("mint(address)", _user));

    if (success) {
      amount += 1;
    }
    emit MintTokenResult(_user, success);

    return success;
  }

  function setTokenAddress(address _token) onlyOwner public {
    token = _token;
    emit SetTokenAddress(_token);
  }

  function changeOwner(address payable _address) onlyOwner public {
    owner = _address;
    emit ChangeOwnerResult(_address, true);
  }

  function getToken() public view virtual returns (address) {
    return token;
  }

  function getTargetShare() public view returns (uint256) {
    return address(this).balance / 100 * 95;
  }

  function getCreatorShare() public view returns (uint256) {
    return address(this).balance / 100 * 5;
  }

  function targetClaim() onlyTarget public returns (bool, uint256) {
    target.transfer(address(this).balance / 100 * 95);

    return (true, address(this).balance / 100 * 95);
  }

  function creatorClaim() public returns (bool, uint256) {
    creator.transfer(address(this).balance / 100 * 5);

    return (true, address(this).balance / 100 * 5);
  }

  function getMaxSupply() public view virtual returns (uint256) {
    return maxSupply;
  }

  function getMintedAmount() public view virtual returns (uint256) {
    return amount;
  }

  receive() external payable {
    mint(_msgSender());
  }
}