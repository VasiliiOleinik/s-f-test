import fs from 'fs';
import path from 'path';

export const uploadFile = async (file: any): Promise<string> => {
  if (!file) {
    throw new Error('File not received by server!');
  }

  const { createReadStream, filename } = await file;
  const uploadDir = path.join(__dirname, '../../uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);

  return new Promise((resolve, reject) => {
    const stream = createReadStream();
    const writeStream = fs.createWriteStream(filePath);

    stream.pipe(writeStream);

    writeStream.on('finish', () => {
      writeStream.close();
      resolve(filePath);
    });

    writeStream.on('error', (error) => {
      reject(new Error(`Error saving file: ${error.message}`));
    });
  });
};
