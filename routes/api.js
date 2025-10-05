import express from 'express';
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res, next) => {
  res.send('api route');
});

export default router;
