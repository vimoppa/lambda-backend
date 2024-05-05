import crypto from 'crypto';

export const generateRandomChars = (length = 10) => {
  return String(crypto.randomBytes(length).toString('hex'));
};

export function generateRandom10DigitNumber() {
  const min = 1000000000;
  const max = 9999999999;

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNum;
}
