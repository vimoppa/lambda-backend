import parseRequestBody from './parseRequestBody';

test('parsed JSON object is returned', () => {
  expect(parseRequestBody('{"a":"b"}')).toEqual({
    a: 'b',
  });
});

test('parsed JSON object is returned', () => {
  expect(parseRequestBody('{}')).toEqual({});
});

test('parsed JSON object is returned', () => {
  expect(parseRequestBody('') instanceof Error).toBeTruthy();
});
