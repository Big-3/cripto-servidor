import {Router} from 'express';
import * as pallier from '../controllers/pallier.controller';

const pallierRouter = Router();

pallierRouter.route('/initiate')
	.get(pallier.generateCryptosystem)