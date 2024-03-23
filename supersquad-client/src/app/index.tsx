import React, { ReactNode, useEffect } from 'react';
import Layout from '@/layout';
import { useAccount, useConnect } from 'wagmi';

const Inner = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();
  const { connectors } = useConnect();

  useEffect(() => {
    if (isConnected) {
      connectors[0].disconnect();
    }
  }, []);

  return <Layout>{children}</Layout>;
};

export default Inner;
