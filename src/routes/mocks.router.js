import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

// aca defino las rutas de mocks para pruebas
router.get('/mockingpets', mocksController.getMockingPets);
router.get('/mockingusers', mocksController.getMockingUsers);
router.post('/generateData', mocksController.generateData);

export default router;
