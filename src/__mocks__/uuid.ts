/* eslint-disable-next-line import/no-import-module-exports */
import { randomFillSync } from 'crypto';

jest.mock('crypto');

const uuidVar = jest.requireActual('uuid');

// Uses ArrayLike to admit Uint8 and co.
type InputBuffer = ArrayLike<number>;

interface RandomOptions {
  /** `Array` of 16 random bytes (0-255) */
  random?: InputBuffer | undefined;
}
interface RngOptions {
  /** Alternative to `options.random`, a `Function` that returns an `Array` of 16 random bytes (0-255) */
  rng?: (() => InputBuffer) | undefined;
}

interface V1BaseOptions {
  /** RFC "node" field as an `Array[6]` of byte values (per 4.1.6) */
  node?: InputBuffer | undefined;
  /** RFC "clock sequence" as a `Number` between 0 - 0x3fff */
  clockseq?: number | undefined;
  /** RFC "timestamp" field (`Number` of milliseconds, unix epoch) */
  msecs?: number | Date | undefined;
  /** RFC "timestamp" field (`Number` of nanoseconds to add to msecs, should be 0-10,000) */
  nsecs?: number | undefined;
}
interface V1RandomOptions extends V1BaseOptions, RandomOptions {}
interface V1RngOptions extends V1BaseOptions, RngOptions {}

export type V1Options = V1RandomOptions | V1RngOptions;
export type V4Options = RandomOptions | RngOptions;

// let count = 1;
// let limit = 256;
//
// function countAndReset() {
//   if (count >= limit) {
//     count = 1;
//   }
//   count += 1;
//
//   return count;
// }

/* eslint-disable-next-line import/no-commonjs */
module.exports = {
  ...uuidVar,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  v4: jest.fn((_options: V4Options | null | undefined) => {
    // TODO: fix predictable array buffer
    const predictable = randomFillSync(Buffer.alloc(16))
      .toString('base64')
      .split('')
      .map(v => v.charCodeAt(0));

    return uuidVar.v4({ random: predictable });
  }),
};
