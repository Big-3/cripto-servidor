import {Request, Response} from 'express';
import * as bic from 'bigint-conversion';
import {KeyManagerImpl} from '../models/keyManagerImpl';
import {generateKeys, PublicKey, PrivateKey} from '@criptografia/modul-rsa';
import * as crypto from 'crypto';

export async function generateBothKeys(req: Request, res: Response): Promise<Response>{
	const n_bits = req.query.nbits; // https://<ip>/api/generateKeys?nbits=512
	let keyManager = KeyManagerImpl.getInstance();

	//generate privateKey and add it to the list
	const privKey: PrivateKey = await generateKeys();
	const identifier: string = await keyManager.addKeys(privKey);

	const pubKey: PublicKey = privKey.getPublicKey();
	const keyBody = {
		identifier: identifier,
		e: bic.bigintToBase64(pubKey.getExpE())
	};

	// HTTP(s): CODI 201 significa que s'ha pogut crear l'objecte.
	return res.status(201).json(keyBody);
}

export async function encryptMessage(req: Request, res: Response): Promise<Response>{
	/*
	HTTP:
		HEADERS:
			METHOD
			ACCESS
			 ···
		BODY:
		{
			"identifier": "hSUJ23/+asmkdj=",
			"msg": "Hola"
		}
	*/
	const {identifier, msg} = req.body;
	let keyManager = KeyManagerImpl.getInstance();

	const privKey: PrivateKey = await keyManager.getPrivateKey(identifier);
	const pubKey: PublicKey = privKey.getPublicKey();
	const m: bigint = bic.textToBigint(msg);

	const encmsg = await bic.bigintToBase64(pubKey.encrypt(m));

	/*
	{
		"c": "<encmsg>"
	}
	*/

	//Procés de signatura del missatge hash
	const hash: bigint = await bic.base64ToBigint(crypto.createHash('sha1').update(msg).digest('base64'));
	const sign = await bic.bigintToBase64(privKey.sign(hash));

	return res.status(200).json({encmsg: encmsg, sign: sign});

}


export async function decryptMessage(req: Request, res: Response): Promise<Response>{
	const {identifier, encmsg, vald} = req.body;
	let keyManager = KeyManagerImpl.getInstance();

	const privKey: PrivateKey = await keyManager.getPrivateKey(identifier);
	const c: bigint = bic.base64ToBigint(encmsg);

	const msg = await bic.bigintToText(privKey.decrypt(c));

	//Procés de validació de la signatura
	const pubKey: PublicKey = privKey.getPublicKey();
	const validation = await bic.bigintToBase64(pubKey.verify(bic.base64ToBigint(vald)));

	return res.status(200).json({msg: msg, validation: validation});
}

