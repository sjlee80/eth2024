import React from 'react';
import styles from '@/components/card/voteCard/VoteCard.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';

const cn = classNames.bind(styles);

const VoteCard = () => {
  return (
    <Link href={`/vote/${'0x0'}`} style={{ cursor: 'pointer' }}>
      <section className={cn('container')}></section>
    </Link>
  );
};

export default VoteCard;
