import {Request, Response} from 'express';
import {KeyManagerImpl} from '../models/keyManagerImpl';
import {generateKeys, PublicKey, PrivateKey} from '@criptografia/modul-rsa';
import * as sha from 'object-sha';
import * as bic from 'bigint-conversion';

export async function generateBothKeys(req: Request, res: Response): Promise<Response>{
	const n_bits = req.query.nbits; // https://<ip>/api/generateKeys?nbits=512
	let keyManager = KeyManagerImpl.getInstance();

	//generate privateKey and add it to the list
	const privKey: PrivateKey = await generateKeys();
	const identifier: string = await keyManager.addKeys(privKey);

	const pubKey: PublicKey = privKey.getPublicKey();
	const keyBody = {
		identifier: identifier,
		e: bic.bigintToBase64(pubKey.getExpE()),
		n: bic.bigintToBase64(pubKey.getModN())
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

export async function signMessage(req: Request, res: Response): Promise<Response>{
	const {identifier, msg} = req.body;
	let keyManager = KeyManagerImpl.getInstance();

	const privKey: PrivateKey = await keyManager.getPrivateKey(identifier);

	const digest: string = await sha.digest(msg, 'SHA-256');

	const hash: bigint = bic.textToBigint(digest);
	const signature: string = await bic.bigintToBase64(privKey.sign(hash));

	return res.status(200).json({signature: signature});
}

export async function verifyMessage(req: Request, res: Response): Promise<Response>{
	const {identifier, signature} = req.body;
	let keyManager = KeyManagerImpl.getInstance();

	const privKey: PrivateKey = await keyManager.getPrivateKey(identifier);
	const pubKey: PublicKey = privKey.getPublicKey();

	const hash: bigint = await bic.base64ToBigint(signature);
	const digest: string = await bic.bigintToText(pubKey.verify(hash));

	return res.status(200).json({digest: digest});
}