import { Router } from 'express';
import { verifyClaims } from '../controllers/verify.controller';

const router = Router();

router.post('/', verifyClaims as any);

export default router;
