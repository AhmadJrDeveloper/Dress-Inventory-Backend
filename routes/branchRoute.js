// GoalRoute.js
import {
    addBranch,
    getAllBranches,
    getOneBranch,
    updateBranch,
    deleteBranch
} from '../controllers/branchController.js';
import { Router } from 'express';

const router = Router();

router.post('', addBranch);
router.get('', getAllBranches);
router.get('/:id', getOneBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

export default router;