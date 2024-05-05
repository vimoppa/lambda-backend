import crypto from 'crypto';

const algorithm = process.env.ALGORITHM;
const secretKey = process.env.ALGORITHM_SK;

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    key: iv.toString('hex'),
    hash: encrypted.toString('hex'),
  };
};

export const decrypt = (hash: string, hashKey: string) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hashKey, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

  return decrpyted.toString();
};
