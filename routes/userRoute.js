import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import * as userController from '../controllers/userController.js';

/* GET user overall page. */
router.get('/', authMiddleware, userController.getUserOverall)

/* POST update profile */
router.post('/update', authMiddleware, userController.updateUserProfile)

export default router;
