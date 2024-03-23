import axios from 'axios';

type Props = {
  id: string;
};

export const getVoteByTarget = async ({ id }: Props) => {
  try {
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    const response = await axios.get(`/votes/target-address/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
