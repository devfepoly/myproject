import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import * as userController from '../controllers/userController.js';

/* GET user overall page. */
router.get('/', authMiddleware, userController.getUserOverall)

/* GET user info page. */
router.get('/user-info', authMiddleware, userController.getUserInfo)

/* POST update profile */
router.patch("/update", authMiddleware, userController.updateUserProfile);

// POST
router.post("/", userController.createUserT);

export default router;
