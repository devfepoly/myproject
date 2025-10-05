import express from 'express';
const router = express.Router();

/* GET categories listing. */
router.get('/', (req, res, next) => {
  res.json([
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Clothing", 
    description: "Fashion and apparel items",
    created_at: "2024-01-16T14:20:00Z"
  },
  {
    id: 3,
    name: "Books",
    description: "Books and educational materials", 
    created_at: "2024-01-17T09:15:00Z"
  }
]);
});

export default router;
