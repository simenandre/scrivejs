import {
  PersonalAccessCredentials,
  PersonalAccessCredentialsAuth,
} from './auth';
import { ScriveSdkBase } from './clients/base-client';
import { ScriveSdkPrepareClient } from './clients/prepare-client';

/**
 * Scrive SDK class
 *
 * @example
 * ```typescript
 * import { ScriveSdk } from 'scrive-sdk';
 *
 * const client = ScriveSdk.usePersonalAccessCredentials({
 *   apitoken: 'something',
 *   accesstoken: 'is-something',
 *   apisecret: 'when-there-nothing',
 *   accesssecret: 'here',
 * });
 *
 * client.prepare().newDocumentFromTemplate('123123');
 * ```
 */
export class ScriveSdk extends ScriveSdkBase {
  static usePersonalAccessCredentials(credentials: PersonalAccessCredentials) {
    const auth = new PersonalAccessCredentialsAuth(credentials);
    return new ScriveSdk(auth);
  }

  prepare() {
    return new ScriveSdkPrepareClient(this.auth, this.config);
  }
}
