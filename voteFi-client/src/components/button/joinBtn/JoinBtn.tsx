import classNames from 'classnames/bind';
import React from 'react';
import styles from '@/components/button/joinBtn/JoinBtn.module.scss';
import { useRouter } from 'next/navigation';

type Props = {
  path: string;
  title: string;
};

const cn = classNames.bind(styles);

const JoinBtn = ({ path, title }: Props) => {
  const route = useRouter();

  return (
    <button className={cn('container')} onClick={() => route.replace(path)}>
      <span className={cn('btn-title')}>{title}</span>
    </button>
  );
};

export default JoinBtn;
