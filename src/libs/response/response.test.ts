import { errorResponse } from '.';

test('errorResponse works with both field and without', () => {
  expect(errorResponse({ message: 'supp', field: 'email' })).toMatchInlineSnapshot(`
    {
      "body": "{"message":"supp","field":"email"}",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      "statusCode": 400,
    }
  `);
  expect(errorResponse({ message: 'supp' })).toMatchInlineSnapshot(`
    {
      "body": "{"message":"supp"}",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      "statusCode": 400,
    }
  `);
  expect(errorResponse({ message: 'supp', field: undefined }).body).toEqual(
    JSON.stringify({
      message: 'supp',
    }),
  );
});
