import { Router, Request, Response } from 'express';
import { uploadCSV, processCSV } from '../utils/csvUploader';

const router = Router();

router.post('/upload', uploadCSV, async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    await processCSV(file.path);

    res.status(200).send('File uploaded and data saved to database');
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }
});

export default router;
