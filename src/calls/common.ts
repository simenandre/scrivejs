import { buildCall } from 'typical-fetch';
import { Authentication } from '../auth';

const userAgentString = 'scrive-sdk-js/1';

export const authenticatedCall = buildCall()
  .args<{
    auth: Authentication;
  }>()
  .headers(({ auth }) => ({
    'User-Agent': userAgentString,
    ...auth.getHeaders(),
  }));
