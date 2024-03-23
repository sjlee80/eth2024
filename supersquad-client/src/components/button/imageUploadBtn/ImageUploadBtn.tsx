import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '@/components/button/imageUploadBtn/ImageUploadBtn.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
  onClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ImageUploadBtn = ({ path, setPath, onClick }: Props) => {
  return (
    <div className={cn('container')}>
      <span className={cn('label')}>Upload Image</span>
      <label htmlFor="image" className={cn('button')}>
        +
      </label>
      <input
        type="file"
        id="image"
        style={{ display: 'none' }}
        onChange={onClick}
      />
    </div>
  );
};

export default ImageUploadBtn;
