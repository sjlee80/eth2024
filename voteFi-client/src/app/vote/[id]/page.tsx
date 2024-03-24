'use client';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '@/app/vote/[id]/page.module.scss';
import VoteInfoCard from '@/components/card/voteInfoCard/VoteInfoCard';
import VoteBtn from '@/components/button/voteBtn/VoteBtn';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { usePathname } from 'next/navigation';
import { getVoteById } from '@/api/vote/getVoteById';
import useTimer from '@/hook/useTimmer';
import { calculateDateDiff } from '@/utils/dateUtils';
import useContract from '@/hook/useContract';
import { useSelector } from 'react-redux';
import { getProvider, getSigner } from '@/redux/slice/Web3Slice';
import { MUTATION_KEY } from '@/constant/MUTATION_KEY';

const cn = classNames.bind(styles);

const VoteDetailPage = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[pathname.split('/').length - 1];
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.VOTE, id],
    queryFn: () => getVoteById({ id }),
  });

  const {
    getBalance,
    checkInTarget,
    checkIsCheckIn,
    mint,
    getMaxSupply,
    getTokenAddress,
    getMintedAmount,
  } = useContract();
  const date = new Date(data?.createdAt || '');

  const {
    date: leftDate,
    hour,
    minute,
    second,
  } = useTimer(
    calculateDateDiff(data?.createdAt || '') <= 6
      ? new Date(date.setDate(date.getDate() + 6)).toISOString()
      : new Date(date.setDate(date.getDate() + 3)).toString(),
  );

  const provider = useSelector(getProvider);
  const signer = useSelector(getSigner);
  const queryClient = useQueryClient();

  const { data: balance } = useQuery({
    queryKey: [QUERY_KEY.POOL, 'Balance'],
    queryFn: () => getBalance(provider, data?.pool || ''),
  });

  const { data: isCheckedIn } = useQuery({
    queryKey: [QUERY_KEY.VOTE, 'checkIn', data?._id],
    queryFn: () => checkIsCheckIn(signer, data?._id || ''),
  });

  const checkInMutation = useMutation({
    mutationKey: [MUTATION_KEY.CHECK_IN_VOTE],
    mutationFn: checkInTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOTE, 'checkIn', data?._id],
      });
    },
  });

  const { data: maxSupply } = useQuery({
    queryKey: [QUERY_KEY.TOKEN],
    queryFn: () => getMaxSupply(signer, data?.pool || ''),
  });

  const { data: mintedAmount } = useQuery({
    queryKey: [QUERY_KEY.TOKEN, 'MintedAmount'],
    queryFn: () => getMintedAmount(signer, data?.pool || ''),
  });

  const { data: token } = useQuery({
    queryKey: [QUERY_KEY.TOKEN, 'Addreess'],
    queryFn: () => getTokenAddress(signer, data?.pool || ''),
  });

  const mintMutation = useMutation({
    mutationKey: [MUTATION_KEY.MINT],
    mutationFn: mint,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TOKEN, 'MintedAmount'],
      });
    },
  });

  return (
    <main className={cn('container')}>
      <div className={cn('image-container')}>
        {data && (
          <div className={cn('image-inner')}>
            <Image
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              fill
              loading="lazy"
              alt={''}
              src={data?.image}
            />
          </div>
        )}
      </div>
      <div className={cn('inner')}>
        <div>
          <div className={cn('inner-title')}>{data?.title}</div>
          <div className={cn('inner-desc')}>{data?.description}</div>
        </div>
        {data && (
          <div className={cn('inner-timer')}>
            <span className={cn('timer-bold')}>{leftDate || 0}</span> Day
            <span className={cn('timer-bold')}>{hour || 0}</span>h
            <span className={cn('timer-bold')}>{minute || 0}</span>m
            <span className={cn('timer-bold')}>{second || 0}</span>s
          </div>
        )}
      </div>
      <div className={cn('inner')}>
        <div className={cn('inner-address')}>
          Target Address: {data?.target}
        </div>
        <div className={cn('inner-status')}>
          {!isCheckedIn ? 'Not Checked In Yet' : 'Checked In'}
        </div>
      </div>
      <div className={cn('inner')}>
        <VoteInfoCard
          maxSupply={`${((maxSupply as any) * 1000000000000000000).toFixed(0)}`}
          minted={`${((mintedAmount as any) * 1000000000000000000).toFixed(0)}`}
          balance={`${balance}`}
        />
      </div>
      <div className={cn('inner')}>
        <div className={cn('button-inner')}>
          {calculateDateDiff(data?.createdAt || '') <= 6 ? (
            <VoteBtn
              title="Mint"
              onClick={() => {
                mintMutation.mutate({
                  _signer: signer,
                  address: data?.pool || '',
                });
              }}
            />
          ) : (
            <VoteBtn title="Vote" onClick={() => {}} />
          )}
        </div>
      </div>
    </main>
  );
};

export default VoteDetailPage;
