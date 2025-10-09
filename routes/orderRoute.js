import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import * as orderController from '../controllers/orderController.js'

/* GET order page. */
router.get('/', authMiddleware, orderController.getOrder)

export default router;
