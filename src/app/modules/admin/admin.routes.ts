import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controllers';
import { AdminValidations } from './admin.validations';

const router = express.Router();

router.get('/:id', AdminControllers.getSingleAdmin);
router.get('/', AdminControllers.getAllAdmins);

router.delete('/:id', AdminControllers.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdmin),
  AdminControllers.updateAdmin,
);

export const AdminRoutes = router;
