import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalysis extends Document {
  inputType: 'text' | 'image';
  inputPreview: string;
  extractedText?: string;
  riskLevel: 'Low Indicators' | 'Potentially Risky' | 'High Number of Risk Indicators' | 'Unable to Assess';
  riskSummary: string;
  riskIndicators: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    evidence: string;
    explanation: string;
  }>;
  claims: Array<{
    id: string;
    text: string;
    status: 'Verified' | 'Contradicted' | 'Needs Verification' | 'No Evidence Found';
    explanation: string;
    evidence: Array<{
      sourceName: string;
      sourceUrl: string;
      relevantText: string;
      relationship: 'Supports' | 'Contradicts' | 'Context' | 'Insufficient Evidence';
      isOfficial: boolean;
    }>;
  }>;
  education: Array<{
    topic: string;
    title: string;
    whyItMatters: string;
    whatToLookFor: string;
    whatToCheck: string;
    safeHabit: string;
  }>;
  safeActions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema: Schema = new Schema(
  {
    inputType: {
      type: String,
      enum: ['text', 'image'],
      required: true,
    },
    inputPreview: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
    },
    riskLevel: {
      type: String,
      enum: ['Low Indicators', 'Potentially Risky', 'High Number of Risk Indicators', 'Unable to Assess'],
      required: true,
    },
    riskSummary: {
      type: String,
      required: true,
    },
    riskIndicators: [
      {
        type: { type: String, required: true },
        severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
        evidence: { type: String, required: true },
        explanation: { type: String, required: true },
      },
    ],
    claims: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
        status: {
          type: String,
          enum: ['Verified', 'Contradicted', 'Needs Verification', 'No Evidence Found'],
          required: true,
        },
        explanation: { type: String, required: true },
        evidence: [
          {
            sourceName: { type: String, required: true },
            sourceUrl: { type: String, required: true },
            relevantText: { type: String, required: true },
            relationship: {
              type: String,
              enum: ['Supports', 'Contradicts', 'Context', 'Insufficient Evidence'],
              required: true,
            },
            isOfficial: { type: Boolean, required: true },
          },
        ],
      },
    ],
    education: [
      {
        topic: { type: String, required: true },
        title: { type: String, required: true },
        whyItMatters: { type: String, required: true },
        whatToLookFor: { type: String, required: true },
        whatToCheck: { type: String, required: true },
        safeHabit: { type: String, required: true },
      },
    ],
    safeActions: [{ type: String }],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create an index for faster queries on createdAt descending
AnalysisSchema.index({ createdAt: -1 });

export const Analysis = mongoose.model<IAnalysis>('Analysis', AnalysisSchema);
