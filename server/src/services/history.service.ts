import mongoose from 'mongoose';
import { Analysis, IAnalysis } from '../models/Analysis';
import { isDatabaseConnected } from '../config/database';

export class HistoryService {
  async createAnalysis(data: Partial<IAnalysis>): Promise<IAnalysis | null> {
    if (!isDatabaseConnected) {
      console.warn('⚠️ Database not connected. Analysis history was not saved.');
      return null;
    }

    try {
      // Clean up sensitive fields before saving
      const safeData = {
        ...data,
        // Shorten the input preview if it's too long
        inputPreview: data.inputPreview?.substring(0, 500) + (data.inputPreview && data.inputPreview.length > 500 ? '...' : ''),
      };

      const newAnalysis = new Analysis(safeData);
      return await newAnalysis.save();
    } catch (error) {
      console.error('❌ Failed to save analysis history:', (error as Error).message);
      return null;
    }
  }

  async getAnalysisHistory(limit: number = 20): Promise<IAnalysis[]> {
    if (!isDatabaseConnected) {
      throw new Error('Database is currently unavailable.');
    }

    try {
      return await Analysis.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v')
        .exec();
    } catch (error) {
      console.error('❌ Failed to fetch analysis history:', (error as Error).message);
      throw new Error('Unable to retrieve analysis history.');
    }
  }

  async getAnalysisById(id: string): Promise<IAnalysis | null> {
    if (!isDatabaseConnected) {
      throw new Error('Database is currently unavailable.');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid analysis ID.');
    }

    try {
      return await Analysis.findById(id).select('-__v').exec();
    } catch (error) {
      console.error(`❌ Failed to fetch analysis ${id}:`, (error as Error).message);
      throw new Error('Unable to retrieve analysis details.');
    }
  }

  async deleteAnalysis(id: string): Promise<boolean> {
    if (!isDatabaseConnected) {
      throw new Error('Database is currently unavailable.');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid analysis ID.');
    }

    try {
      const result = await Analysis.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error(`❌ Failed to delete analysis ${id}:`, (error as Error).message);
      throw new Error('Unable to delete analysis.');
    }
  }
}

export const historyService = new HistoryService();
