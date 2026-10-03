import { EducationItem, RiskIndicator, Claim } from '../types/analysis.types';

const EDUCATION_TEMPLATES: Record<string, EducationItem> = {
  'guaranteed-returns': {
    id: 'guaranteed-returns',
    topic: 'Guaranteed Returns',
    title: 'Understanding Guaranteed Return Claims',
    whyItMatters: 'Promising a fixed or guaranteed return is highly restricted in financial markets because all real investments carry risk.',
    explanation: 'Be cautious when an investment message promises a guaranteed high return, especially over a short period. A promise alone does not prove that an offer is fraudulent, but it is a reason to independently verify the claim before sending money.',
    warningSigns: [
      'Use of words like "guaranteed", "risk-free", or "fixed return".',
      'The promised return is unusually specific (e.g., "5X in 7 days").',
      'The return is substantially higher than standard market rates.'
    ],
    whatToCheck: [
      'Verify the organization independently on official regulatory websites.',
      'Check if the entity is registered to offer such returns.'
    ],
    safeHabit: 'Verify the investment provider independently through relevant official sources before transferring money.'
  },
  'urgency-pressure': {
    id: 'urgency-pressure',
    topic: 'Urgency / Limited-Time Pressure',
    title: 'Recognizing Urgency and Pressure Tactics',
    whyItMatters: 'Scammers often use artificial urgency to prevent you from taking the time to verify their claims or consult with others.',
    explanation: 'Messages that demand immediate action (like "Act now", "Only 2 slots left") are designed to trigger a fear of missing out (FOMO) and bypass your normal verification habits.',
    warningSigns: [
      'Short, arbitrary deadlines (e.g., "Offer expires in 1 hour").',
      'Claims of extreme exclusivity or limited availability.',
      'Pressure to transfer funds immediately to secure a spot.'
    ],
    whatToCheck: [
      'Take a step back and ignore the artificial deadline.',
      'Verify the legitimacy of the offer independently.'
    ],
    safeHabit: 'Slow down and independently verify the opportunity before making any financial decisions.'
  },
  'regulatory-claims': {
    id: 'regulatory-claims',
    topic: 'Regulatory / Authority Claims',
    title: 'Understanding Regulatory Claims',
    whyItMatters: 'Mentioning a regulatory body like SEBI or RBI does not automatically mean the specific investment is approved or legitimate.',
    explanation: 'Legitimate entities are registered with regulators, but unauthorized operators often falsely use regulatory names and logos to build false trust.',
    warningSigns: [
      'Using the logo of a regulator on unofficial documents or social media.',
      'Claiming "SEBI Approved" for specific unregulated schemes.',
      'Providing registration numbers that do not match the company name.'
    ],
    whatToCheck: [
      'Cross-check the registration number and exact company name on the official regulator website.',
      'Verify that the entity is authorized for the specific service they are offering.'
    ],
    safeHabit: 'Always verify regulatory claims by visiting the official regulatory website directly.'
  },
  'suspicious-links': {
    id: 'suspicious-links',
    topic: 'Suspicious Links',
    title: 'Checking Links and Websites Safely',
    whyItMatters: 'Fraudulent links can lead to phishing sites designed to steal your credentials or download malicious software.',
    explanation: 'A link may look official but actually direct you to a fake website that mimics a legitimate bank or trading platform.',
    warningSigns: [
      'Links with slight misspellings of well-known brands.',
      'Use of URL shorteners (like bit.ly) in unsolicited financial messages.',
      'Links that ask for sensitive credentials immediately upon clicking.'
    ],
    whatToCheck: [
      'Hover over the link to see the actual destination URL.',
      'Instead of clicking the link, search for the official organization through a search engine.'
    ],
    safeHabit: 'Never click on unverified links in unsolicited financial messages. Navigate to official websites independently.'
  },
  'credential-safety': {
    id: 'credential-safety',
    topic: 'OTP / PIN / Password Requests',
    title: 'Protecting Banking Credentials',
    whyItMatters: 'Your banking credentials (OTPs, PINs, passwords) are the keys to your financial accounts. Legitimate organizations will never ask for them.',
    explanation: 'Scammers often impersonate bank officials or customer support to trick you into revealing your OTP or PIN, claiming it is necessary for verification or to block a fraudulent transaction.',
    warningSigns: [
      'Requests to share an OTP over phone, text, or WhatsApp.',
      'Being asked to enter a PIN to receive a payment (PINs are only for sending money).',
      'Requests to install screen-sharing applications.'
    ],
    whatToCheck: [
      'Stop communicating with anyone asking for your credentials.',
      'Contact your bank directly using the official customer service number.'
    ],
    safeHabit: 'Never share OTPs, PINs, passwords, or authentication credentials with unknown parties.'
  },
  'unknown-entity': {
    id: 'unknown-entity',
    topic: 'Unknown Investment Entity',
    title: 'Identifying the Actual Organization',
    whyItMatters: 'A professional-looking message or website does not establish the legitimacy of the underlying organization.',
    explanation: 'Many fraudulent schemes operate under names that sound official or similar to well-known financial institutions. It is essential to identify exactly who you are sending money to.',
    warningSigns: [
      'No physical address or verifiable contact information provided.',
      'The entity cannot be found on official regulatory registries.',
      'Payment is requested to a personal bank account rather than a corporate one.'
    ],
    whatToCheck: [
      'Search for the entity on official regulatory databases (e.g., SEBI recognized intermediaries).',
      'Check the beneficiary name on the bank transfer screen before confirming payment.'
    ],
    safeHabit: 'Verify the identity and registration of the organization independently before engaging.'
  }
};

