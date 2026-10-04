import { EducationItem, RiskIndicator, Claim } from '../types/analysis.types';

const EDUCATION_TEMPLATES: Record<string, EducationItem> = {
  'guaranteed-returns': {
    id: 'guaranteed-returns',
    topic: 'Guaranteed Returns',
    title: 'Understanding Guaranteed Return Claims',
    whyItMatters: 'Promising a fixed or guaranteed return is highly restricted in financial markets because all real investments carry risk.',
    explanation: 'Be cautious when an investment message promises a guaranteed high return, especially over a short period. A promise alone does not prove that an offer is fraudulent, but it is a reason to independently verify the claim before sending money.',
    whatToLookFor: "Use of words like guaranteed. risk-free. or fixed return., The promised return is unusually specific (e.g., 5X in 7 days)., The return is substantially higher than standard market rates.",
    whatToCheck: "Verify the organization independently on official regulatory websites., Check if the entity is registered to offer such returns.",
    safeHabit: 'Verify the investment provider independently through relevant official sources before transferring money.'
  },
  'urgency-pressure': {
    id: 'urgency-pressure',
    topic: 'Urgency / Limited-Time Pressure',
    title: 'Recognizing Urgency and Pressure Tactics',
    whyItMatters: 'Scammers often use artificial urgency to prevent you from taking the time to verify their claims or consult with others.',
    explanation: 'Messages that demand immediate action (like "Act now", "Only 2 slots left") are designed to trigger a fear of missing out (FOMO) and bypass your normal verification habits.',
    whatToLookFor: "Short, arbitrary deadlines (e.g., Offer expires in 1 hour)., Claims of extreme exclusivity or limited availability., Pressure to transfer funds immediately to secure a spot.",
    whatToCheck: "Take a step back and ignore the artificial deadline., Verify the legitimacy of the offer independently.",
    safeHabit: 'Slow down and independently verify the opportunity before making any financial decisions.'
  },
  'regulatory-claims': {
    id: 'regulatory-claims',
    topic: 'Regulatory / Authority Claims',
    title: 'Understanding Regulatory Claims',
    whyItMatters: 'Mentioning a regulatory body like SEBI or RBI does not automatically mean the specific investment is approved or legitimate.',
    explanation: 'Legitimate entities are registered with regulators, but unauthorized operators often falsely use regulatory names and logos to build false trust.',
    whatToLookFor: "Using the logo of a regulator on unofficial documents or social media., Claiming SEBI Approved for specific unregulated schemes., Providing registration numbers that do not match the company name.",
    whatToCheck: "Cross-check the registration number and exact company name on the official regulator website., Verify that the entity is authorized for the specific service they are offering.",
    safeHabit: 'Always verify regulatory claims by visiting the official regulatory website directly.'
  },
  'suspicious-links': {
    id: 'suspicious-links',
    topic: 'Suspicious Links',
    title: 'Checking Links and Websites Safely',
    whyItMatters: 'Fraudulent links can lead to phishing sites designed to steal your credentials or download malicious software.',
    explanation: 'A link may look official but actually direct you to a fake website that mimics a legitimate bank or trading platform.',
    whatToLookFor: "Links with slight misspellings of well-known brands., Use of URL shorteners (like bit.ly) in unsolicited financial messages., Links that ask for sensitive credentials immediately upon clicking.",
    whatToCheck: "Hover over the link to see the actual destination URL., Instead of clicking the link, search for the official organization through a search engine.",
    safeHabit: 'Never click on unverified links in unsolicited financial messages. Navigate to official websites independently.'
  },
  'credential-safety': {
    id: 'credential-safety',
    topic: 'OTP / PIN / Password Requests',
    title: 'Protecting Banking Credentials',
    whyItMatters: 'Your banking credentials (OTPs, PINs, passwords) are the keys to your financial accounts. Legitimate organizations will never ask for them.',
    explanation: 'Scammers often impersonate bank officials or customer support to trick you into revealing your OTP or PIN, claiming it is necessary for verification or to block a fraudulent transaction.',
    whatToLookFor: "Requests to share an OTP over phone, text, or WhatsApp., Being asked to enter a PIN to receive a payment (PINs are only for sending money)., Requests to install screen-sharing applications.",
    whatToCheck: "Stop communicating with anyone asking for your credentials., Contact your bank directly using the official customer service number.",
    safeHabit: 'Never share OTPs, PINs, passwords, or authentication credentials with unknown parties.'
  },
  'unknown-entity': {
    id: 'unknown-entity',
    topic: 'Unknown Investment Entity',
    title: 'Identifying the Actual Organization',
    whyItMatters: 'A professional-looking message or website does not establish the legitimacy of the underlying organization.',
    explanation: 'Many fraudulent schemes operate under names that sound official or similar to well-known financial institutions. It is essential to identify exactly who you are sending money to.',
    whatToLookFor: "No physical address or verifiable contact information provided., The entity cannot be found on official regulatory registries., Payment is requested to a personal bank account rather than a corporate one.",
    whatToCheck: "Search for the entity on official regulatory databases (e.g., SEBI recognized intermediaries)., Check the beneficiary name on the bank transfer screen before confirming payment.",
    safeHabit: 'Verify the identity and registration of the organization independently before engaging.'
  }
};

