import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getPosts, updatePost } from '../controller/interviewPostController.ts';
import { authMiddle } from '../middlewares/authMiddleware.ts';

const router: Router = Router();

router.route('/createPost').post(authMiddle, createPost);
router.route('/updatePost').put(authMiddle, updatePost);
router.route('/getPosts').get(authMiddle, getPosts);
router.route('/deletePost').delete(authMiddle, deletePost);
router.route('/getAllPosts').get(getAllPosts);
export default router;
