// SPDX-License-Identifier: UNLICENSED

import { IVoteFactory } from './IVoteFactory.sol';
import { Context } from './../utils/Context.sol';
import { Vote } from './../vote/Vote.sol';
import { Pool } from './../pool/Pool.sol';
import { Struct } from './../utils/Struct.sol';
import { ERC721 } from './../token/ERC721/ERC721.sol';
import { Trade } from './../trade/Trade.sol';

pragma solidity ^0.8.24;

contract VoteFactory is IVoteFactory, Context {
    address private owner;
    uint256 private idx;

    mapping(uint256 => VoteSet) private votes;

    event CreatedVote(address vote, address token, address pool, address trade);    

    constructor(address _owner) {
        owner = _owner;
        idx = 0;
    }

    modifier checkTarget(address _target) {
        _isValidAddr(_target);
        _;
    }

    function _isValidAddr(address _addr) internal pure {
        bool isAddr = _addr == address(0) ? true : false;

        require(!isAddr, "Error: Invalid Address");
    }

    function isContract(address account) public view returns (uint) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size;
    }

    function createVote(
        string memory _name,
        address _target,
        uint256 _maxSupply
    ) public checkTarget(_target) returns (VoteSet memory) {
        idx += 1;

        ERC721 _token = new ERC721(owner, _maxSupply, _name);

        Pool _pool = new Pool(
            payable(owner),
            payable(address(_token)),
            payable(_target),
            payable(_msgSender()),
            _maxSupply
        );

        Vote _vote = new Vote(_name, address(_token), _msgSender(), _target);

        Trade _trade = new Trade(owner, address(_token));

        storeVote(
            VoteSet(address(_pool), address(_vote), address(_token), address(_trade)),
            idx
        );

        emit CreatedVote(address(_vote), address(_token), address(_pool), address(_trade));

        return VoteSet(address(_pool), address(_vote), address(_token), address(_trade));
    }

    function storeVote(VoteSet memory _set, uint256 _idx) internal {
        votes[_idx] = _set;
    }
}