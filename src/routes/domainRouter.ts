import { Router } from 'express';
import { createDomain, deleteDomain, getAllDomain, getDomain, updateDomain } from '../controller/domainController.ts';
import { authMiddle } from '../middlewares/authMiddleware.ts';

const router: Router = Router();

router.route('/create').post(createDomain);
router.route('/get').get(authMiddle,getDomain);
router.route('/getAll').get(authMiddle,getAllDomain);
router.route('/update').put(authMiddle,updateDomain);
router.route('/delete').delete(authMiddle,deleteDomain);

export default router;
