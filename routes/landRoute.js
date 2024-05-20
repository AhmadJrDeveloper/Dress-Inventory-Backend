// GoalRoute.js
import {
    addLand,
    getAllLands,
    getOneLand,
    updateLand,
    deleteLand,
    getLandByBranchId
} from '../controllers/landController.js';
import { Router } from 'express';

const router = Router();

router.post('', addLand);
router.get('', getAllLands);
router.get('/:id', getOneLand);
router.get('/branchId/:branch_id', getLandByBranchId);
router.put('/:id', updateLand);
router.delete('/:id', deleteLand);

export default router;