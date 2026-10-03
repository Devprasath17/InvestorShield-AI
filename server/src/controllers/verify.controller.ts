import { Request, Response } from 'express';
import { getVerificationService } from '../services/verification.service';

export const verifyClaims = async (req: Request, res: Response) => {
  try {
    const { claims } = req.body;

    if (!claims || !Array.isArray(claims)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: claims array is required.',
      });
    }

    if (claims.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: claims array is empty.',
      });
    }
    
    // Check lengths
    if (claims.length > 20) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: maximum 20 claims allowed per request.',
      });
    }

    const verificationService = getVerificationService();
    const verifiedClaims = await verificationService.verifyClaims(claims);

    return res.status(200).json({
      success: true,
      claims: verifiedClaims,
    });
  } catch (error) {
    // Instead of 500, return 200 with fallback data so the pipeline continues
    const fallbackClaims = (req.body.claims || []).map((c: any) => ({
      ...c,
      status: 'Needs Verification',
      explanation: 'Independent verification is temporarily unavailable.'
    }));
    return res.status(200).json({
      success: true,
      claims: fallbackClaims,
    });
  }
};
