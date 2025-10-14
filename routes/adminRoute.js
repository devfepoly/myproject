import express from "express";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();
import * as adminController from '../controllers/adminController.js';

/* Verify admin route by using middleware */ 
router.use(authMiddleware, adminMiddleware);

router.get('/', adminController.getAdmin)

export default router;
