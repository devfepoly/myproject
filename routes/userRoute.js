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

router.get("/test", (req, res) => {
    return res.render('home');
})

router.post("/test", (req, res) => {
    
})


export default router;
