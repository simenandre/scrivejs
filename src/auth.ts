export interface Authentication {
  getHeaders(): Record<string, string>;
}

export interface PersonalAccessCredentials {
  apitoken: string;
  accesstoken: string;
  apisecret: string;
  accesssecret: string;
}

export class PersonalAccessCredentialsAuth implements Authentication {
  constructor(readonly credentials: PersonalAccessCredentials) {}

  getHeaders() {
    return {
      Authorization: [
        { name: 'oauth_signature_method', value: 'PLAINTEXT' },
        { name: 'oauth_consumer_key', value: this.credentials.apitoken },
        { name: 'oauth_token', value: this.credentials.accesstoken },
        {
          name: 'oauth_signature',
          value: [
            this.credentials.apisecret,
            this.credentials.accesssecret,
          ].join('&'),
        },
      ]
        .map(a => `${a.name}="${a.value}"`)
        .join(','),
    };
  }
}
