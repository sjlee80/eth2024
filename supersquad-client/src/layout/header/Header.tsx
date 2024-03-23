import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '@/layout/header/Header.module.scss';
import ConnectWalletBtn from '@/components/button/connectBtn/ConnectWalletBtn';
import Link from 'next/link';

const cn = classNames.bind(styles);

const Header = () => {
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <header className={cn('container')}>
      <section className={cn('inner')}>
        <span className={cn('title')}>
          <Link href={'/'}>Vote.Fi</Link>
        </span>

        {isMount && <ConnectWalletBtn />}
      </section>
    </header>
  );
};

export default Header;
