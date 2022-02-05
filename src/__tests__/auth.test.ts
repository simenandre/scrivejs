import { PersonalAccessCredentialsAuth } from '../auth';

describe('Authentication methods', () => {
  it('should generate headers for personal access credentials', () => {
    const creds = new PersonalAccessCredentialsAuth({
      apitoken: 'something',
      accesstoken: 'is-something',
      apisecret: 'when-there-nothing',
      accesssecret: 'here',
    });

    /**
     * Read more about personal access credentials here:
     * https://apidocs.scrive.com/#personal-access-credentials
     */

    expect(creds.getHeaders()).toEqual({
      Authorization:
        'oauth_signature_method="PLAINTEXT",' +
        'oauth_consumer_key="something",' +
        'oauth_token="is-something",' +
        'oauth_signature="when-there-nothing&here"',
    });
  });
});
