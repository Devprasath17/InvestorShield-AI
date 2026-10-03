import { GoogleGenerativeAI } from '@google/generative-ai';
import { ANALYSIS_PROMPT } from '../prompts/analysis.prompt';
import { AnalysisResult } from '../types/analysis.types';
import { validateAnalysisResult } from '../utils/analysis-validator';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
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
        } else if (textResponse.startsWith('```')) {
          textResponse = textResponse.replace(/```/g, '').trim();
        }

        let parsedData;
        try {
          parsedData = JSON.parse(textResponse);
        } catch (parseError) {
          console.error('Failed to parse Gemini response as JSON:', textResponse);
          throw new Error('Invalid JSON response from AI');
        }

        return validateAnalysisResult(parsedData);
      } catch (error: any) {
        attempt++;
        const status = error.status || error.response?.status;
        const message = error.message || '';
        
        const isTransient = status === 503 || status === 429 || message.includes('503') || message.includes('429') || message.includes('temporarily unavailable');
        
        if (isTransient && attempt < maxRetries) {
          const backoff = Math.pow(2, attempt) * 500; // 1s, 2s
          console.warn(`Gemini API error (transient). Retrying attempt ${attempt}/${maxRetries} after ${backoff}ms...`);
          await delay(backoff);
          continue;
        }

        console.error('Gemini Service Error on attempt', attempt, ':', error);
        throw new Error('AI analysis is temporarily unavailable. Please try again.');
      }
    }
    
    throw new Error('AI analysis is temporarily unavailable. Please try again.');
  }
}
