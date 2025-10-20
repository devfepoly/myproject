import express from 'express';
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js"
import * as indexController from "../controllers/indexController.js"
import upload from "../config/multer.js"

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home');
});

//
router.get('/support', authMiddleware, indexController.getSupport);

router.get('/upload-image', (req, res) => {
  return res.render('uploadImage');
})

router.post('/upload-image', upload.single('image'), (req, res) => {
  return res.json({ success: 'completed' })
})

export default router;
