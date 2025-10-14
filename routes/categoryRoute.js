import express from 'express';
import * as categoryController from '../controllers/categoryController.js'
const router = express.Router();

// GET
router.get('/', categoryController.getCategory);

// POST
router.post('/', categoryController.createCategory);

// PUT
router.put('/', categoryController.updateCategory);

// DELETE
router.delete('/', categoryController.deleteCategory);

export default router;
