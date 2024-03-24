import { getSigner, SET_PROVIDER, SET_SIGNER } from '@/redux/slice/Web3Slice';
import { BrowserProvider, ethers, JsonRpcSigner } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import type { Chain, Client, Transport, Account } from 'viem';

export function useEthersSigner() {
  const dispatch = useDispatch();

  function clientToSigner(client: Client<Transport, Chain, Account>) {
    const { account, chain, transport } = client;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    if (!account) return;
    const provider = new BrowserProvider(transport, network);
    const _signer = new JsonRpcSigner(provider, account.address);

    dispatch(
      SET_PROVIDER({
        provider: provider,
      }),
    );
    dispatch(
      SET_SIGNER({
        signer: _signer,
      }),
    );
    return _signer;
  }

  return {
    clientToSigner,
  };
}
