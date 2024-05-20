// GoalRoute.js
import {
    addSell, 
    getAllSells,
    getOneSell,
    updateSell,
    deleteSell,
    getSellByBranchId
} from '../controllers/sellController.js';
import { Router } from 'express';

const router = Router();

router.post('', addSell);
router.get('', getAllSells);
router.get('/:id', getOneSell);
router.get('/branchId/:branch_id', getSellByBranchId);
router.put('/:id', updateSell);
router.delete('/:id', deleteSell);

export default router;