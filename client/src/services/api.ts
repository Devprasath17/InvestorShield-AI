import axios from 'axios';
import type { AnalysisResponse } from '../types/analysis.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const analyzeText = async (text: string): Promise<AnalysisResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/analyze/text`, { text });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Unable to connect to the analysis service. Please try again.',
    };
  }
};

export const analyzeImage = async (file: File): Promise<AnalysisResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${API_URL}/api/analyze/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Unable to connect to the analysis service. Please try again.',
    };
  }
};

export const verifyClaims = async (claims: any[]): Promise<{ success: boolean, claims?: any[], error?: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/verify`, { claims });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Unable to connect to the verification service.',
    };
  }
};

export const generateEducation = async (riskIndicators: any[], language: string = 'en'): Promise<{ success: boolean, education?: any[], error?: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/education/personalized`, { riskIndicators, language });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Personalized education is temporarily unavailable.',
    };
  }
};

export const getEducationTopics = async (): Promise<{ success: boolean, topics?: any[], error?: string }> => {
  try {
    const response = await axios.get(`${API_URL}/api/education/topics`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Failed to load learning center topics.',
    };
  }
};

// History APIs
export const createHistory = async (analysisData: any): Promise<{ success: boolean, analysis?: any, error?: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/history`, analysisData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Unable to save analysis history.',
    };
  }
};

export const getHistory = async (limit: number = 20): Promise<{ success: boolean, analyses?: any[], error?: string }> => {
  try {
    const response = await axios.get(`${API_URL}/api/history?limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Unable to retrieve analysis history.',
    };
  }
};

export const getAnalysisById = async (id: string): Promise<{ success: boolean, analysis?: any, error?: string }> => {
  try {
    const response = await axios.get(`${API_URL}/api/history/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Unable to retrieve analysis details.',
    };
  }
};

export const deleteAnalysis = async (id: string): Promise<{ success: boolean, message?: string, error?: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/api/history/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Unable to delete analysis.',
    };
  }
};
