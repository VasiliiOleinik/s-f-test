import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_EARTHQUAKES_CSV } from '@/queries';
import { Card, Spinner } from '@radix-ui/themes';

function UploadCSV() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadCSV] = useMutation(UPLOAD_EARTHQUAKES_CSV);

  const handleUpload = async () => {
    if (!file) {
      console.error('Select file first!');
      return;
    }
    setIsLoading(true);
    await uploadCSV({
      variables: { file },
    });
    setIsLoading(false);
  };

  return (
    <Card mt="4">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button onClick={handleUpload}>Upload</button>
        </>
      )}
    </Card>
  );
}

export default UploadCSV;
