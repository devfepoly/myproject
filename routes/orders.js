import express from 'express';
const router = express.Router();

/* GET orders listing. */
router.get('/', (req, res, next) => {
  res.send('list of orders');
});

export default router;
