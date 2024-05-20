// GoalRoute.js
import {
    addDress,
    getAllDresses,
    getDressByBranchId,
    updateDress,
    deleteDress,
    getDressById
} from '../controllers/dressController.js';
import { Router } from 'express';

const router = Router();

router.post('', addDress);
router.get('', getAllDresses);
router.get('/id/:id',getDressById )
router.get('/branchId/:branch_id', getDressByBranchId);
router.put('/:id', updateDress);
router.delete('/:id', deleteDress);

export default router;