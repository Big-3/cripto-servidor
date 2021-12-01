import {PublicKey, PrivateKey} from 'paillier-bigint';
import {PallierCryptoSystem} from '../pallier.model';

export interface PallierManager{
	//adders
	addCryptoSystem(pallierSystem: PallierCryptoSystem): string;
	addValTo(identifier?: string, m?: bigint): bigint;
	addMultiplierTo(identifier?: string, m?: bigint): bigint;

	//getter
	getPublicKey(identifier?: string): PublicKey;
	getPrivateKey(identifier?: string): PrivateKey;
	getEncAdder(identifier?: string): bigint;
	getAdder(identifier?: string): bigint;
	getEncMultiplicative(identifier?: string): bigint;
	getMultiplicative(identifier?: string): bigint;

	//teardown
	teardown(): void;
}