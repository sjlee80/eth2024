import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Vote",
      action: 'link',
      target: "https://supersquad-votefi.vercel.app/vote/0x5D83d501c3f6c50fE9891af3486d16A3D29e243F"
    },
    {
      label: "Trade",
      action: 'link',
      target: "https://supersquad-votefi.vercel.app/vote/0x5D83d501c3f6c50fE9891af3486d16A3D29e243F"
    }
  ],
  image: "https://bronze-useful-hummingbird-283.mypinata.cloud/ipfs/QmaxBNrFVZvxAXog5oCc7x1Myp9BtXnHPPfi9WkffNB6t5",
  post_url: "https://supersquad-votefi.vercel.app/vote/0x5D83d501c3f6c50fE9891af3486d16A3D29e243F"
});

export const metadata: Metadata = {
  title: 'Vote.Fi',
  description: "Welcome To Vote.Fi. Get reward through Vote!",
  openGraph: {
    title: 'Vote.Fi',
    description: "Welcome To Vote.Fi. Get reward through Vote!",
    images: ["https://bronze-useful-hummingbird-283.mypinata.cloud/ipfs/QmaxBNrFVZvxAXog5oCc7x1Myp9BtXnHPPfi9WkffNB6t5"]
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Vote.Fi.</h1>
    </>
  );
}