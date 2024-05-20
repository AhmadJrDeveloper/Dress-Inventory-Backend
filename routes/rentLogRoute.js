// GoalRoute.js
import {
    addRentLog, 
    getAllRentLogs,
    getOneRentLog,
    updateRentLog,
    deleteRentLog,
    getRentLogByBranchId
} from '../controllers/rentLogController.js';
import { Router } from 'express';

const router = Router();

router.post('/', addRentLog);
router.get('/', getAllRentLogs);
router.get('/branchId/:branch_id', getRentLogByBranchId);
router.get('/:id', getOneRentLog);
router.put('/:id', updateRentLog);
router.delete('/:id', deleteRentLog);

export default router;