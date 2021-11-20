import * as utils from "../src/utils/utils";
import {expect} from 'chai';
describe("Utils TEST", function(){
	describe(`Generate Random String`, function(){
		it(`Should generate a typeof String`, function(){
			let str: String = utils.genRandomString();
			expect(true).to.equal(typeof str === "string");
		})
	});
})