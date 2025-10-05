import express from 'express';
const router = express.Router();

/* GET orderDetails listing. */
router.get('/', (req, res, next) => {
  res.send('list of orderDetails');
});

export default router;
