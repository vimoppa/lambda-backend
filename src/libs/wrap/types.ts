import { Response } from '../response/types';

export type Event =
  | AWSLambda.APIGatewayEvent
  | {
      source: string;
    };

export type LambdaFuncType = (event: AWSLambda.APIGatewayEvent) => Promise<Response>;

export type WrapReturnType = (
  event: Event,
  context?: any,
  callback?: any,
) => Promise<Response | 'pinged' | undefined> | void;
