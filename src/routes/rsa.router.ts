import {Router} from 'express';
import * as rsa from '../controllers/rsa.controller';


const rsaRouter = Router();

rsaRouter.route('/generateKeys')
	.get(rsa.generateBothKeys)

rsaRouter.route('/encrypt')
	.post(rsa.encryptMessage)

rsaRouter.route('/decrypt')
	.post(rsa.decryptMessage)

rsaRouter.route('/sign')
	.post(rsa.signMessage)

rsaRouter.route('/verify')
	.post(rsa.verifyMessage)

export default rsaRouter;