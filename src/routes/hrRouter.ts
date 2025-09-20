import { Router } from 'express';
import { login, logout } from '../auth/auth.ts';
import { authMiddle } from '../middlewares/authMiddleware.ts';
import { createHr, deleteHr, getHr, updateHr } from '../controller/hrController.ts';

const router: Router = Router();

router.route('/login').post(login);
router.route('/logout').post(logout);

router.route('/createHr').post(createHr);
router.route('/getHr/:id').get(authMiddle, getHr);
router.route('/updateHr/:id').put(authMiddle, updateHr);
router.route('/deleteHr/:id').delete(authMiddle, deleteHr);

export default router;
