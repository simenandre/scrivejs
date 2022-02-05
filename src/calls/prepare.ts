import { authenticatedCall } from './common';
import type { Readable } from 'stream';
import { withRuntype } from '../utils';
import FormData from 'form-data';
import {
  newDocumentResponse,
  clonedDocumentResponse,
  newDocumentFromTemplateResponse,
  editDocumentResponse,
} from './models/prepare-responses';
import { EditDocumentRequest } from './models/edit-document-request';

export const newDocument = authenticatedCall
  .args<{
    file?: string | Buffer | Readable;
    saved?: boolean;
  }>()
  .path('/api/v2/documents/new')
  .method('post')
  .body(({ file, saved }) => {
    const formData = new FormData();
    if (file) {
      if (typeof file === 'string') {
        formData.append('file', Buffer.from(file).toString('base64'));
      } else {
        formData.append('file', file.toString('base64'));
      }
    }

    if (saved) {
      formData.append('saved', String(saved));
    }

    return formData;
  })
  .parseJson(withRuntype(newDocumentResponse))
  .build();

export const newDocumentFromTemplate = authenticatedCall
  .args<{
    documentId: string;
  }>()
  .path(({ documentId }) => `/api/v2/documents/newfromtemplate/${documentId}`)
  .method('post')
  .parseJson(withRuntype(newDocumentFromTemplateResponse))
  .build();

export const cloneDocument = authenticatedCall
  .args<{
    documentId: string;
  }>()
  .path(({ documentId }) => `/api/v2/documents/${documentId}/clone`)
  .method('post')
  .parseJson(withRuntype(clonedDocumentResponse))
  .build();

export const updateDocument = authenticatedCall
  .args<{
    documentId: string;
    document: EditDocumentRequest;
  }>()
  .path(({ documentId }) => `/api/v2/documents/${documentId}/update`)
  .method('post')
  .body(({ document }) => {
    const formData = new FormData();
    formData.append('document', JSON.stringify(document));
    return formData;
  })
  .parseJson(withRuntype(editDocumentResponse))
  .build();
