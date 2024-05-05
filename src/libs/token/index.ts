import crypto from 'crypto';

import { v4 } from 'uuid';

import { decodedTokenType, encodeToken, replaceAll, safeEncode } from './encodeToken';

export { encodeToken };

export function encodeJson(data: any): string {
  return safeEncode(Buffer.from(JSON.stringify(data)));
}

export function randomId(lengthBytes = 16): string {
  const buf = Buffer.alloc(lengthBytes);
  return replaceAll(safeEncode(crypto.randomFillSync(buf)), '=', '-');
}

export function decodeToken(token: string): decodedTokenType {
  return JSON.parse(Buffer.from(token, 'base64').toString());
}

export function randomUUID(): string {
  return v4();
}
