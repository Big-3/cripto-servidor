import {PublicKey, PrivateKey} from 'pallier-bigint';

interface PallierManager{
	//adders
	addCryptoSystem(): string;
	addValTo(identifier?: string): void;
	addMultiplierTo(identifier?: string): void;

	//getter
	getPublicKey(identifier?: string): PublicKey;
	getPrivateKey(identifier?: string): PrivateKey;
	getVotes(identifier?: string): string;

	//teardown
	teardown(): void;
}