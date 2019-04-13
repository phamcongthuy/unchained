import { Schemas } from 'meteor/unchained:utils';
import SimpleSchema from 'simpl-schema';
import { Quotations } from './collections';

const { logFields, contextFields, timestampFields } = Schemas;

export const QuotationStatus = {
  REQUESTED: 'REQUESTED',
  PROCESSING: 'PROCESSING',
  PROPOSED: 'PROPOSED',
  FULLFILLED: 'FULLFILLED',
  REJECTED: 'REJECTED'
};

Quotations.attachSchema(
  new SimpleSchema(
    {
      userId: { type: String, required: true, index: true },
      productId: { type: String, required: true, index: true },
      status: { type: String, required: true, index: true },
      quotationNumber: String,
      price: Number,
      expires: Date,
      meta: { type: Object, blackbox: true },
      fullfilled: Date,
      currency: String,
      countryCode: String,
      configuration: Array,
      'configuration.$': {
        type: Object,
        required: true
      },
      'configuration.$.key': {
        type: String,
        required: true
      },
      'configuration.$.value': {
        type: String
      },
      ...timestampFields,
      ...contextFields,
      ...logFields
    },
    { requiredByDefault: false }
  )
);

export default QuotationStatus;
