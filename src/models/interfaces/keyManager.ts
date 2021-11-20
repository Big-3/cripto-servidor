import {PublicKey, PrivateKey} from "@criptografia/modul-rsa";

export interface KeyManager{
		// adder
		public addKeys(privKey?: PrivateKey);
		
		// Getters
		public getPrivateKey(identifier?: string): PrivateKey;
		public getPublicKey(identifier?: string): PublicKey;

		// Teardown
		public teardown();
}