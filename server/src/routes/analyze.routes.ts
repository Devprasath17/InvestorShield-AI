import { Router } from 'express';
import { analyzeText, analyzeImage } from '../controllers/analyze.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.post('/text', analyzeText);
router.post('/image', upload.single('image'), analyzeImage);

export default router;
