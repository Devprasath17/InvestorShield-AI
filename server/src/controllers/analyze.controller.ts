import { Request, Response } from 'express';
import { GeminiService } from '../services/gemini.service';
import fs from 'fs';

let geminiService: GeminiService;

const getGeminiService = () => {
  if (!geminiService) {
    geminiService = new GeminiService();
  }
  return geminiService;
};

export const analyzeText = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'Text content is required.',
      });
      return;
    }

    if (text.length > 50000) {
      res.status(400).json({
        success: false,
        error: 'Text content is too large.',
      });
      return;
    }

    const analysis = await getGeminiService().analyzeText(text);

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('Analyze Text Controller Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'We couldn\'t safely process the AI analysis. Please try again.',
    });
  }
};

import { OcrService } from '../services/ocr.service';
const ocrService = new OcrService();

export const analyzeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'Please upload a valid image file.',
      });
      return;
    }

    const imagePath = req.file.path;
    let extractedText = '';

    try {
      try {
        extractedText = await ocrService.extractTextFromImage(imagePath);
      } catch (ocrError: any) {
        res.status(400).json({
          success: false,
          error: ocrError.message || 'Unable to extract text from this image. Try uploading a clearer screenshot or paste the text manually.',
        });
        return;
      }

      if (!extractedText || extractedText.trim() === '') {
        res.status(400).json({
          success: false,
          error: 'No readable text was detected in this image. Try a clearer screenshot or paste the message manually.',
        });
        return;
      }

      const analysis = await getGeminiService().analyzeText(extractedText);

      res.status(200).json({
        success: true,
        extractedText,
        analysis,
      });
    } finally {
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Failed to clean up image:', err);
      });
    }
  } catch (error: any) {
    console.error('Analyze Image Controller Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'We couldn\'t safely process the AI analysis. Please try again.',
    });
  }
};
