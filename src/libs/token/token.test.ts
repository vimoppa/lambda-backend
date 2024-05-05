import { decodeToken, encodeToken, randomId } from '.';

test("encoding doesn't generate any unsafe URL characters", () => {
  const data = ['327Yyt32??^'];
  expect(Buffer.from(JSON.stringify(data)).toString('base64')).toContain('/');
  expect(encodeToken(data)).not.toContain('/');
});

test('decoding works well', () => {
  const data = [randomId(), '123', 321];
  expect(decodeToken(encodeToken(data))).toEqual(data);
});

test("randomIds don't repeat and don't contain '=' characters", () => {
  const pastIds: string[] = [];
  for (let i = 0; i < 100; i += 1) {
    const id = randomId();
    expect(pastIds).not.toContain(id);
    expect(id).not.toContain('=');
    pastIds.push(id);
  }
});
