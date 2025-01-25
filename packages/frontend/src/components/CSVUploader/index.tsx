import React from 'react';
import { useCSVUploader } from './useCSVUploader';
import { Button, Card } from '@radix-ui/themes';

const CSVUploader = () => {
  const { handleFileChange, handleUpload, error } = useCSVUploader();

  return (
    <Card>
      <h3>Upload CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </Card>
  );
};

export default CSVUploader;
