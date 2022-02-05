import { Authentication, PersonalAccessCredentialsAuth } from '../auth';
import { ScriveSdk } from '../main';
describe('Scrive SDK', () => {
  it('should construct', () => {
    const auth: Authentication = {
      getHeaders() {
        return {};
      },
    };

    const client = new ScriveSdk(auth);
    expect(client).toBeInstanceOf(ScriveSdk);
  });

  it('should construct with personal access creds', () => {
    const creds = {
      apitoken: 'something',
      accesstoken: 'is-something',
      apisecret: 'when-there-nothing',
      accesssecret: 'here',
    };
    const client = ScriveSdk.usePersonalAccessCredentials(creds);

    expect(client).toBeInstanceOf(ScriveSdk);
    expect(client.auth).toBeInstanceOf(PersonalAccessCredentialsAuth);
  })
});
