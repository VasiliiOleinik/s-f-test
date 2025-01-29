import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_EARTHQUAKES_CSV } from '@/queries';
import { Card } from '@radix-ui/themes';

function UploadCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadCSV] = useMutation(UPLOAD_EARTHQUAKES_CSV);

  const handleUpload = async () => {
    if (!file) {
      console.error("Select file first!");
      return;
    }
  
    await uploadCSV({
      variables: { file },
    });
  };

  return (
    <Card mt="4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </Card>
  );
}

export default UploadCSV;
