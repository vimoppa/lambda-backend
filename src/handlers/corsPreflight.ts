import { Response } from '../libs/response/types';
import wrap from '../libs/wrap';

const DEFAULT_ALLOWED_HEADERS = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent';

const handler = async (): Promise<Response> => {
  const allowedHeaders = process.env.local === 'true' ? '*' : DEFAULT_ALLOWED_HEADERS;
  return {
    statusCode: 200,
    body: '',
    headers: {
      'cache-control': 'max-age=3600, s-maxage=3600', // Caches preflight req on browser and proxy for 1 hour
      'access-control-allow-methods': 'OPTIONS,GET,POST',
      'access-control-allow-headers': allowedHeaders,
    },
  };
};

export default wrap(handler);
