import { buildCall } from 'typical-fetch';

const userAgentString = 'scrivejs/1';

export interface ScrivePersonalAccessCredentials {
  apitoken: string;
  accesstoken: string;
  apisecret: string;
  accesssecret: string;
}

export const authenticatedCall = buildCall()
  .args<{
    credentials: ScrivePersonalAccessCredentials;
  }>()
  .headers(({ credentials }) => ({
    'User-Agent': userAgentString,
    Authorization: [
      { name: 'oauth_signature_method', value: 'PLAINTEXT' },
      { name: 'oauth_consumer_key', value: credentials.apitoken },
      { name: 'oauth_token', value: credentials.accesstoken },
      {
        name: 'oauth_signature',
        value: [credentials.apisecret, credentials.accesssecret].join('&'),
      },
    ]
      .map(a => `${a.name}="${a.value}"`)
      .join(','),
  }));
