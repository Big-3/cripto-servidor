import {PublicKey, PrivateKey} from "@criptografia/modul-rsa";
import {genRandomString} from "../utils/utils";
import {KeyManager} from "./interfaces/keyManager";

export class KeyManagerImpl implements KeyManager{
	private keyMap = new Map();
	private static instance: KeyManagerImpl;

	private constructor() {
		//add initializer??
	}

	public static getInstance(): KeyManagerImpl {
        if (!KeyManagerImpl.instance) {
            KeyManagerImpl.instance = new KeyManagerImpl();
        }

        return KeyManagerImpl.instance;
    }

	// adder
	public addKeys(privKey: PrivateKey): string{
		let identifier = genRandomString();

		while(this.keyMap.has(identifier)){
			identifier = genRandomString();
		}

		this.keyMap.set(identifier, privKey);

		return identifier;
	}
	
	// Getters
	public getPrivateKey(identifier: string): PrivateKey{
		return this.keyMap.get(identifier);
	}

	public getPublicKey(identifier: string): PublicKey{
		return this.keyMap.get(identifier).getPublicKey();
	}

	// Teardown
	public teardown(): void {
		this.keyMap.clear();
	}
}