import axios from 'axios';

export const getVoteList = async () => {
  try {
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    const response = await axios.get('/votes');
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
