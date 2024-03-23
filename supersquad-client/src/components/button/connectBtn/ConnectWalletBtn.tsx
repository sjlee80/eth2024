import React, { useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  Connector,
  useConnect,
  useConnectorClient,
  Config,
} from 'wagmi';
import styles from '@/components/button/connectBtn/ConnectWalletBtn.module.scss';
import classNames from 'classnames/bind';
import { useEthersSigner } from '@/hook/useEthersSigner';
import { useDispatch } from 'react-redux';
import { SET_SIGNER } from '@/redux/slice/Web3Slice';

const cn = classNames.bind(styles);

const ConnectWalletBtn = () => {
  const { isConnected } = useAccount();

  if (isConnected) return <Account />;
  return <WalletOptions />;
};

export default ConnectWalletBtn;

function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className={cn('connect-container')}>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <div className={cn('address')}>
          {ensName
            ? `${ensName} (${address})`
            : `${address.slice(0, 6)}...${address.slice(36)}`}
        </div>
      )}
      <button className={cn('button')} onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  );
}

function WalletOptions() {
  const { connectors, connect } = useConnect();
  const { clientToSigner } = useEthersSigner();
  const { address, chainId, isConnected } = useAccount();
  const dispatch = useDispatch();

  const { data: client } = useConnectorClient<Config>({
    chainId: 84532,
    account: address,
    connector: connectors[0],
  });

  useEffect(() => {
    if (client) {
      const signer = clientToSigner(client);
      dispatch(
        SET_SIGNER({
          signer: signer,
        }),
      );
    }
  }, [client, isConnected]);

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={async () => {
        connect({ connector });
      }}
    />
  ));
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector, address]);

  return (
    <button className={cn('button')} disabled={!ready} onClick={onClick}>
      Connect
    </button>
  );
}
