import { Request, Response } from 'express';
import { historyService } from '../services/history.service';

export const createHistory = async (req: Request, res: Response) => {
  try {
    const analysisData = req.body;
    
    // Basic validation
    if (!analysisData.inputType || !analysisData.riskLevel) {
      return res.status(400).json({
        success: false,
        error: 'Invalid analysis data format.'
      });
    }

    const savedAnalysis = await historyService.createAnalysis(analysisData);

    if (!savedAnalysis) {
      // According to requirements, do not fake a successful save
      // but do not crash the pipeline.
      return res.status(503).json({
        success: false,
        error: 'Analysis completed, but history could not be saved.'
      });
    }

    res.json({
      success: true,
      analysis: savedAnalysis
    });
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({
      success: false,
      error: message || 'Unable to save analysis history.'
    });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    
    // Ensure limit is safe
    const safeLimit = isNaN(limit) || limit <= 0 ? 20 : Math.min(limit, 50);

    const analyses = await historyService.getAnalysisHistory(safeLimit);
    
    res.json({
      success: true,
      analyses
    });
  } catch (error) {
    const message = (error as Error).message;
    res.status(503).json({
      success: false,
      error: message || 'Analysis history is temporarily unavailable.'
    });
  }
};

export const getHistoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const analysis = await historyService.getAnalysisById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found.'
      });
    }

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    const message = (error as Error).message;
    
    if (message === 'Invalid analysis ID.') {
      return res.status(400).json({
        success: false,
        error: message
      });
    }

    res.status(503).json({
      success: false,
      error: message || 'Analysis history is temporarily unavailable.'
    });
  }
};

export const deleteHistory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const success = await historyService.deleteAnalysis(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found.'
      });
    }

    res.json({
      success: true,
      message: 'Analysis removed from history.'
    });
  } catch (error) {
    const message = (error as Error).message;
    
    if (message === 'Invalid analysis ID.') {
      return res.status(400).json({
        success: false,
        error: message
      });
    }

    res.status(503).json({
      success: false,
      error: message || 'Analysis history is temporarily unavailable.'
    });
  }
};
