import express from "express";
const router = express.Router();
import * as brandController from '../../controllers/adminController/brandController.js';

/* GET brand with admin role */ 
router.get('/', brandController.getBrand);

export default router;
