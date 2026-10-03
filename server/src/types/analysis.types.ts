export type RiskLevel =
  | 'Low Indicators'
  | 'Potentially Risky'
  | 'High Number of Risk Indicators'
  | 'Unable to Assess';

export type ClaimStatus =
  | 'Verified'
  | 'Contradicted'
  | 'Needs Verification'
  | 'No Evidence Found';

export interface RiskIndicator {
  type: string;
  severity: string;
  evidence: string;
  explanation: string;
}

export interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  explanation: string;
  evidence?: Evidence[];
}

export interface Evidence {
  sourceName: string;
  sourceUrl: string;
  relevantText: string;
  relationship: 'Supports' | 'Contradicts' | 'Context' | 'Insufficient Evidence';
  isOfficial?: boolean;
}

export interface EducationItem {
  id: string;
  topic: string;
  title: string;
  whyItMatters: string;
  explanation: string;
  warningSigns: string[];
  whatToCheck: string[];
  safeHabit: string;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  riskSummary: string;
  riskIndicators: RiskIndicator[];
  claims: Claim[];
  evidence: Evidence[];
  education: EducationItem[];
  safeActions: string[];
}
