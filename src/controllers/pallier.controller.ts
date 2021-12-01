import {Request, Response} from 'express';
import {PallierManagerImpl} from '../models/pallierManagerImpl';
import {PallierCryptoSystem} from '../models/pallier.model';
import * as pallier from 'paillier-bigint';
import * as bic from 'bigint-conversion';


export async function generateCryptosystem(req: Request, res: Response): Promise<Response>{
	const nbits = req.query.nbits as string; // https://<ip>/api/generateKeys?nbits=512
	let pallierManager = PallierManagerImpl.getInstance();

	if(nbits){
		//generate privateKey and add it to the list
		const keyPair: pallier.KeyPair = await pallier.generateRandomKeys(parseInt(nbits, 10));
		const identifier: string = await pallierManager.addCryptoSystem(new PallierCryptoSystem(keyPair.privateKey, keyPair.publicKey));

		const keyBody = {
			identifier: identifier,
			e: bic.bigintToBase64(keyPair.publicKey.g),
			n: bic.bigintToBase64(keyPair.publicKey.n)
		};

		// HTTP(s): CODI 201 significa que s'ha pogut crear l'objecte.
		return res.status(201).json(keyBody);
	} else { 
		return res.status(400).json({error: "could not create."});
	}
}


export async function addValue(req: Request, res: Response): Promise<Response>{
	const {identifier, val} = req.body;
	let pallierManager = PallierManagerImpl.getInstance();

	// parse val into bigint
	const m: bigint = BigInt(parseInt(val, 10));

	// add and parse
	const cipher: bigint = await pallierManager.addValTo(identifier, m);
	const result: string = await bic.bigintToBase64(cipher);

	return res.status(200).json({result: result});
}


export async function multiplyValue(req: Request, res: Response): Promise <Response>{
	const {identifier, val} = req.body;
	let pallierManager = PallierManagerImpl.getInstance();

	// parse val into bigint
	const m: bigint = BigInt(parseInt(val, 10));

	// add and parse
	const cipher: bigint = await pallierManager.addMultiplierTo(identifier, m);
	const result: string = await bic.bigintToBase64(cipher);

	return res.status(200).json({result: result});	
}


export async function decrypt(req: Request, res: Response): Promise<Response>{
	const {identifier, val} = req.body;
	let pallierManager = PallierManagerImpl.getInstance();

	// parse val into bigint
	const c: bigint = bic.base64ToBigint(val);

	// add and parse
	const m: bigint = await pallierManager.getPrivateKey(identifier).decrypt(c);
	const result: string = await bic.bigintToText(m);

	return res.status(200).json({result: result});		
}