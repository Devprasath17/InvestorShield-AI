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
    console.error('Verification Controller Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Independent verification is temporarily unavailable. Please try again.',
    });
  }
};
