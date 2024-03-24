import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '@/components/input/voteInput/VoteInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  type: 'title' | 'desc' | 'address';
  placeholder: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  labelText: string;
};

const VoteInput = ({ type, text, setText, labelText, placeholder }: Props) => {
  return (
    <div className={cn('container')}>
      <span className={cn('labelText')}>{labelText}</span>
      {type === 'desc' ? (
        <textarea
          className={cn('textarea')}
          name={type}
          placeholder={placeholder}
          id=""
          rows={30}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      ) : (
        <input
          className={cn('input', type)}
          type="text"
          placeholder={placeholder}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      )}
    </div>
  );
};

export default VoteInput;
