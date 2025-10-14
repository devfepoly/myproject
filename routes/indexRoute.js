import express from 'express';
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js"
import * as indexController from "../controllers/indexController.js"

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home');
});

//
router.get('/support', authMiddleware, indexController.getSupport);

export default router;
