import { Router } from 'express';
import { generateEducation, getAllEducationTopics } from '../controllers/education.controller';

const router = Router();

router.post('/personalized', generateEducation as any);
router.get('/topics', getAllEducationTopics as any);

export default router;
