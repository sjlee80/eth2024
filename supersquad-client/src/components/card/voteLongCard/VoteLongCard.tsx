import React from 'react';
import styles from '@/components/card/voteLongCard/VoteLongCard.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Vote } from '@/types/Vote';
import Image from 'next/image';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import useContract from '@/hook/useContract';
import { useSelector } from 'react-redux';
import { getProvider, getSigner } from '@/redux/slice/Web3Slice';
import { MUTATION_KEY } from '@/constant/MUTATION_KEY';

const cn = classNames.bind(styles);

type Props = Vote & {};

const VoteLongCard = ({
  _id,
  image,
  title,
  creator,
  token,
  pool,
  target,
}: Props) => {
  const { getBalance, getTargetShare, checkInTarget, checkIsCheckIn } =
    useContract();
  const provider = useSelector(getProvider);
  const signer = useSelector(getSigner);
  const queryClient = useQueryClient();
  console.log(_id);

  const { data: balance } = useQuery({
    queryKey: [QUERY_KEY.POOL, 'Balance'],
    queryFn: () => getBalance(provider, pool),
  });

  const { data: targetShare } = useQuery({
    queryKey: [QUERY_KEY.POOL, 'targetShare', pool],
    queryFn: () => getTargetShare(signer, pool),
  });

  const { data: isCheckedIn } = useQuery({
    queryKey: [QUERY_KEY.VOTE, 'checkIn', _id],
    queryFn: () => checkIsCheckIn(signer, _id),
  });

  const checkInMutation = useMutation({
    mutationKey: [MUTATION_KEY.CHECK_IN_VOTE],
    mutationFn: checkInTarget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOTE, 'checkIn', _id],
      });
    },
  });

  console.log('targetShare', targetShare);

  return (
    <Link href={`/vote/${_id}`}>
      <div className={cn('container')}>
        <div className={cn('inner')}>
          <div className={cn('image-container')}>
            <Image width={160} height={90} src={image} alt={''} sizes="cover" />
          </div>
          <div className={cn('content-container')}>
            <div className={cn('content-title')}>{title}</div>
            <div className={cn('content-inner')}>
              <div className={cn('content-text')}>
                Creator {creator.slice(0, 7)}...{creator.slice(36)}
              </div>
            </div>
          </div>
        </div>
        <div className={cn('inner')}>
          <div className={cn('content-label')}>{balance} ETH</div>
          <div className={cn('content-label')}>Agree 54%</div>
          <div className={cn('content-label')}>{targetShare} ETH</div>
          <button
            className={cn('button')}
            onClick={(event) => {
              if (isCheckedIn) return;

              event.preventDefault();
              event.stopPropagation();

              checkInMutation.mutate({
                _signer: signer,
                address: _id,
              });
            }}
          >
            {isCheckedIn ? 'Checked' : 'Check In'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default VoteLongCard;
