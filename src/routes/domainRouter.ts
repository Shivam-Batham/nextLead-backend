import { Router } from 'express';
import { createDomain, deleteDomain, getAllDomain, getDomain, updateDomain } from '../controller/domainController.ts';

const router: Router = Router();

router.route('/create').post(createDomain);
router.route('/get').get(getDomain);
router.route('/getAll').get(getAllDomain);
router.route('/update').put(updateDomain);
router.route('/delete').delete(deleteDomain);

export default router;
