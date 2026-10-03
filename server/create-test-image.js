const sharp = require('sharp');
const fs = require('fs');

async function createTestImage() {
  const width = 800;
  const height = 400;

  const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill: #000; font-size: 32px; font-weight: bold; font-family: sans-serif; }
        .text { fill: #333; font-size: 24px; font-family: sans-serif; }
      </style>
      <rect width="100%" height="100%" fill="#ffffff" />
      <text x="50" y="80" class="title">SEBI approved investment opportunity!</text>
      <text x="50" y="150" class="text">Invest ₹10,000 today and get ₹50,000 guaranteed in 15 days.</text>
      <text x="50" y="200" class="text">5X Returns in Just 7 Days!</text>
      <text x="50" y="250" class="text">Limited slots available.</text>
      <text x="50" y="300" class="text">Click here to invest now: https://example.com/invest-now</text>
    </svg>
  `;

  await sharp(Buffer.from(svgImage))
    .png()
    .toFile('test-screenshot.png');
    
  console.log('Created test-screenshot.png');
}

createTestImage();
