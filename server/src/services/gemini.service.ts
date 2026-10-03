import { GoogleGenerativeAI } from '@google/generative-ai';
import { ANALYSIS_PROMPT } from '../prompts/analysis.prompt';
import { AnalysisResult } from '../types/analysis.types';
import { validateAnalysisResult } from '../utils/analysis-validator';

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public async analyzeText(text: string): Promise<AnalysisResult> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
        },
      });

      const fullPrompt = `${ANALYSIS_PROMPT}\n\n${text}\n\n--- END OF TEXT TO ANALYZE ---`;
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      let textResponse = response.text();

      // Clean up if the model ignored our instruction and wrapped in markdown
      if (textResponse.startsWith('```json')) {
        textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      }

      let parsedData;
      try {
        parsedData = JSON.parse(textResponse);
      } catch (parseError) {
        console.error('Failed to parse Gemini response as JSON:', textResponse);
        throw new Error('Invalid JSON response from AI');
      }

      return validateAnalysisResult(parsedData);
    } catch (error) {
      console.error('Gemini Service Error:', error);
      throw new Error('AI analysis is temporarily unavailable. Please try again.');
    }
  }
}
