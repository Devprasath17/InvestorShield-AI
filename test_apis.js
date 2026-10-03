const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const BACKEND_URL = 'https://investorshield-ai.onrender.com';
const ORIGIN = 'https://investor-shield-ai.vercel.app';

const headers = {
  'Origin': ORIGIN,
  'Content-Type': 'application/json'
};

async function runTests() {
  console.log("Starting API Tests...");
  let historyId = null;

  // 1. Backend Health
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`, { headers });
    const data = await res.json();
    console.log(`Backend Health: ${res.status} - CORS: ${res.headers.get('access-control-allow-origin')}`);
    console.log(data);
  } catch(e) { console.error("Health error:", e); }

  // 2. Text Analysis
  try {
    const text = "🔥 EXCLUSIVE CRYPTO INVESTMENT OPPORTUNITY 🔥\nDeposit ₹5,000 today and our AI trading system will generate ₹25,000 in just 7 days.\nGuaranteed 5X returns with absolutely NO LOSS!\nThis offer is available only for the next 3 hours.\nSend your payment to the wallet address below and start earning immediately:\nhttps://example.com/crypto-invest\nInvite 3 friends and receive an additional ₹10,000 bonus.";
    const res = await fetch(`${BACKEND_URL}/api/analyze/text`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    console.log(`Text Analysis: ${res.status}`);
    if (data.success && data.analysis) {
        console.log("Analysis success! Risk Score:", data.analysis.riskScore);
        
        // 3. History creation (simulate frontend behavior)
        const historyRes = await fetch(`${BACKEND_URL}/api/history`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                inputType: 'text',
                content: text,
                analysisResult: data.analysis
            })
        });
        const historyData = await historyRes.json();
        if (historyData.success) {
            historyId = historyData.analysis._id;
            console.log("History Persistence created:", historyId);
        }
    } else {
        console.log("Analysis failed:", data);
    }
  } catch(e) { console.error("Analysis error:", e); }

  // 4. Learning Center
  try {
    const res = await fetch(`${BACKEND_URL}/api/education/topics`, { headers });
    const data = await res.json();
    console.log(`Learning Center: ${res.status}`);
    if (data.success) {
        console.log(`Loaded ${data.topics.length} topics`);
    }
  } catch(e) { console.error("Learning Center error:", e); }

  // 5. History Detail
  if (historyId) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/history/${historyId}`, { headers });
        const data = await res.json();
        console.log(`History Detail: ${res.status}`);
        if (data.success) console.log("History Detail success");
      } catch(e) { console.error("History Detail error:", e); }

      // 6. History Delete
      try {
        const res = await fetch(`${BACKEND_URL}/api/history/${historyId}`, {
            method: 'DELETE',
            headers
        });
        const data = await res.json();
        console.log(`History Delete: ${res.status}`);
        if (data.success) console.log("History Delete success");
      } catch(e) { console.error("History Delete error:", e); }
  }

  // 7. Dashboard (Get history)
  try {
    const res = await fetch(`${BACKEND_URL}/api/history?limit=20`, { headers });
    const data = await res.json();
    console.log(`Dashboard (History): ${res.status}`);
    if (data.success) console.log(`Loaded ${data.analyses.length} recent analyses`);
  } catch(e) { console.error("Dashboard error:", e); }

  console.log("Done testing APIs.");
}

runTests();
