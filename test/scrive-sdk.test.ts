import { Authentication, PersonalAccessCredentialsAuth } from '../src/auth';
import { ScriveSdkPrepareClient } from '../src/clients/prepare-client';
import { ScriveSdk } from '../src/main';
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
  });

  describe('clients', () => {
    let sdk: ScriveSdk;

    beforeEach(() => {
      const auth: Authentication = {
        getHeaders: () => ({}),
      };

      sdk = new ScriveSdk(auth);
    });

    it('should return prepare client', () => {
      const client = sdk.prepare();
      expect(client).toBeInstanceOf(ScriveSdkPrepareClient);
    });
  });
});
