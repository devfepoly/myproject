import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

export default router;
