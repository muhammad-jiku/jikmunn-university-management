import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controllers';
import { AdminValidations } from './admin.validations';

const router = express.Router();

router
  .route('/:id')
  .get(AdminControllers.getSingleAdmin)
  .patch(
    validateRequest(AdminValidations.updateAdminZodSchema),
    AdminControllers.updateAdmin,
  )
  .delete(AdminControllers.deleteAdmin);

router.route('/').get(AdminControllers.getAllAdmins);

export const AdminRoutes = router;
