import {PallierCryptoSystem} from './pallier.model';
import {PrivateKey, PublicKey} from 'paillier-bigint';
import {genRandomString} from "../utils/utils";
import {PallierManager} from "./interfaces/pallierManager";


export class PallierManagerImpl implements PallierManager{
	private pallierMap = new Map();
	private static instance: PallierManagerImpl;

	private constructor() {
		//add initializer??
	}

	public static getInstance(): PallierManagerImpl {
        if (!PallierManagerImpl.instance) {
            PallierManagerImpl.instance = new PallierManagerImpl();
        }

        return PallierManagerImpl.instance;
    }

	// adder
	public addCryptoSystem(pallierSystem: PallierCryptoSystem): string{
		let identifier = genRandomString();

		while(this.pallierMap.has(identifier)){
			identifier = genRandomString();
		}

		this.pallierMap.set(identifier, pallierSystem);

		return identifier;
	}
	
	// Getters
	public getPrivateKey(identifier: string): PrivateKey{
		return this.pallierMap.get(identifier).getPrivateKey();
	}

	public getPublicKey(identifier: string): PublicKey{
		return this.pallierMap.get(identifier).getPublicKey();
	}

	public getEncAdder(identifier: string): bigint{
		return this.pallierMap.get(identifier).getEncAdder();
	}

	public getAdder(identifier: string): bigint{
		return this.pallierMap.get(identifier).getAdder();
	}

	public getEncMultiplicative(identifier: string): bigint{
		return this.pallierMap.get(identifier).getEncMultiplicative();
	}

	public getMultiplicative(identifier: string): bigint{
		return this.pallierMap.get(identifier).getMultiplicative();
	}

	// addition and multiplier
	public addValTo(identifier: string, m: bigint): bigint{
		let system: PallierCryptoSystem = this.pallierMap.get(identifier);
		return system.add(m);
	}

	public addMultiplierTo(identifier: string, m: bigint): bigint{
		let system: PallierCryptoSystem = this.pallierMap.get(identifier);
		return system.multiply(m);
	}

	// Teardown
	public teardown(): void {
		this.pallierMap.clear();
	}
}