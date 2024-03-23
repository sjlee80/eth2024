'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/button/createBtn/CreateVoteBtn.module.scss';
import classNames from 'classnames/bind';
import useContract from '@/hook/useContract';
import { ethers } from 'ethers';
import { Config, useAccount, useConnect, useConnectorClient } from 'wagmi';
import { useEthersSigner } from '@/hook/useEthersSigner';
import { SET_SIGNER } from '@/redux/slice/Web3Slice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '@/constant/MUTATION_KEY';
import { setVote } from '@/api/vote/set/setVote';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type Props = {
  title: string;
  target: string;
  description: string;
  file: File | null;
  maxSupply: number;
  signer: ethers.Signer | null;
};

const CreateVoteBtn = ({
  title,
  description,
  file,
  target,
  maxSupply,
  signer,
}: Props) => {
  const { createVote } = useContract();
  const route = useRouter();
  const dispatch = useDispatch();
  const { clientToSigner } = useEthersSigner();
  const { connectors, connect } = useConnect();
  const { address, chainId, isConnected } = useAccount();
  const [voteAddress, setVoteAddress] = useState<string>('');
  const { data: client } = useConnectorClient<Config>({
    chainId: 84532,
    account: address,
    connector: connectors[0],
  });

  const setVoteMutation = useMutation({
    mutationKey: [MUTATION_KEY.SET_VOTE],
    mutationFn: setVote,
    onSuccess: () => {
      route.push(`/vote/${voteAddress}`);
    },
  });

  useEffect(() => {
    if (client) {
      const signer = clientToSigner(client);
      dispatch(
        SET_SIGNER({
          signer: signer,
        }),
      );
    }
  }, [client, isConnected]);

  return (
    <button
      className={cn('container')}
      onClick={async () => {
        console.log('signer', signer);
        if (signer && address) {
          const eventLog = await createVote(signer, title, target, maxSupply);
          console.log('eventLog', eventLog);
          const iface = new ethers.Interface([
            'event CreatedVote(address vote, address token, address pool, address trade)',
          ]);
          const contract = iface.decodeEventLog(
            'CreatedVote',
            eventLog[0].data,
          );
          setVoteAddress(contract[0]);
          setVoteMutation.mutate({
            address: contract[0],
            title: title,
            description: description,
            target: target,
            pool: contract[2],
            trade: contract[3],
            creator: address,
            token: contract[1],
            file: file,
          });
        } else {
          connect({ connector: connectors[0] });
        }
      }}
    >
      Create Vote!
    </button>
  );
};

export default CreateVoteBtn;
