import { Headers, JSONType, Response, ResponseOptions } from './types';

function lambdaResponse({ body, statusCode, cacheTTL, allowCORS = false, headers }: ResponseOptions) {
  const response: Response = {
    statusCode,
    body: JSON.stringify(body),
  };
  response.headers = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (allowCORS && response.headers['Access-Control-Allow-Origin'] === undefined) {
    response.headers['Access-Control-Allow-Origin'] = '*';
  }
  if (cacheTTL !== undefined) {
    response.headers['Cache-Control'] = `max-age=${cacheTTL}`;
  }

  response.headers['Content-Type'] = 'application/json';

  return response;
}

export function errorResponse(
  body: { message: string; field?: string; fatal?: boolean },
  options?: { statusCode?: number },
) {
  return lambdaResponse({ body, statusCode: options?.statusCode ?? 400, allowCORS: true });
}

// TTL must be in seconds
export function successResponse(
  json: JSONType,
  options?: { statusCode?: number; cacheTTL?: number; headers?: Headers },
) {
  return lambdaResponse({
    body: json,
    allowCORS: true,
    statusCode: options?.statusCode ?? 200,
    cacheTTL: options?.cacheTTL ?? undefined,
    headers: options?.headers ?? null,
  });
}

export function corsSuccessResponse(json: JSONType) {
  return lambdaResponse({
    body: json,
    statusCode: 200,
    allowCORS: true,
  });
}

export function getBody(response: string | void | Response) {
  if (response instanceof Object) {
    return JSON.parse(response.body);
  }
  throw new Error('response is not of the correct type, this should never happen');
}

export function credentialsCorsHeaders(
  headers: AWSLambda.APIGatewayEvent['headers'],
): AWSLambda.APIGatewayEvent['headers'] {
  let origin = headers?.origin ?? headers?.Origin;
  if (!origin) {
    origin = '*'; // Fallback
  }
  const cheaders: AWSLambda.APIGatewayEvent['headers'] = {};
  if (process.env.local === 'true') cheaders['Access-Control-Allow-Origin'] = '*';
  else {
    cheaders['Access-Control-Allow-Origin'] = origin;
    cheaders['Access-Control-Allow-Credentials'] = 'true';
  }

  return cheaders;
}
