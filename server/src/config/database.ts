import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI is not configured. Database features will be unavailable.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅Successfully  Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error);
  }
};

export const isDatabaseConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};