import { Request, Response } from 'express';
import { educationService } from '../services/education.service';

export const generateEducation = async (req: Request, res: Response) => {
  try {
    const { riskIndicators, language } = req.body;

    if (!riskIndicators || !Array.isArray(riskIndicators)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: riskIndicators array is required.',
      });
    }

    const education = educationService.generateEducation(riskIndicators, language);

    return res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    console.error('Education Controller Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Personalized education is temporarily unavailable.',
    });
  }
};

export const getAllEducationTopics = async (req: Request, res: Response) => {
  try {
    const topics = educationService.getAllTopics();
    return res.status(200).json({
      success: true,
      topics,
    });
  } catch (error) {
    console.error('Education Controller Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Education topics are temporarily unavailable.',
    });
  }
};
