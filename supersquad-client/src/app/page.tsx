'use client';
import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/app/page.module.scss';
import VoteBanner from '@/components/banner/voteBanner/VoteBanner';
import JoinBtn from '@/components/button/joinBtn/JoinBtn';
import { useAccount } from 'wagmi';

const cn = classNames.bind(styles);

const Home = () => {
  const { address } = useAccount();

  return (
    <main className={cn('container')}>
      <section className={cn('inner')}>
        <VoteBanner />
      </section>
      <section className={cn('inner', 'btn-container')}>
        <span className={cn('join-title')}>Join With</span>
      </section>
      <section className={cn('inner')}>
        <div className={cn('btn-inner')}>
          <JoinBtn path="/create" title="Create Vote" />
        </div>
        <div className={cn('btn-inner')}>
          <JoinBtn path={`/my-list/${address}`} title="My Vote" />
        </div>
        <div className={cn('btn-inner')}>
          <JoinBtn path="/feed" title="Feed" />
        </div>
      </section>
    </main>
  );
};

export default Home;
