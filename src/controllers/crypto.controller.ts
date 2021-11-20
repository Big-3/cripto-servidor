import {Request, Response} from 'express';
import {generateKeys, PublicKeys, PrivateKey} from '@criptografia/modul-rsa';

export async function generateBothKeys(req: Request, res: Response): Promise<Response>{
	const n_bits = req.query.nbits;

	await generateKeys(nbits=n_bits).then(
		(value) => {
			
		});
}