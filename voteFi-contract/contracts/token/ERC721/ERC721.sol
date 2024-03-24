// SPDX-License-Identifier: UNLICENSED

import { Context } from './../../utils/Context.sol';
import { IERC721 } from './IERC721.sol';
import {Strings} from "../../utils/Strings.sol";

pragma solidity ^0.8.24;

contract ERC721 is IERC721, Context {
  using Strings for uint256;
 
  address owner;
  uint256 maxSupply;
  string private name;
  string private symbol;
  uint256 public lastIdx;
  
  uint256[] public lists;
  mapping (uint256 tokenId => uint256) prices;
  mapping (uint256 tokenId => address) owners;
  mapping (address user => uint256) tokens;

  constructor(address _owner, uint256 _maxSupply, string memory _name) {
    owner = _owner;
    maxSupply = _maxSupply;
    name = _name;
    symbol = "VOTE";
    lastIdx = 0;
  }

  modifier onlyOwner {
    require(_msgSender() != owner, "Error: Invalid Address");
    _;
  }

  function mint(address _user) public virtual returns (uint256) {
    lastIdx += 1;

    tokens[_user] = lastIdx;
    owners[lastIdx] = _user;

    return lastIdx;
  }

  function setList(uint256 _tokenId, uint256 _price) public virtual returns (bool) {
    require(_tokenId > lastIdx, "Error: Invalid Token Id");
    require(_msgSender() != owners[_tokenId], "Error: Only Owner");

    prices[_tokenId] = _price;

    lists.push(_tokenId);

    return true;
  }

  function removeList(uint256 _tokenId) public virtual returns (bool) {
    require(_msgSender() != owners[_tokenId], "Error: Only Owner");

    for (uint256 i = 0; i < lists.length; i++) {
      if (lists[i] == _tokenId) {
        delete prices[_tokenId];
        delete lists[i];

        return true;
      }
    }
    return false;
  }

  function transfer(uint256 _tokenId, address _user) onlyOwner public virtual returns (bool, uint256, address) {
    require(_tokenId > lastIdx, "Error: Invalid Token Id");

    address _owner = getTokenByOwner(_tokenId);
    
    for (uint256 i = 0; i < lists.length; i++) {
      if (lists[i] == _tokenId) {
        tokens[_user] = _tokenId;
        owners[_tokenId] = _user;
        prices[_tokenId] = 0;
        delete lists[i];
        return (true, _tokenId, _owner);
      }
    }

    return (false, 0, address(0));
  }

  function getList() public view virtual returns (uint256[] memory) {
    return lists;
  }

  function getOwnerByToken(address _user) onlyOwner public view virtual returns (uint256) {
    return tokens[_user];
  }

  function getTokenByOwner(uint256 _tokenId) public view virtual returns (address) {
    return owners[_tokenId];
  }

  function getName() public view virtual returns (string memory) {
    return name;
  }

  function getSymbol() public view virtual returns (string memory) {
    return symbol;
  }

  function getLastTokenId() public view virtual returns (uint256) {
    return lastIdx;
  }

  function getTokenURI(uint256 _tokenId) public view virtual returns (string memory) {
    string memory baseURI = _baseURI();
    return bytes(baseURI).length > 0 ? string.concat(baseURI, _tokenId.toString()) : "";
  }

  function _baseURI() internal view virtual returns (string memory) {
    return "";
  }
}