const EDUCATION_TEMPLATES_TA: Record<string, EducationItem> = {
  'guaranteed-returns': {
    id: 'guaranteed-returns',
    topic: 'உத்தரவாத வருமானம்',
    title: 'உத்தரவாத வருமான கூற்றுகளைப் புரிந்துகொள்வது',
    whyItMatters: 'நிதிச் சந்தைகளில் நிலையான அல்லது உத்தரவாதமான வருமானத்தை உறுதியளிப்பது மிகவும் கட்டுப்படுத்தப்பட்டுள்ளது, ஏனெனில் அனைத்து உண்மையான முதலீடுகளும் அபாயங்களைக் கொண்டுள்ளன.',
    explanation: 'ஒரு முதலீட்டுச் செய்தி உத்தரவாதமான அதிக வருமானத்தை உறுதியளிக்கும் போது எச்சரிக்கையாக இருங்கள். இந்த வாக்குறுதி மட்டுமே மோசடி என்று நிரூபிக்கவில்லை, ஆனால் பணம் அனுப்புவதற்கு முன்பு சரிபார்க்க இது ஒரு காரணம்.',
    whatToLookFor: "உத்தரவாதம், ஆபத்து இல்லாத அல்லது நிலையான வருமானம் போன்ற வார்த்தைகள்., வாக்குறுதியளிக்கப்பட்ட வருமானம் அசாதாரணமாக குறிப்பிட்டதாக இருக்கும் (உதாரணமாக, 7 நாட்களில் 5X)., வழக்கமான சந்தை விகிதங்களை விட அதிக வருமானம்.",
    whatToCheck: "அதிகாரப்பூர்வ ஒழுங்குமுறை இணையதளங்களில் நிறுவனத்தை சுயாதீனமாக சரிபார்க்கவும்., நிறுவனம் அத்தகைய வருமானத்தை வழங்க பதிவு செய்யப்பட்டுள்ளதா என சரிபார்க்கவும்.",
    safeHabit: 'பணம் அனுப்புவதற்கு முன்பு முதலீடு வழங்குநரை அதிகாரப்பூர்வ ஆதாரங்கள் மூலம் சுயாதீனமாக சரிபார்க்கவும்.'
  },
  'urgency-pressure': {
    id: 'urgency-pressure',
    topic: 'அவசரம் / குறுகிய கால அழுத்தம்',
    title: 'அவசரம் மற்றும் அழுத்த தந்திரங்களை அடையாளம் காணுதல்',
    whyItMatters: 'மோசடியாளர்கள் உங்களை சரிபார்க்க விடாமல் தடுக்க அடிக்கடி செயற்கையான அவசரத்தை பயன்படுத்துகின்றனர்.',
    explanation: '"உடனே செயல்படுங்கள்", "2 இடங்கள் மட்டுமே" போன்ற செய்திகள், உங்களை வேகமாக செயல்பட தூண்ட வடிவமைக்கப்பட்டுள்ளன.',
    whatToLookFor: "குறுகிய காலக்கெடு (உதாரணமாக, 1 மணி நேரத்தில் சலுகை முடிகிறது)., மிகவும் குறைவான இடங்கள்., உடனே பணம் அனுப்ப அழுத்தம்.",
    whatToCheck: "செயற்கையான காலக்கெடுவை புறக்கணிக்கவும்., சலுகையின் நம்பகத்தன்மையை சுயாதீனமாக சரிபார்க்கவும்.",
    safeHabit: 'எந்தவொரு நிதி முடிவையும் எடுப்பதற்கு முன்பு வாய்ப்பை சுயாதீனமாக சரிபார்க்கவும்.'
  },
  'regulatory-claims': {
    id: 'regulatory-claims',
    topic: 'ஒழுங்குமுறை / அதிகார கூற்றுகள்',
    title: 'ஒழுங்குமுறை கூற்றுகளைப் புரிந்துகொள்வது',
    whyItMatters: 'SEBI அல்லது RBI போன்ற ஒழுங்குமுறை அமைப்பை குறிப்பிடுவதால் மட்டுமே அந்த குறிப்பிட்ட முதலீடு அங்கீகரிக்கப்பட்டது அல்லது நம்பகமானது என்று அர்த்தமல்ல.',
    explanation: 'உண்மையான நிறுவனங்கள் பதிவு செய்யப்பட்டுள்ளன, ஆனால் அங்கீகரிக்கப்படாதவர்கள் பெரும்பாலும் பொய்யான நம்பிக்கையை உருவாக்க ஒழுங்குமுறை பெயர்களையும் லோகோக்களையும் தவறாக பயன்படுத்துகின்றனர்.',
    whatToLookFor: "அதிகாரப்பூர்வமற்ற ஆவணங்கள் அல்லது சமூக ஊடகங்களில் ஒழுங்குமுறையாளரின் லோகோவை பயன்படுத்துவது., அங்கீகரிக்கப்படாத திட்டங்களுக்கு SEBI அங்கீகாரம் பெற்றதாகக் கூறுவது., நிறுவனத்தின் பெயருடன் பொருந்தாத பதிவு எண்களை வழங்குவது.",
    whatToCheck: "அதிகாரப்பூர்வ ஒழுங்குமுறை இணையதளத்தில் பதிவு எண் மற்றும் நிறுவனத்தின் பெயரை சரிபார்க்கவும்., அவர்கள் வழங்கும் சேவைக்கு நிறுவனம் அங்கீகாரம் பெற்றுள்ளதா என சரிபார்க்கவும்.",
    safeHabit: 'எப்போதும் அதிகாரப்பூர்வ ஒழுங்குமுறை இணையதளத்திற்குச் சென்று ஒழுங்குமுறை கூற்றுகளை சரிபார்க்கவும்.'
  },
  'suspicious-links': {
    id: 'suspicious-links',
    topic: 'சந்தேகத்திற்குரிய இணைப்புகள்',
    title: 'இணைப்புகள் மற்றும் இணையதளங்களை பாதுகாப்பாக சரிபார்த்தல்',
    whyItMatters: 'மோசடியான இணைப்புகள் உங்கள் நற்சான்றிதழ்களைத் திருட அல்லது தீங்கிழைக்கும் மென்பொருளைப் பதிவிறக்க வடிவமைக்கப்பட்ட இணையதளங்களுக்கு உங்களை அழைத்துச் செல்லலாம்.',
    explanation: 'ஒரு இணைப்பு அதிகாரப்பூர்வமாகத் தோன்றலாம் ஆனால் உண்மையில் ஒரு உண்மையான வங்கி அல்லது வர்த்தக தளத்தைப் போன்ற போலி இணையதளத்திற்கு உங்களை அழைத்துச் செல்லலாம்.',
    whatToLookFor: "நன்கு அறியப்பட்ட பிராண்டுகளின் சிறிய எழுத்துப் பிழைகள் கொண்ட இணைப்புகள்., கேட்கப்படாத செய்திகளில் URL குறுக்கிகளைப் (bit.ly போன்றவை) பயன்படுத்துதல்., கிளிக் செய்தவுடன் உணர்திறன் நற்சான்றிதழ்களைக் கேட்கும் இணைப்புகள்.",
    whatToCheck: "உண்மையான URL ஐப் பார்க்க இணைப்பின் மீது ஹோவர் செய்யவும்., இணைப்பைக் கிளிக் செய்வதற்குப் பதிலாக, தேடுபொறி மூலம் அதிகாரப்பூர்வ நிறுவனத்தைத் தேடுங்கள்.",
    safeHabit: 'கேட்கப்படாத நிதிச் செய்திகளில் சரிபார்க்கப்படாத இணைப்புகளை ஒருபோதும் கிளிக் செய்ய வேண்டாம். அதிகாரப்பூர்வ இணையதளங்களுக்கு நேரடியாகச் செல்லவும்.'
  },
  'credential-safety': {
    id: 'credential-safety',
    topic: 'OTP / PIN / கடவுச்சொல் கோரிக்கைகள்',
    title: 'வங்கி நற்சான்றிதழ்களைப் பாதுகாத்தல்',
    whyItMatters: 'உங்கள் வங்கி நற்சான்றிதழ்கள் (OTP கள், PIN கள், கடவுச்சொற்கள்) உங்கள் நிதிக் கணக்குகளுக்கான சாவிகளாகும். உண்மையான நிறுவனங்கள் அவற்றை ஒருபோதும் கேட்க மாட்டார்கள்.',
    explanation: 'மோசடியாளர்கள் பெரும்பாலும் வங்கி அதிகாரிகள் அல்லது வாடிக்கையாளர் ஆதரவைப் போல ஆள்மாறாட்டம் செய்து உங்கள் OTP அல்லது PIN ஐ வெளிப்படுத்த உங்களை ஏமாற்றுகிறார்கள்.',
    whatToLookFor: "போன், உரைச் செய்தி அல்லது WhatsApp மூலம் OTP ஐப் பகிரக் கோருவது., பணம் பெற PIN ஐ உள்ளிடுமாறு கேட்கப்படுவது (PIN கள் பணம் அனுப்புவதற்கு மட்டுமே)., ஸ்கிரீன் பகிர்வு பயன்பாடுகளை நிறுவுவதற்கான கோரிக்கைகள்.",
    whatToCheck: "உங்கள் நற்சான்றிதழ்களைக் கேட்கும் எவருடனும் தொடர்புகொள்வதை நிறுத்துங்கள்., அதிகாரப்பூர்வ வாடிக்கையாளர் சேவை எண்ணைப் பயன்படுத்தி உங்கள் வங்கியை நேரடியாகத் தொடர்பு கொள்ளுங்கள்.",
    safeHabit: 'அறியாத நபர்களுடன் OTP கள், PIN கள், கடவுச்சொற்கள் அல்லது அங்கீகார நற்சான்றிதழ்களை ஒருபோதும் பகிர வேண்டாம்.'
  },
  'unknown-entity': {
    id: 'unknown-entity',
    topic: 'தெரியாத முதலீட்டு நிறுவனம்',
    title: 'உண்மையான நிறுவனத்தை அடையாளம் காணுதல்',
    whyItMatters: 'ஒரு தொழில்முறை செய்தி அல்லது இணையதளம் அமைப்பின் நம்பகத்தன்மையை நிறுவாது.',
    explanation: 'பல மோசடி திட்டங்கள் அதிகாரப்பூர்வமானதாகத் தோன்றும் பெயர்களில் செயல்படுகின்றன. நீங்கள் யாருக்கு பணம் அனுப்புகிறீர்கள் என்பதை சரியாக அடையாளம் காண்பது அவசியம்.',
    whatToLookFor: "உடல் முகவரி அல்லது சரிபார்க்கக்கூடிய தொடர்புத் தகவல் வழங்கப்படவில்லை., அதிகாரப்பூர்வ ஒழுங்குமுறை பதிவேடுகளில் நிறுவனத்தைக் காண முடியாது., கார்ப்பரேட் கணக்கிற்குப் பதிலாக தனிப்பட்ட வங்கிக் கணக்கிற்கு பணம் கேட்கப்படுகிறது.",
    whatToCheck: "அதிகாரப்பூர்வ ஒழுங்குமுறை தரவுத்தளங்களில் நிறுவனத்தைத் தேடுங்கள்., பணம் செலுத்துவதை உறுதிப்படுத்துவதற்கு முன் வங்கி பரிமாற்றத் திரையில் பயனாளியின் பெயரைச் சரிபார்க்கவும்.",
    safeHabit: 'ஈடுபடுவதற்கு முன் அமைப்பின் அடையாளம் மற்றும் பதிவை சுயாதீனமாக சரிபார்க்கவும்.'
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

    const templates = language === 'ta' ? EDUCATION_TEMPLATES_TA : EDUCATION_TEMPLATES;
    const education: EducationItem[] = finalTopics.map(id => templates[id]);
    
    return education;
  }

  public getAllTopics(language: string = 'en'): EducationItem[] {
    const templates = language === 'ta' ? EDUCATION_TEMPLATES_TA : EDUCATION_TEMPLATES;
    return Object.values(templates);
  }
}

export const educationService = new EducationService();
