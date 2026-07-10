import {registerNewUser, LoginUser} from '../Controllers/auth.js';
import express from 'express';


const router = express.Router();

// Route for user registration
router.post('/register', registerNewUser);
router.post('/login', LoginUser);

export default router;