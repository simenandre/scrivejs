import { documentRt } from './document';

/**
 * The new document response is intentially kept
 * simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const newDocumentResponse = documentRt.asReadonly();

/**
 * The new document from template response is
 * intentially kept simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const newDocumentFromTemplateResponse = documentRt.asReadonly();

/**
 * The cloned document response is intentially kept
 * simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const clonedDocumentResponse = documentRt.asReadonly();

/**
 * The edit document response is intentially kept
 * simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const editDocumentResponse = documentRt.asReadonly();
