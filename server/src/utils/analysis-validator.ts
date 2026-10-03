import { AnalysisResult, RiskLevel, ClaimStatus } from '../types/analysis.types';

export const validateAnalysisResult = (data: any): AnalysisResult => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Analysis result must be an object');
  }

  const validRiskLevels: RiskLevel[] = [
    'Low Indicators',
    'Potentially Risky',
    'High Number of Risk Indicators',
    'Unable to Assess',
  ];

  const riskLevel = validRiskLevels.includes(data.riskLevel)
    ? data.riskLevel
    : 'Unable to Assess';

  const riskSummary = typeof data.riskSummary === 'string' ? data.riskSummary : '';

  const riskIndicators = Array.isArray(data.riskIndicators)
    ? data.riskIndicators.filter(
        (i: any) =>
          typeof i.type === 'string' &&
          typeof i.severity === 'string' &&
          typeof i.evidence === 'string' &&
          typeof i.explanation === 'string'
      )
    : [];

  const validClaimStatuses: ClaimStatus[] = [
    'Verified',
    'Contradicted',
    'Needs Verification',
    'No Evidence Found',
  ];

  const claims = Array.isArray(data.claims)
    ? data.claims.filter(
        (c: any) =>
          typeof c.id === 'string' &&
          typeof c.text === 'string' &&
          validClaimStatuses.includes(c.status) &&
          typeof c.explanation === 'string'
      )
    : [];

  const evidence = Array.isArray(data.evidence)
    ? data.evidence.filter(
        (e: any) =>
          typeof e.sourceName === 'string' &&
          typeof e.sourceUrl === 'string' &&
          typeof e.relevantText === 'string' &&
          ['Supports', 'Contradicts', 'Context', 'Insufficient Evidence'].includes(e.relationship)
      )
    : [];

  const education = Array.isArray(data.education)
    ? data.education.filter(
        (e: any) =>
          typeof e.topic === 'string' &&
          typeof e.title === 'string' &&
          typeof e.content === 'string'
      )
    : [];

  const safeActions = Array.isArray(data.safeActions)
    ? data.safeActions.filter((a: any) => typeof a === 'string')
    : [];

  return {
    riskLevel,
    riskSummary,
    riskIndicators,
    claims,
    evidence,
    education,
    safeActions,
  };
};
