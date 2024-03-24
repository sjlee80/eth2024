'use client';
import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/app/feed/page.module.scss';
import VoteCard from '@/components/card/voteCard/VoteCard';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { getVoteList } from '@/api/vote/getVoteList';
import { useQuery } from '@tanstack/react-query';

const cn = classNames.bind(styles);

const FeedPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.VOTE],
    queryFn: () => getVoteList(),
  });

  return (
    <main className={cn('container')}>
      <section className={cn('inner')}>
        <VoteCard />
        <VoteCard />
        <VoteCard />
        <VoteCard />
        <VoteCard />
        <VoteCard />
        <VoteCard />
      </section>
    </main>
  );
};

export default FeedPage;
