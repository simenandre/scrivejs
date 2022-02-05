import nock from 'nock';
import invariant from 'ts-invariant';
import { TypicalWrappedError } from 'typical-fetch';
import { response } from '../__fixtures__/new-document-response-data';
import {
  newDocument,
  newDocumentFromTemplate,
  updateDocument,
} from '../prepare';
import { PersonalAccessCredentialsAuth } from '../../auth';

describe('prepare', () => {
  const base64SmallPDF =
    'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
    'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
    'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
    'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
    'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
    'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
    'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
    'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
    'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
    'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
    'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
    'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
    'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';

  const baseUrl = 'https://scrive.com';

  const auth = new PersonalAccessCredentialsAuth({
    apitoken: 'something',
    accesstoken: 'is-something',
    apisecret: 'when-there-nothing',
    accesssecret: 'here',
  });

  it('should prepare a simple pdf document', async () => {
    const scope = nock(baseUrl)
      .post('/api/v2/documents/new')
      .reply(201, response);

    const res = await newDocument({
      baseUrl,
      auth,
      file: Buffer.from(base64SmallPDF, 'base64'),
    });

    if (res.error) {
      if (res.error instanceof TypicalWrappedError) {
        throw res.error.wrappedError;
      }
      throw res.error;
    }

    expect(res.success).toBeTruthy();
    invariant(res.success);
    expect(res.body.id).toBe('1000100010001000');
    scope.done();
  });

  it('should prepare a simple string-based PDF document', async () => {
    const scope = nock(baseUrl)
      .post('/api/v2/documents/new')
      .reply(201, response);

    const res = await newDocument({
      baseUrl,
      auth,
      file: Buffer.from(base64SmallPDF, 'base64').toString('utf-8'),
    });

    if (res.error) {
      if (res.error instanceof TypicalWrappedError) {
        throw res.error.wrappedError;
      }
      throw res.error;
    }

    expect(res.success).toBeTruthy();
    invariant(res.success);
    expect(res.body.id).toBe('1000100010001000');
    scope.done();
  });

  it('should accept without file, and with saved', async () => {
    const scope = nock(baseUrl)
      .post('/api/v2/documents/new')
      .reply(201, response);

    const res = await newDocument({
      baseUrl,
      auth,
      saved: true,
    });

    if (res.error) {
      if (res.error instanceof TypicalWrappedError) {
        throw res.error.wrappedError;
      }
      throw res.error;
    }

    expect(res.success).toBeTruthy();
    invariant(res.success);
    expect(res.body.id).toBe('1000100010001000');
    scope.done();
  });

  it('should create a new based on a template', async () => {
    const scope = nock(baseUrl)
      .post('/api/v2/documents/newfromtemplate/100020003000')
      .reply(201, response);
    const res = await newDocumentFromTemplate({
      baseUrl,
      auth,
      documentId: '100020003000',
    });

    if (!res.success) {
      if (res.error instanceof TypicalWrappedError) {
        throw res.error.wrappedError;
      }
      throw res.error;
    }

    expect(res.success).toBeTruthy();
    invariant(res.success);
    expect(res.body.id).toBe('1000100010001000');
    scope.done();
  });

  it('should edit documents', async () => {
    const scope = nock(baseUrl)
      .post('/api/v2/documents/100020003000/update')
      .reply(201, response);
    const res = await updateDocument({
      baseUrl,
      auth,
      documentId: '100020003000',
      document: {
        title: 'Hello world',
      },
    });

    if (!res.success) {
      if (res.error instanceof TypicalWrappedError) {
        throw res.error.wrappedError;
      }
      throw res.error;
    }

    expect(res.success).toBeTruthy();
    invariant(res.success);
    expect(res.body.id).toBe('1000100010001000');
    scope.done();
  });
});
