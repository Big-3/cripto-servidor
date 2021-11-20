import * as crypt from "crypto";

export function genRandomString(): string{
	const bytes = crypt.randomBytes(32);
	const msg: string = bytes.toString('base64');

	return msg;
}