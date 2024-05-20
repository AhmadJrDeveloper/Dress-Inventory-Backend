// RoleRoute.js
import {
    addUser, 
        getAllUser, 
        getOneUser,
        updateUser,
        deleteUser,
        login
        
} from '../controllers/userController.js';
import { Router } from 'express';
import { verifyUser} from '../middleware/auth2.js'

const router = Router();

router.post('',addUser);
router.get('', getAllUser);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login',verifyUser, login);



export default router;