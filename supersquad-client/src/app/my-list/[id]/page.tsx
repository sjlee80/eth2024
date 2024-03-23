'use client';
import React, { useState } from 'react';
import styles from '@/app/my-list/[id]/page.module.scss';
import classNames from 'classnames/bind';
import VoteCard from '@/components/card/voteLongCard/VoteLongCard';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { getVoteList } from '@/api/vote/getVoteList';
import VoteLongCard from '@/components/card/voteLongCard/VoteLongCard';
import { Vote } from '@/types/Vote';
import { getVoteByTarget } from '@/api/vote/getVoteByTarget';
import { useAccount } from 'wagmi';

const cn = classNames.bind(styles);

const MyListPage = () => {
  const { address } = useAccount();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.VOTE, address],
    queryFn: () => getVoteByTarget({ id: address || '' }),
  });

  console.log('data', data);
  const [title, setTitle] = useState<'Waiting' | 'Proceeding' | 'Finished'>(
    'Waiting',
  );

  return (
    <main className={cn('container')}>
      <section className={cn('header')}>
        <div className={cn('header-title')}>{title}...</div>
        <div className={cn('header-nav-container')}>
          <button
            onClick={() => setTitle('Waiting')}
            className={cn(
              'header-nav-item',
              title === 'Waiting' && 'item-selected',
            )}
          >
            Waiting
          </button>
          <button
            onClick={() => setTitle('Proceeding')}
            className={cn(
              'header-nav-item',
              title === 'Proceeding' && 'item-selected',
            )}
          >
            Proceeding
          </button>
          <button
            onClick={() => setTitle('Finished')}
            className={cn(
              'header-nav-item',
              title === 'Finished' && 'item-selected',
            )}
          >
            Finished
          </button>
        </div>
      </section>
      <section className={cn('card-container')}>
        {data?.map((vote: Vote, index: number) => {
          return (
            <VoteLongCard
              key={index}
              _id={vote._id}
              image={vote.image}
              title={vote.title}
              creator={vote.creator}
              token={vote.token}
              pool={vote.pool}
              target={vote.target}
            />
          );
        })}
      </section>
    </main>
  );
};

export default MyListPage;
