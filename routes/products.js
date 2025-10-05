import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';

/* GET products listing. */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

export default router;
