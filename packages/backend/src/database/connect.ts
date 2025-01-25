import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || 'http://localhost:3000');
  } catch (error) {
    process.exit(1);
  }
};

export default connectToDatabase;
