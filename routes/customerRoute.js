// GoalRoute.js
import {
    addCustomer, 
        getAllCustomers, 
        getOneCustomer,
        updateCustomer,
        deleteCustomer,getCustomerByBranchId
} from '../controllers/customerController.js';
import { Router } from 'express';

const router = Router();

router.post('', addCustomer);
router.get('', getAllCustomers);
router.get('/:id', getOneCustomer);
router.get('/branch/:branch_id', getCustomerByBranchId);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;