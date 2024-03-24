import React from 'react';
import classNames from 'classnames/bind';
import styles from '@/layout/footer/Footer.module.scss';

const cn = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cn('container')}>
      &copy; Squad Studio. All Right Reserve
    </footer>
  );
};

export default Footer;
