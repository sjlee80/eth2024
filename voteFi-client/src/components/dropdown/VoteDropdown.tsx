'use client';
import classNames from 'classnames/bind';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import styles from '@/components/dropdown/VoteDropdown.module.scss';
import { useOnClickOutside } from '@/hook/useOnClick';

const cn = classNames.bind(styles);

type Props = {
  labelText: string;
  unit: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<string>>;
  list: string[] | number[];
  disable?: boolean;
};

const VoteDropdown = ({
  labelText,
  unit,
  value,
  setValue,
  list,
  disable = true,
}: Props) => {
  const [showList, setShowList] = useState<boolean>(false);
  const outSideRef = useRef<HTMLDivElement | null>(null);

  const handleShowList = () => {
    setShowList(false);
  };

  useOnClickOutside({
    ref: outSideRef,
    handler: handleShowList,
    mouseEvent: 'click',
  });

  return (
    <div className={cn('container')}>
      <span className={cn('labelText')}>{labelText}</span>
      <button
        className={cn('input')}
        onClick={() => {
          setShowList(true);
        }}
      >
        {`${value} ${unit}`}
      </button>
      {showList && (
        <div ref={outSideRef} className={cn('list')}>
          {list.map((item: number | string, index: number) => {
            return (
              <button
                key={index}
                className={cn('item', `${item}` === value && 'selected')}
                onClick={() => {
                  setValue(`${item}`);
                  setShowList(false);
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VoteDropdown;
