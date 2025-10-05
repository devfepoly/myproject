import express from 'express';
const router = express.Router();

/* GET website listing. */
router.get('/', (req, res, next) => {
  res.send('website route');
});

export default router;
