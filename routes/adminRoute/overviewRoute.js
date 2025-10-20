import express from 'express';
const router = express.Router();
import * as overviewAdminController from '../../controllers/adminController/overviewAdminController.js'

/* GET overview page at admin role */ 
router.get('/', overviewAdminController.getOverviewAdmin)

export default router;
