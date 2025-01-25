import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from './helpers';

export const useCSVUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      setFile(null);
      setError(null);
      location.reload();
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to upload the file');
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  }

  function handleUpload() {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    mutate(formData);
  }

  return {
    handleFileChange,
    handleUpload,
    error,
  };
};
