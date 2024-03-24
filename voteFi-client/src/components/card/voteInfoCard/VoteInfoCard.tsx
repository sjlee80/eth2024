import React from 'react';
import styles from '@/components/card/voteInfoCard/VoteInfoCard.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  maxSupply: string;
  minted: string;
  balance: string;
};

const VoteInfoCard = ({ maxSupply, minted, balance }: Props) => {
  return (
    <section className={cn('container')}>
      <div className={cn('inner')}>Total Supply {maxSupply}</div>
      <div className={cn('inner')}>Minted {minted}</div>
      <div className={cn('inner')}>Current Pool {balance} ETH</div>
      <div className={cn('inner')}>Voting Rate 0%</div>
      <div className={cn('inner')}>Agreement Rate 0%</div>
    </section>
  );
};

export default VoteInfoCard;
