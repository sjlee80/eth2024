// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

interface IERC721 {
  function mint(address _user) external returns (uint256);

  function setList(uint256 _tokenId, uint256 _price) external returns (bool);

  function getList() external returns (uint256[] memory);

  function removeList(uint256 _tokenId) external returns (bool);

  function getLastTokenId() external returns (uint256);

  function getName() external returns (string memory);

  function getSymbol() external returns (string memory);

  function getTokenURI(uint256 _tokenId) external returns (string memory);

  function getOwnerByToken(address _user) external returns (uint256);

  function getTokenByOwner(uint256 _tokenId) external returns (address);

  function transfer(uint256 _tokenId, address _user) external returns (bool, uint256, address);
}