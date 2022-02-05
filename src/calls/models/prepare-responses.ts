import * as rt from 'runtypes';

/**
 * The new document response is intentially kept
 * simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const newDocumentResponse = rt
  .Record({
    id: rt.String,
    status: rt.Literal('preparation'),
    title: rt.String,
  })
  .asReadonly();

/**
 * The new document from template response is
 * intentially kept simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const newDocumentFromTemplateResponse = rt
  .Record({
    id: rt.String,
    status: rt.Literal('preparation'),
    title: rt.String,
  })
  .asReadonly();

/**
 * The cloned document response is intentially kept
 * simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const clonedDocumentResponse = rt
  .Record({
    id: rt.String,
    status: rt.Literal('preparation'),
    title: rt.String,
  })
  .asReadonly();

/**
 * The edit document response is intentially kept
 * simple.
 *
 * Read more about the Document schema here:
 * https://apidocs.scrive.com/#document
 */

export const editDocumentResponse = rt
  .Record({
    id: rt.String,
    status: rt.Literal('preparation'),
    title: rt.String,
  })
  .asReadonly();