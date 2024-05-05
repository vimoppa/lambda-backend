export interface JSONType {
  [key: string]: any;
}

export interface Headers {
  [name: string]: string;
}

export interface ResponseOptions {
  body: JSONType;
  statusCode: number;
  allowCORS?: boolean;
  cacheTTL?: number;
  headers?: Headers;
}

export interface Response {
  statusCode: number;
  body: string;
  headers?: {
    [key: string]: any;
  };
}
