import {Router} from 'express';
import { register, login } from '../controller/user';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;