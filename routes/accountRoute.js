// GoalRoute.js
import {
    addBill,
    getAllBills,
    getOneBill,
    updateBill,
    deleteBill
} from '../controllers/accountController.js';
import { Router } from 'express';

const router = Router();

router.post('', addBill);
router.get('', getAllBills);
router.get('/:id', getOneBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

export default router;