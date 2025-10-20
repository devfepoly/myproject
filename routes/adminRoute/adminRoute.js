import express from "express";
import adminMiddleware from "../../middlewares/adminMiddleware.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

import { overviewRoute, brandRoute } from "./index.js";

/* Verify admin route by using middleware */ 
router.use(authMiddleware, adminMiddleware);

/* brand route */ 
router.use('/brand', brandRoute);

router.use('/', overviewRoute);

export default router;
