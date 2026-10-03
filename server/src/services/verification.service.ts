import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { Claim, ClaimStatus, Evidence } from '../types/analysis.types';

export class VerificationService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    // We use googleSearch tool for grounding
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      tools: [{ googleSearch: {} } as any],
      systemInstruction: `You are an evidence interpretation assistant for Indian investors.
You MUST use only the supplied source evidence from Google Search.
Do not use unsupported background knowledge as evidence.
Do not invent sources.
Do not invent URLs.
Do not invent quotations.
Do not infer regulatory approval from the presence of a regulator's name.
Do not treat absence of evidence as proof of falsity.
Do not make legal determinations.
If evidence is insufficient, return Needs Verification or No Evidence Found.`,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            status: {
              type: SchemaType.STRING,
              description: 'The verification status of the claim based purely on searched evidence. Must be one of: Verified, Contradicted, Needs Verification, No Evidence Found'
            },
            explanation: {
              type: SchemaType.STRING,
              description: 'Why this status was chosen, referencing the retrieved facts.'
            },
            relevantText: {
              type: SchemaType.STRING,
              description: 'Your interpretation of the retrieved source that supports or contradicts the claim. Do not invent verbatim quotes unless they are in the search snippet.'
            },
            relationship: {
              type: SchemaType.STRING,
              description: 'How the evidence relates to the claim. Must be one of: Supports, Contradicts, Context, Insufficient Evidence'
            }
          },
          required: ['status', 'explanation', 'relationship']
        }
      }
    });
  }

  public async verifyClaims(claims: Claim[]): Promise<Claim[]> {
    // Limit to max 5 claims to prevent excessive API calls
    const verifiableClaims = claims.slice(0, 5);
    const results: Claim[] = [];

    for (const claim of claims) {
      if (!verifiableClaims.some(c => c.id === claim.id)) {
        // Skip verification for excess claims, keep original status
        results.push(claim);
        continue;
      }

      try {
        const verifiedClaim = await this.verifySingleClaim(claim);
        results.push(verifiedClaim);
      } catch (error) {
        console.error(`Verification failed for claim ${claim.id}:`, error);
        // Fail gracefully for single claim
        results.push({
          ...claim,
          status: 'Needs Verification',
          explanation: 'Independent verification is temporarily unavailable for this claim.'
        });
      }
    }

    return results;
  }

  private async verifySingleClaim(claim: Claim): Promise<Claim> {
    const prompt = `Analyze and verify this financial claim in the Indian context: "${claim.text}"
If it claims SEBI/RBI registration or approval, look for official records.
If it claims guaranteed returns, search for regulatory warnings regarding guaranteed returns.`;

    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    const metadata = result.response.candidates?.[0]?.groundingMetadata;

    let parsed: any;
    try {
      parsed = JSON.parse(responseText);
    } catch (e) {
      throw new Error("Failed to parse Gemini JSON response");
    }

    const evidenceList: Evidence[] = [];
    
    // Map grounding chunks to evidence
    if (metadata && metadata.groundingChunks && metadata.groundingChunks.length > 0) {
      for (const chunk of metadata.groundingChunks) {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          
          // Use URL parsing for secure domain validation
          let isOfficial = false;
          try {
            const parsedUrl = new URL(chunk.web.uri);
            const hostname = parsedUrl.hostname;
            // Check against allowed official domains with proper boundary
            if (
              hostname === 'sebi.gov.in' ||
              hostname.endsWith('.sebi.gov.in') ||
              hostname === 'rbi.org.in' ||
              hostname.endsWith('.rbi.org.in') ||
              hostname.endsWith('.gov.in') ||
              hostname.endsWith('.nic.in')
            ) {
              isOfficial = true;
            }
          } catch (e) {
            // Invalid URL string
            isOfficial = false;
          }

          evidenceList.push({
            sourceName: chunk.web.title,
            sourceUrl: chunk.web.uri,
            relevantText: parsed.relevantText || parsed.explanation,
            relationship: parsed.relationship || 'Context',
            isOfficial: isOfficial
          });
        }
      }
    }

    // Determine final status
    let status = parsed.status;
    if (evidenceList.length === 0 && status !== 'No Evidence Found') {
      status = 'No Evidence Found';
      parsed.explanation = 'We did not find relevant evidence in the trusted sources searched. No Evidence Found \u2260 False.';
    }

    return {
      ...claim,
      status: status as ClaimStatus,
      explanation: parsed.explanation,
      evidence: evidenceList
    };
  }
}

let verificationServiceInstance: VerificationService | null = null;

export function getVerificationService(): VerificationService {
  if (!verificationServiceInstance) {
    verificationServiceInstance = new VerificationService();
  }
  return verificationServiceInstance;
}
