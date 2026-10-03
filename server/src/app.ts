import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDatabase,isDatabaseConnected } from './config/database';


dotenv.config();
connectDatabase();

import analyzeRoutes from './routes/analyze.routes';
import verifyRoutes from './routes/verify.routes';
import educationRoutes from './routes/education.routes';
import historyRoutes from './routes/history.routes';

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*'
}));

app.use(express.json({ limit: '100kb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: { success: false, error: 'Too many requests. Please try again shortly.' }
});

app.get('/api/health', (req: Request, res: Response) => {
  if (isDatabaseConnected()) {
    res.status(200).json({
      status: 'ok',
      message: 'Backend is healthy',
      database: 'connected'
    });
  } else {
    res.status(200).json({
      status: 'degraded',
      message: 'Backend is running but database is unavailable',
      database: 'disconnected'
    });
  }
});

app.use('/api/analyze', apiLimiter, analyzeRoutes);
app.use('/api/verify', apiLimiter, verifyRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/history', apiLimiter, historyRoutes);

export default app;
