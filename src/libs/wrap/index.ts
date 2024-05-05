import { credentialsCorsHeaders } from '../response';

import { Event, LambdaFuncType, WrapReturnType } from './types';

function wrap(lambdaFunc: LambdaFuncType): WrapReturnType {
  const handler = async (event: Event) => {
    if ('source' in event) {
      if (event.source === 'serverless-plugin-warmup') {
        return 'pinged';
      }
      throw new Error('Unexpected source');
    }

    console.debug({ context: JSON.stringify(event.requestContext, null, 2) });
    console.debug({ event });
    return lambdaFunc(event).then(response => ({
      ...response,
      headers: {
        ...response.headers,
        ...credentialsCorsHeaders(event.headers),
      },
    }));
  };
  return handler;
}

export default wrap;

export function wrapScheduledLambda(
  lambdaFunc: (event: AWSLambda.ScheduledEvent) => Promise<void>,
): Omit<WrapReturnType, 'pinged'> {
  return lambdaFunc;
}

export function wrapA(lambdaFunc: LambdaFuncType) {
  return async (event: Event) => {
    if ('source' in event) {
      if (event.source === 'serverless-plugin-warmup') {
        return 'pinged';
      }
      throw new Error('Unexpected source');
    }

    console.debug({ event });
    return lambdaFunc(event);
  };
}