const INDICATOR_TOPIC_MAP: Record<string, string> = {
  'Guaranteed Returns': 'guaranteed-returns',
  'Unrealistically High Returns': 'guaranteed-returns',
  'Urgency': 'urgency-pressure',
  'Pressure Tactics': 'urgency-pressure',
  'Regulatory Reference': 'regulatory-claims',
  'Registration Claim': 'regulatory-claims',
  'Suspicious URL': 'suspicious-links',
  'OTP Request': 'credential-safety',
  'PIN Request': 'credential-safety',
  'Unknown Entity': 'unknown-entity',
  'Unverified Entity': 'unknown-entity',
  'Cryptocurrency Request': 'unknown-entity',
  'Unusual Payment Instructions': 'unknown-entity'
};

export class EducationService {
  public generateEducation(riskIndicators: RiskIndicator[], language: string = 'en'): EducationItem[] {
    const selectedTopics = new Set<string>();
    
    // Map indicators to topics
    for (const indicator of riskIndicators) {
      // Find matching topic keys that might be substrings or exact matches
      for (const [key, topicId] of Object.entries(INDICATOR_TOPIC_MAP)) {
        if (indicator.type.toLowerCase().includes(key.toLowerCase()) || 
            indicator.explanation.toLowerCase().includes(key.toLowerCase())) {
          selectedTopics.add(topicId);
        }
      }
    }

    // Fallback if no specific topic matched but there are indicators
    if (selectedTopics.size === 0 && riskIndicators.length > 0) {
       // Check if there's any generic indicator
       if (riskIndicators.some(r => r.type.toLowerCase().includes('return'))) {
         selectedTopics.add('guaranteed-returns');
       } else if (riskIndicators.some(r => r.type.toLowerCase().includes('link') || r.type.toLowerCase().includes('url'))) {
         selectedTopics.add('suspicious-links');
       } else {
         selectedTopics.add('unknown-entity'); // Safe default for unclassified risks
       }
    }

    // Limit to 4 topics to avoid overwhelming the user
    const finalTopics = Array.from(selectedTopics).slice(0, 4);

    const education: EducationItem[] = finalTopics.map(id => EDUCATION_TEMPLATES[id]);
    
    // TODO: If language === 'ta', we could optionally translate using Gemini here,
    // but for now, we return English safely as per instructions.
    
    return education;
  }

  public getAllTopics(): EducationItem[] {
    return Object.values(EDUCATION_TEMPLATES);
  }
}

export const educationService = new EducationService();
