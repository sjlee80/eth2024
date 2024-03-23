import axios from 'axios';

type Props = {
  address: string;
  title: string;
  description: string;
  target: string;
  pool: string;
  trade: string;
  creator: string;
  token: string;
  file: File | null;
};

export const setVote = async ({
  address,
  title,
  description,
  target,
  pool,
  trade,
  creator,
  token,
  file,
}: Props) => {
  const formData = new FormData();

  formData.append('address', address);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('target', target);
  formData.append('pool', pool);
  formData.append('trade', trade);
  formData.append('creator', creator);
  formData.append('token', token);

  if (file) {
    formData.append('file', file);
  }
  try {
    const response = await axios.post('/votes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
