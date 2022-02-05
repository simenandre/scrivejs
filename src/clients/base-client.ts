import { Authentication } from '../auth';

export interface ScriveConfig {
  baseUrl?: string;
}

export abstract class ScriveSdkBase {
  constructor(
    readonly auth: Authentication,
    readonly config: ScriveConfig = {},
  ) {}

  protected getBaseUrl() {
    return this.config.baseUrl ?? 'https://scrive.com';
  }
}
