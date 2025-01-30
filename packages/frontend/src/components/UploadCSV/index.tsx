import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_EARTHQUAKES, UPLOAD_EARTHQUAKES_CSV } from '@/queries';
import { Card, Spinner } from '@radix-ui/themes';
import client from '@/apollo/client';
import { PAGE, LIMIT } from '@/constants';

function UploadCSV() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadCSV] = useMutation(UPLOAD_EARTHQUAKES_CSV, {
    refetchQueries: [
      {
        query: GET_EARTHQUAKES,
        variables: { pagination: { page: PAGE, limit: LIMIT } },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      client.cache.evict({ fieldName: 'getEarthquakes' });
    },
  });

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
