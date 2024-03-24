import classNames from 'classnames/bind';
import React from 'react';
import styles from '@/components/banner/voteBanner/VoteBanner.module.scss';
import Link from 'next/link';

const cn = classNames.bind(styles);

const VoteBanner = () => {
  return (
    <section className={cn('container')}>
      <Link href={`/vote/${'0x0'}`} className={cn('inner')}>
        <>
          <div className={cn('image')}></div>
          <div className={cn('content')}></div>
        </>
      </Link>
    </section>
  );
};

export default VoteBanner;
