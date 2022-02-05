import * as rt from 'runtypes';

export const signatoryFieldRt = rt.Record({
  /**
   * If set, where this field should be placed on the document.
   * This is both for the signatory to fill out on the signing page,
   * and for the final sealed PDF.
   *
   * Note that this is an array, you can have multiple placements for the same field.
   *
   * The easiest way to set the xrel, yrel, etc. values is to create a template in the
   * document UI design view, and use those values.
   */
  placements: rt.Array(
    rt.Record({
      /**
       * Position on the x-axis, from 0 to 1.
       */
      xrel: rt.Number.nullable().optional(),
      /**
       * Position on the y-axis, from 0 to 1.
       */
      yrel: rt.Number.nullable().optional(),
      /**
       * Width of placement, as proportion of total width, from 0 to 1.
       */
      wrel: rt.Number.nullable().optional(),
      /**
       * Height of placement, as proportion of total height, from 0 to 1.
       */
      hrel: rt.Number.nullable().optional(),
      /**
       * Font size of placement, as proportion of total width, from 0 to 1.
       */
      fsrel: rt.Number.nullable().optional(),
      /**
       * The page number for this placement, starting from 1.
       */
      page: rt.Number.nullable().optional(),
    }),
  ),

  /**
   * Description of this field
   */
  description: rt.String.nullable().optional(),
});

export const signatoryFieldNameRt = rt.Record({
  type: rt.Literal('name'),
  order: rt.Union(rt.Literal(1), rt.Literal(2)),
  value: rt.String.nullable().optional(),
  /**
   * @default true
   */
  is_obligatory: rt.Boolean.nullable().optional(),

  /**
   * @default false
   */
  should_be_filled_by_sender: rt.Boolean.nullable().optional(),
});

export const signatoryFieldFullNameRt = rt.Record({
  type: rt.Literal('full_name'),
});

export const signatoryFieldEmailMobileRt = rt.Record({
  type: rt.Union(rt.Literal('email'), rt.Literal('mobile')),
  /**
   * Either a pre-filled value, or the value entered by the signatory.
   *
   * For the author: the value will revert to that set in the account settings.
   * Trying to set any other value will simply result in this field reverting
   * back to information set in account settings.
   */
  value: rt.String.nullable().optional(),

  /**
   * @default true
   */
  is_obligatory: rt.Boolean.nullable().optional(),

  /**
   * @default false
   */
  should_be_filled_by_sender: rt.Boolean.nullable().optional(),

  /**
   * @default false
   */
  editable_by_signatory: rt.Boolean.nullable().optional(),
});

export const signatoryFieldSignatureRt = rt.Record({
  type: rt.Literal('signature'),

  /**
   * The signatory will not see the name of the signature field,
   * however it will be used in the Evidence Log as a reference.
   */
  name: rt.String,

  /**
   * The elements of this item must match *at least one* of the following properties:
   * null: When the signatory has not yet drawn a signature.
   * string: The File ID of the signature drawn by the signatory.
   */
  signature: rt.String.nullable(),

  /**
   * @default true
   */
  is_obligatory: rt.Boolean.nullable().optional(),

  /**
   * @default false
   */
  should_be_filled_by_sender: rt.Boolean.nullable().optional(),
});

export const signatoryFieldStandardRt = rt.Record({
  type: rt.Union(
    rt.Literal('company'),
    rt.Literal('company_number'),
    rt.Literal('personal_number'),
  ),

  /**
   * Either a pre-filled value, or the value entered by the signatory.
   *
   * For the author: the value will revert to that set in the account settings.
   * Trying to set any other value will simply result in this field reverting
   * back to information set in account settings.
   */
  value: rt.String.nullable().optional(),

  /**
   * @default true
   */
  is_obligatory: rt.Boolean.nullable().optional(),

  /**
   * @default false
   */
  should_be_filled_by_sender: rt.Boolean.nullable().optional(),
});

export const signatoryFieldCheckboxRt = rt.Record({
  type: rt.Literal('checkbox'),

  /**
   * A name for the checkbox.
   *
   * The signatory will not see the name of the checkbox,
   * however it will be used in the Evidence Log as a reference.
   */
  name: rt.String,

  /**
   * true when the checkbox is checked, false otherwise.
   *
   * Setting this to true on a document in preparation has the
   * effect of pre-checking the checkbox for the signatory.
   *
   * @default false
   */
  is_checked: rt.Boolean.nullable().optional(),

  /**
   * @default true
   */
  is_obligatory: rt.Boolean.nullable().optional(),

  /**
   * @default false
   */
  should_be_filled_by_sender: rt.Boolean.nullable().optional(),
});

export const signatoryFieldRadiogroupRt = rt.Record({
  type: rt.Literal('radiogroup'),

  /**
   * A name for the radiogroup.
   *
   * The signatory will not see the name of the radiogroup,
   * however it will be used in the Evidence Log as a reference.
   */
  name: rt.String,

  /**
   * An array of radio button option values.
   *
   * The signatory will not see the name of the radio button values,
   * however they will be used in the Evidence Log as a reference.
   *
   * These must correspond one-to-one with the list of placements:
   * that is the length of values must equal that of placements and vice-versa,
   * otherwise an error is returned.
   *
   * Must be equal in length to placements and have at least 2 items.
   * Each item must be unique and not an empty string.
   */
  values: rt.Array(rt.String),
});

