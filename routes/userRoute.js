import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as userController from '../controllers/userController.js';
const router = express.Router();

/* GET user overall page. */
router.get('/', authMiddleware, userController.getUserOverall)

/* POST update profile */
router.post('/update', authMiddleware, userController.updateUserProfile)

export default router;
