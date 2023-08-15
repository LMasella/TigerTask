import express from 'express';
import { getAllCategories, createCategory, updateCategoryById, deleteCategoryById } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, getAllCategories).post(protect, createCategory);
router.route('/:id').put(protect, updateCategoryById).delete(protect, deleteCategoryById);

export default router;