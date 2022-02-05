import { Authentication } from '../auth';
import { ScriveSdkPrepareClient } from '../clients/prepare-client';
import * as calls from '../calls/prepare';

jest.mock('../calls/prepare.ts', () => ({
  newDocument: jest.fn(),
  newDocumentFromTemplate: jest.fn(),
  cloneDocument: jest.fn(),
  updateDocument: jest.fn(),
}));


describe('prepare-client.ts', () => {
  it('should construct', () => {
    const auth: Authentication = {
      getHeaders() {
        return {};
      },
    };

    const client = new ScriveSdkPrepareClient(auth);
    expect(client).toBeInstanceOf(ScriveSdkPrepareClient);
  });

  describe('methods', () => {
    let client: ScriveSdkPrepareClient;

    const baseUrl = 'https://example.com/';

    beforeEach(() => {
      const auth: Authentication = {
        getHeaders() {
          return {};
        },
      };

      client = new ScriveSdkPrepareClient(auth, { baseUrl });
    });

    it('should execute newDocument', async () => {
      await client.newDocument();
      expect(calls.newDocument).toHaveBeenCalled();
    });
    it('should execute newDocumentFromTemplate', async () => {
      await client.newDocumentFromTemplate('123123123');
      expect(calls.newDocumentFromTemplate).toHaveBeenCalled();
    });
    it('should execute cloneDocument', async () => {
      await client.cloneDocument('123123123');
      expect(calls.cloneDocument).toHaveBeenCalled();
    });
    it('should execute updateDocument', async () => {
      await client.updateDocument('123123123', {
        title: 'hello world',
      });
      expect(calls.updateDocument).toHaveBeenCalled();
    });
  });
});
