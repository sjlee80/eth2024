// SPDX-License-Identifier: UNLICENSED

import { Context } from './../utils/Context.sol';
import { ITrade } from './ITrade.sol';

pragma solidity ^0.8.24;

contract Trade is ITrade, Context {
  address owner;
  address token;

  constructor(address _owner, address _token) {
    owner = _owner;
    token = _token;
  }

  function transfer(address _user) public virtual returns (bool, uint256) {
    (bool success, bytes memory result) = token.call(abi.encodeWithSignature("getList()"));

    require(!success, "Error: Call Function Failed");

    (uint256[] memory tokenList) = abi.decode(result, (uint256[]));

    require(tokenList.length == 0, "Error: Token List Not Exist");

    (bool _success, bytes memory _result) = token.call(abi.encodeWithSignature("transfer(uint256,address)", tokenList[0], _user));

    require(!_success, "Error: Transfer Failed");

    (bool res, uint256 tokenId, address payable prev) = abi.decode(_result, (bool,uint256,address));

    prev.transfer(address(this).balance);

    return (res, tokenId);
  }

  receive() external payable {
    transfer(_msgSender());
  }
}