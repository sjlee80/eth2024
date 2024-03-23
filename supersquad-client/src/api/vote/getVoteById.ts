import { VoteDetail } from '@/types/VoteDetail';
import axios from 'axios';

type Props = {
  id: string;
};

export const getVoteById = async ({
  id,
}: Props): Promise<VoteDetail | null> => {
  try {
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    const response = await axios.get(`/votes/vote-contract/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
