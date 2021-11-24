import {Request, Response} from 'express';
import * as bic from 'bigint-conversion';
import {KeyManagerImpl} from '../models/keyManagerImpl';
import {generateKeys, PublicKey, PrivateKey} from '@criptografia/modul-rsa';

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
	return res.status(200).json({encmsg: encmsg});
}


export async function decryptMessage(req: Request, res: Response): Promise<Response>{
	const {identifier, encmsg} = req.body;
	let keyManager = KeyManagerImpl.getInstance();

	const privKey: PrivateKey = await keyManager.getPrivateKey(identifier);
	const c: bigint = bic.base64ToBigint(encmsg);

	const msg = await bic.bigintToText(privKey.decrypt(c));

	return res.status(200).json({msg: msg});
}