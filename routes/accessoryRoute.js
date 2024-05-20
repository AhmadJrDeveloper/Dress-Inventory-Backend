// GoalRoute.js
import {
    addAccessory,
    getAllAccessories,
    getOneAccessory,
    updateAccessory,
    deleteAccessory
} from '../controllers/accessoryController.js';
import { Router } from 'express';

const router = Router();

router.post('', addAccessory);
router.get('', getAllAccessories);
router.get('/:id', getOneAccessory);
router.put('/:id', updateAccessory);
router.delete('/:id', deleteAccessory);

export default router;