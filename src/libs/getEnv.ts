export enum ENV {
  PROD = 'prod',
  STAGING = 'staging',
}

export function isLocal() {
  return process.env.local === 'true';
}

export function isProduction() {
  return process.env.stage === ENV.PROD;
}

export function isStaging() {
  return process.env.stage === ENV.STAGING;
}
