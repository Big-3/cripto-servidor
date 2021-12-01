import {Router} from 'express';
import * as pallier from '../controllers/pallier.controller';

const pallierRouter = Router();

pallierRouter.route('/initiate')
	.get(pallier.generateCryptosystem)

pallierRouter.route('/add')
	.post(pallier.addValue)

pallierRouter.route('/multiply')
	.post(pallier.multiplyValue)

pallierRouter.route('/decrypt')
	.post(pallier.decrypt)

export default pallierRouter;