export const signatoryFieldCustomTextRt = rt.Record({
  type: rt.Literal('text'),

  /**
   * A name for the custom field.
   *
   * The name will be used as a placeholder value on the signing page,
   * it will also be used in the Evidence Log as a reference.
   */
  name: rt.String,

  /**
   * Either a pre-filled value, or the value entered by the signatory.
   */
  value: rt.String.nullable().optional(),

  /**
   * @default true
   */
  is_obligatory: rt.Boolean.nullable().optional(),

  /**
   * @default false
   */
  should_be_filled_by_sender: rt.Boolean.nullable().optional(),
});

export const signatoryFieldDateRt = rt.Record({
  type: rt.Literal('date'),
});

export const signatoryFieldSignDateRt = rt.Record({
  type: rt.Literal('sign_date'),

  /**
   * Date when the signatory has signed or null if not yet signed.
   * Formatted as ISO8601 date. Read only.
   */
  value: rt.String.nullable().optional(),
});

export const partyField = rt.Union(
  signatoryFieldNameRt,
  signatoryFieldFullNameRt,
  signatoryFieldEmailMobileRt,
  signatoryFieldSignatureRt,
  signatoryFieldStandardRt,
  signatoryFieldCheckboxRt,
  signatoryFieldRadiogroupRt,
  signatoryFieldCustomTextRt,
  signatoryFieldDateRt,
  signatoryFieldSignDateRt,
);

export const partyRt = rt.Record({
  /**
   * Signatory role: viewer, approver, or a signing party. Only signing parties can
   * sign documents, viewers only have view access, and approvers can additionally
   * approve or reject.
   */
  signatory_role: rt.Union(
    rt.Literal('viewer'),
    rt.Literal('signing_party'),
    rt.Literal('approver'),
  ),

  fields: rt.Array(partyField).nullable().optional(),
});

export const documentRt = rt.Record({
  id: rt.String,
  /**
   * Can be modified while a document is in preparation.
   * The title will be used in messages sent to the document’s parties.
   */
  title: rt.String,

  parties: rt.Array(partyRt).nullable().optional(),

  sign_success_redirect_url: rt.String.nullable().optional(),
  reject_redirect_url: rt.String.nullable().optional(),

  /**
   * Note that api delivery is referred to as "Link" delivery in the Scrive
   * Web interface. Furthermore, pad delivery is referred to as "In-person".
   */
  delivery_method: rt
    .Union(
      rt.Literal('email'),
      rt.Literal('mobile'),
      rt.Literal('email_mobile'),
      rt.Literal('pad'),
      rt.Literal('api'),
    )
    .nullable()
    .optional(),

  /**
   * This setting forces signatories to authenticate using the supplied
   * identification method to view the document before signing.
   */
  // authentication_method_to_view?: AuthenticationMethods;

  /**
   * This setting forces signatories to authenticate using the supplied
   * identification method to view the document once it has been signed
   * and resides in the e-archive.
   */
  // authentication_method_to_view_archived?: AuthenticationMethods;

  /**
   * This setting forces user to authenticate to sign.
   */
  // authentication_method_to_sign?: AuthenticationMethods;

  // confirmation_delivery_method?:
  //   | 'email'
  //   | 'mobile'
  //   | 'email_mobile'
  //   | 'email_link'
  //   | 'email_link_mobile'
  //   | 'none';

  /**
   * Whether the signatory can highlight pages of the PDF when viewing the signing page.
   *
   * If any highlights are performed, the evidence log states that they were performed
   * while the signatory was viewing the document.
   *
   * The intention of this feature is not for the signatory to affect a contract
   * via highlighting, but simply for a point-of-sale situation to assist contract
   * review.
   *
   * @default false
   */
  // allows_highlighting?: boolean;

  /**
   * Whether the personal number should be hidden in the final PDF
   * verification page and the Evidence Log.
   *
   * This is to be used when the document will be distributed to a
   * wider audience, and the personal number of the signatory should
   * not be available in the final document.
   *
   * @default false
   */
  // hide_personal_number?: boolean;

  /**
   * Whether the signatory can forward the signing process to someone else.
   * @default false
   */
  // can_forward?: boolean;

  /**
   * The current document status.
   *
   * A document in "preparation" can be changed using the update call and the main
   * file can also be set or changed.
   *
   * Once the document signing process has begun, the document will be "pending".
   *
   * Once all parties have successfully signed the document is "closed" and
   * cannot be changed.
   */
  status: rt.Union(
    rt.Literal('preparation'),
    rt.Literal('pending'),
    rt.Literal('closed'),
    rt.Literal('canceled'),
    rt.Literal('timedout'),
    rt.Literal('rejected'),
    rt.Literal('document_error'),
  ),

  /**
   * @default 90
   */
  days_to_sign: rt.Number,
  days_to_remind: rt.Number.nullable().optional(),

  // display_options?: {
  //   show_header?: boolean;
  //   show_pdf_download?: boolean;
  //   show_reject_option?: boolean;
  //   allow_reject_reason?: boolean;
  //   show_footer?: boolean;
  //   document_is_receipt?: boolean;
  //   show_arrow?: boolean;
  //   show_form?: boolean;
  // };

  /**
   * The invitation message to send to all parties at the
   * start of the signing process when using email invitation.
   *
   * Default is blank meaning that a default message will be used.
   */
  // invitation_message?: string;

  // sms_invitation_message?: string;

  // confirmation_message?: string;

  // sms_confirmation_message?: string;

  // lang?:
  //   | 'da'
  //   | 'de'
  //   | 'el'
  //   | 'en'
  //   | 'es'
  //   | 'et'
  //   | 'fi'
  //   | 'fr'
  //   | 'is'
  //   | 'it'
  //   | 'lt'
  //   | 'lv'
  //   | 'nl'
  //   | 'no'
  //   | 'pt'
  //   | 'sv';

  api_callback_url: rt.String.nullable().optional(),
});
