export default function parseRequestBody<T extends Record<string, any>>(rawBody: null | string): Error | T {
  if (rawBody === null) {
    return Error('No message body was provided');
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch (e) {
    return Error(e);
  }

  console.debug({ body });
  return body;
}
