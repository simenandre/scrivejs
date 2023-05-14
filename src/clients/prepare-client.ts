import { EditDocumentRequest } from '../calls/models/edit-document-request';
import * as calls from '../calls/prepare';
import { ScriveSdkBase } from './base-client';

export class ScriveSdkPrepareClient extends ScriveSdkBase {
  /**
   * Create a new document with the given PDF (if any) as the
   * main file. The new document will have state Preparation,
   * and will not be a template.
   *
   * @example
   * ```typescript
   *  const client = new ScribeSdk( ... );
   *  client.prepare().newDocument(file);
   * ```
   *
   * @param file Buffer (PDF file)
   * @param saved boolean
   * @returns Document
   */
  newDocument(file?: Buffer, saved?: boolean) {
    return calls.newDocument({
      baseUrl: this.getBaseUrl(),
      auth: this.auth,
      file,
      saved,
    });
  }

  /**
   * Create a new document from a template, given the
   * document ID for a document that is a template.
   *
   * The new document will have state Preparation and
   * will not be a template, and the signing process
   * can thus be carried out.
   *
   * @example
   * ```typescript
   *  const client = new ScribeSdk( ... );
   *  client.prepare().newDocumentFromTemplate('3913914914');
   * ```
   *
   * @param documentId
   * @returns Document
   */
  newDocumentFromTemplate(documentId: string) {
    return calls.newDocumentFromTemplate({
      baseUrl: this.getBaseUrl(),
      auth: this.auth,
      documentId,
    });
  }

  /**
   * Clone an existing document, returning a
   * new document in Preparation.
   *
   * You can only clone documents for which you are the author,
   * the new document will use the current author details for
   * the author signatory fields.
   *
   * @example
   * ```typescript
   *  const client = new ScribeSdk( ... );
   *  client.prepare().cloneDocument('3913914914');
   * ```
   *
   * @param documentId
   * @returns Document
   */
  cloneDocument(documentId: string) {
    return calls.cloneDocument({
      baseUrl: this.getBaseUrl(),
      auth: this.auth,
      documentId,
    });
  }

  /**
   * Update the metadata for a document in preparation.
   *
   * Read more about the Document:
   * https://apidocs.scrive.com/#document-3
   *
   * @example
   * ```typescript
   *  const client = new ScribeSdk( ... );
   *  client.prepare().updateDocument('3913914914', {
   *    title: 'Hello world',
   *  });
   * ```
   *
   * @param documentId
   * @param document
   * @returns
   */
  updateDocument(documentId: string, document: EditDocumentRequest) {
    return calls.updateDocument({
      baseUrl: this.getBaseUrl(),
      auth: this.auth,
      documentId,
      document,
    });
  }
}
