import {PublicKey, PrivateKey} from 'paillier-bigint';

export class PallierCryptoSystem{
	private privKey: PrivateKey;
	private pubKey: PublicKey;
	private adder: bigint;
	private multiplicative: bigint;

	// constructor
	constructor(privKey: PrivateKey, pubKey: PublicKey){
		this.privKey = privKey;
		this.pubKey = pubKey;
		this.adder = 0n;
		this.multiplicative = 0n;
	}

	// getters
	public getPublicKey(): PublicKey{
		return this.pubKey;
	}

	public getPrivateKey(): PrivateKey{
		return this.privKey;
	}

	public getEncAdder(): bigint{
		return this.adder;
	}

	public getAdder(): bigint{
		return this.privKey.decrypt(this.multiplicative);
	}

	public getEncMultiplicative(): bigint{
		return this.multiplicative;
	}

	public getMultiplicative(): bigint{
		return this.privKey.decrypt(this.multiplicative);
	}

	// adder
	public add(m: bigint): bigint{
		const pure_adder =  this.privKey.decrypt(this.adder);
		return this.pubKey.addition(pure_adder, m);
	}

	// multiplier
	public multiply(m: bigint): bigint{
		const pure_adder =  this.privKey.decrypt(this.adder);
		return this.pubKey.addition(pure_adder, m);		
	}
}