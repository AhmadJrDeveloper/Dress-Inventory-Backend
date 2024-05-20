// GoalRoute.js
import {
    addRent, 
    getAllRents,
    getOneRent,
    updateRent,
    deleteRent
} from '../controllers/rentController.js';
import { Router } from 'express';

const router = Router();

router.post('', addRent);
router.get('', getAllRents);
router.get(':id', getOneRent);
router.put('/:id', updateRent);
router.delete('/:id', deleteRent);

export default router;