import express from 'express';
const router = express.Router();
import {register,login,update,logout,checkAuth} from './authcontroller.js'
router.post('/register',register);
router.post('/login',login);
router.put('/update',checkAuth,update);
router.post('/logout',logout);
export default router;