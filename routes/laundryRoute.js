// GoalRoute.js
import {
    addLaundry,
    getAllLaundries,
    getOneLaundry,
    updateLaundry,
    deleteLaundry,
    getLaundryByBranchId
} from '../controllers/laundryController.js';
import { Router } from 'express';

const router = Router();

router.post('', addLaundry);
router.get('', getAllLaundries);
router.get('/:id', getOneLaundry);
router.get('/branch/:branch_id', getLaundryByBranchId);
router.put('/:id', updateLaundry);
router.delete('/:id', deleteLaundry);

export default router;