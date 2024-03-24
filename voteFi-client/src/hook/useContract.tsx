import { ContractTransactionResponse, ethers } from 'ethers';
import FACTORY from '@/abi/factory/FACTORY.json';
import {
  BASE_FACTORY_ADDRESS,
} from '@/constant/FACTORY_ADDRESS';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FACTORY_CONTRACT } from '@/redux/slice/ContractSlice';
import POOL from '@/abi/pool/POOL.json';
import VOTE from '@/abi/vote/VOTE.json';
import { getProvider } from '@/redux/slice/Web3Slice';

const useContract = () => {
  const dispatch = useDispatch();
  const provider = useSelector(getProvider);

  const createVote = async (
    _signer: ethers.Signer,
    title: string,
    target: string,
    maxSupply: number,
  ) => {
    const voteFactory = new ethers.Contract(
      BASE_FACTORY_ADDRESS,
      JSON.stringify(FACTORY.abi),
      _signer,
    );

    console.log('voteFactory', voteFactory);

    dispatch(SET_FACTORY_CONTRACT(voteFactory));

    const _createVote = voteFactory.getFunction('createVote');
    console.log('_createVote', _createVote);

    const response: ContractTransactionResponse = await _createVote(
      title,
      target,
      maxSupply,
    );

    const transaction = await response.provider.waitForTransaction(
      response.hash,
    );

    const filter = voteFactory.filters.CreatedVote;
    const events = await voteFactory.queryFilter(
      filter,
      transaction?.blockNumber,
    );

    return events;
  };

  const getBalance = async (
    provider: ethers.Provider | null,
    address: string,
  ) => {
    if (provider == null) return null;

    const balance = await provider.getBalance(address);

    return ethers.formatEther(BigInt(balance));
  };

  const getTargetShare = async (
    _signer: ethers.Signer | null,
    address: string,
  ) => {
    if (_signer == null) return null;

    const pool = new ethers.Contract(
      address,
      JSON.stringify(POOL.abi),
      _signer,
    );

    const _getTargetShare = pool.getFunction('getTargetShare');
    const response: ContractTransactionResponse = await _getTargetShare();

    return ethers.formatEther(BigInt(response as unknown as bigint));
  };

  const checkInTarget = async ({
    _signer,
    address,
  }: {
    _signer: ethers.Signer | null;
    address: string;
  }) => {
    if (_signer == null) return null;

    const vote = new ethers.Contract(address, VOTE.abi, _signer);

    const _checkIn = vote.getFunction('checkIn');
    const response: ContractTransactionResponse = await _checkIn(true);
  };

  const checkIsCheckIn = async (
    _signer: ethers.Signer | null,
    address: string,
  ) => {
    if (_signer == null) return null;

    const vote = new ethers.Contract(address, VOTE.abi, _signer);

    const _getIsCheckIn = vote.getFunction('getIsCheckIn');
    const response: ContractTransactionResponse = await _getIsCheckIn();
    return response;
  };

  const mint = async ({
    _signer,
    address,
  }: {
    _signer: ethers.Signer | null;
    address: string;
  }) => {
    if (_signer == null) return null;

    const response = await _signer.sendTransaction({
      to: address,
      value: ethers.parseUnits('0.001', 'ether'),
    });

    console.log(response);
  };

  const getMaxSupply = async (
    _signer: ethers.Signer | null,
    address: string,
  ) => {
    if (_signer == null) return null;

    const pool = new ethers.Contract(address, POOL.abi, _signer);
    const _getMaxSupply = pool.getFunction('getMaxSupply');
    const response: ContractTransactionResponse = await _getMaxSupply();
    return ethers.formatEther(BigInt(response as unknown as bigint));
  };

  const getMintedAmount = async (
    _signer: ethers.Signer | null,
    address: string,
  ) => {
    if (_signer == null) return null;

    const pool = new ethers.Contract(address, POOL.abi, _signer);
    const _getMintedAmount = pool.getFunction('getMintedAmount');
    const response: ContractTransactionResponse = await _getMintedAmount();

    console.log("response", response)
    return ethers.formatEther(BigInt(response as unknown as bigint));
  };

    const getTokenAddress = async (
    _signer: ethers.Signer | null,
    address: string,
  ) => {
    if (_signer == null) return null;

    const pool = new ethers.Contract(address, POOL.abi, _signer);
    const _getToken = pool.getFunction('getToken');
    const response: ContractTransactionResponse = await _getToken();

    console.log("response", response)
    return response;
  };

  return {
    mint,
    createVote,
    getBalance,
    getTokenAddress,
    getTargetShare,
    checkInTarget,
    getMaxSupply,
    checkIsCheckIn,
    getMintedAmount
  };
};

export default useContract;
