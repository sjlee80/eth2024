import React, { ReactNode } from 'react';
import Header from '@/layout/header/Header';
import Footer from '@/layout/footer/Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
