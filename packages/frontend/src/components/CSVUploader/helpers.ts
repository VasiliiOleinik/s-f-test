import axios from 'axios';

export async function uploadFile(formData: FormData): Promise<string> {
  const response = await axios.post('http://localhost:4000/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}
