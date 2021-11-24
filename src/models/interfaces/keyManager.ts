import {PublicKey, PrivateKey} from "@criptografia/modul-rsa";

export interface KeyManager{
		// adder
		addKeys(privKey?: PrivateKey): string;
		
		// Getters
		getPrivateKey(identifier?: string): PrivateKey;
		getPublicKey(identifier?: string): PublicKey;

		// Teardown
		teardown(): void;
}