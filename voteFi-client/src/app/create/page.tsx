'use client';
import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '@/app/create/page.module.scss';
import { mintclub } from 'mint.club-v2-sdk';
import VoteInput from '@/components/input/voteInput/VoteInput';
import VoteDropdown from '@/components/dropdown/VoteDropdown';
import CreateVoteBtn from '@/components/button/createBtn/CreateVoteBtn';
import ImageUploadBtn from '@/components/button/imageUploadBtn/ImageUploadBtn';
import { BASE_PRICE } from '@/constant/BASE_PRICE';
import { MAX_SUPPPLY } from '@/constant/MAX_SUPPLY';
import { useSelector } from 'react-redux';
import { getSigner } from '@/redux/slice/Web3Slice';

const cn = classNames.bind(styles);

const CreatePage = () => {
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [basePrice, setBasePrice] = useState<string>('0');
  const [maxSupply, setMaxSupply] = useState<string>('100');
  const [imagePath, setImagePath] = useState<string>('');
  const signer = useSelector(getSigner);
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      // const imageUrl = URL.createObjectURL(imageFile);
      console.log(imageFile);
      const _file = event.target.files?.[0];
      setFile(_file);
      const reader = new FileReader();
      reader.readAsDataURL(_file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    }
  };

  return (
    <main className={cn('container')}>
      <section className={cn('inner', 'margin')}>
        <VoteInput
          type="title"
          placeholder="Some requirement to target..."
          text={title}
          setText={setTitle}
          labelText="Create Vote"
        />
      </section>
      <section className={cn('inner', 'margin')}>
        <VoteInput
          type="desc"
          placeholder="Some requirement to target..."
          text={desc}
          setText={setDesc}
          labelText="Describe about Vote"
        />
      </section>
      <section className={cn('inner', 'margin')}>
        <VoteInput
          type="address"
          placeholder="Some requirement to target..."
          text={target}
          setText={setTarget}
          labelText="Target Address"
        />
      </section>
      <section className={cn('inner', 'margin')}>
        <ImageUploadBtn
          path={imagePath}
          setPath={setImagePath}
          onClick={handleImageChange}
        />
      </section>
      <section className={cn('inner')}>
        <div className={cn('dropdownContainer')}>
          <div className={cn('dropdownInner')}>
            <VoteDropdown
              labelText="Base Price"
              unit="ETH"
              value={basePrice}
              setValue={setBasePrice}
              list={BASE_PRICE}
            />
          </div>
          <div style={{ width: '20px' }} />
          <div className={cn('dropdownInner')}>
            <VoteDropdown
              labelText="Max Supply"
              unit="Amount"
              value={maxSupply}
              setValue={setMaxSupply}
              list={MAX_SUPPPLY}
            />
          </div>
        </div>
      </section>
      <section className={cn('inner', 'button')}>
        <CreateVoteBtn
          title={title}
          target={target}
          description={desc}
          file={file}
          maxSupply={parseInt(maxSupply)}
          signer={signer}
        />
      </section>
    </main>
  );
};

export default CreatePage;
