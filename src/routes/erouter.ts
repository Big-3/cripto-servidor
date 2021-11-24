import {Router} from 'express';
import {generateBothKeys, encryptMessage, decryptMessage} from '../controllers/crypto.controller';


const erouter = Router();

erouter.route('/generateKeys')
	.get(generateBothKeys)

erouter.route('/encrypt')
	.post(encryptMessage)

erouter.route('/decrypt')
	.post(decryptMessage)

export default erouter;