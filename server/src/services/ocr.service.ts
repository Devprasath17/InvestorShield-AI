import { createWorker, PSM } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export class OcrService {
  public async extractTextFromImage(imagePath: string): Promise<string> {
    const preprocessedPath = `${imagePath}-preprocessed.png`;

    try {
      // Preprocess image to improve OCR accuracy
      await sharp(imagePath)
        .resize({ width: 1200, withoutEnlargement: true }) // reasonable size for OCR
        .grayscale() // convert to black & white
        .normalize() // enhance contrast
        .sharpen()
        .toFile(preprocessedPath);

      const worker = await createWorker('eng');
      
      // Use PSM.SINGLE_BLOCK (6) which is often better for uniform blocks of text in screenshots
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });

      const { data: { text } } = await worker.recognize(preprocessedPath);
      await worker.terminate();

      return this.cleanExtractedText(text);
    } catch (error) {
      console.error('OCR Extraction Error:', error);
      throw new Error('Unable to extract text from this image. Try uploading a clearer screenshot or paste the text manually.');
    } finally {
      // Clean up temporary files
      if (fs.existsSync(imagePath)) {
        try { fs.unlinkSync(imagePath); } catch (e) { console.error(e); }
      }
      if (fs.existsSync(preprocessedPath)) {
        try { fs.unlinkSync(preprocessedPath); } catch (e) { console.error(e); }
      }
    }
  }

  private cleanExtractedText(text: string): string {
    if (!text) return '';
    return text
      .replace(/\r\n/g, '\n') // Normalize newlines
      .replace(/\n{3,}/g, '\n\n') // Max 2 consecutive newlines
      .replace(/[ \t]{2,}/g, ' ') // Max 1 space horizontally
      .replace(/¥/g, '₹') // Tesseract 'eng' often misreads ₹ as ¥
      .trim();
  }
}
