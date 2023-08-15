import express from 'express';
import { getAllTodos, createTodo, getTodoById, getTodosByCategory, getTodosByCreator, getTodosByAssignee, updateTodoById, deleteTodoById } from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, getAllTodos).post(protect, createTodo);
router.route('/:id').get(protect, getTodoById).put(protect, updateTodoById).delete(protect, deleteTodoById);
router.get('/category/:categoryId', protect, getTodosByCategory);
router.get('/createdby/:userId', protect, getTodosByCreator);
router.get('/assignedto/:userId', protect, getTodosByAssignee);
// router.post('/auth', authUser);
// router.post('/logout', logoutUser);
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;