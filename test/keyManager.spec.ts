import {KeyManagerImpl} from '../src/models/keyManagerImpl';
import {generateKeys, PublicKey, PrivateKey} from "@criptografia/modul-rsa";
import {expect} from 'chai';

describe("KeyManager TEST", function() {;

	let keyManager: KeyManagerImpl;

	before(async () => {
		keyManager = await KeyManagerImpl.getInstance();
	})

	describe(`addKeys() and getPriviateKey()`, function(){
		it("Add a PrivateKey to a Map<string, PrivateKey>. Then it should be able to grab the Key with getPrivateKey()", async function(){
			this.timeout(10000);

			let privKey: PrivateKey = await generateKeys(512);
			const identifier: string = keyManager.addKeys(privKey);

			const result = await keyManager.getPrivateKey(identifier);
			expect(privKey).to.equal(result);
		})
	});

	describe(`addKeys() and getPublicKey()`, function(){
		it("Add a PrivateKey to a Map<string, PrivateKey>. Then it should be able to grab the Key with getPublicKey()", async function(){
			this.timeout(10000);

			let privKey: PrivateKey = await generateKeys(512);
			let pubKey: PublicKey = privKey.getPublicKey();
			
			const identifier: string = keyManager.addKeys(privKey);

			const result = await keyManager.getPublicKey(identifier);
			expect(pubKey).to.equal(result);
		})
	});

	after(async () => {
		await keyManager.teardown();
	})
})