const cryptoVar = jest.requireActual('crypto');

let counter = 1;

// eslint-disable-next-line no-underscore-dangle
let __isCounter = true;
// eslint-disable-next-line no-underscore-dangle
function __setCounter(isCounter: boolean = true) {
  __isCounter = isCounter;
}

/* eslint-disable-next-line import/no-commonjs */
module.exports = {
  ...cryptoVar,
  randomFillSync: jest.fn((buf: Buffer) => {
    buf.fill(0);
    buf.writeUInt32BE(__isCounter ? counter : 1, 0);
    // Make each buffer unique
    counter += 1;
    return buf;
  }),
  __setCounter,
};
