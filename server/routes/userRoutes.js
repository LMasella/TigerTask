import express from 'express';
import { authUser, registerUser, logoutUser, getAllUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, getAllUsers).post(protect, registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;