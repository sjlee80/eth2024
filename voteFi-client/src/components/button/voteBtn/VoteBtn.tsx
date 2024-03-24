import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/button/voteBtn/VoteBtn.module.scss';

const cn = classNames.bind(styles);

type Props = {
  title: string;
  onClick: () => void;
};

const VoteBtn = ({ title, onClick }: Props) => {
  return (
    <button className={cn('container')} onClick={() => onClick()}>
      {title}
    </button>
  );
};

export default VoteBtn;
