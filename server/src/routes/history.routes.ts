import { Router } from 'express';
import { getHistory, getHistoryById, deleteHistory, createHistory } from '../controllers/history.controller';

const router = Router();

router.post('/', createHistory);
router.get('/', getHistory);
router.get('/:id', getHistoryById);
router.delete('/:id', deleteHistory);

export default router;
