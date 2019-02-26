import { log } from 'meteor/unchained:core-logger';
import { Products } from 'meteor/unchained:core-products';
import { Quotations } from 'meteor/unchained:core-quotations';
import { ProductNotFoundError } from '../../errors';

export default function (root, { productId, configuration }, { userId, countryContext }) {
  log(`mutation requestQuotation ${productId} ${configuration ? JSON.stringify(configuration) : ''}`, { userId });
  const product = Products.findOne({ _id: productId });
  if (!product) throw new ProductNotFoundError({ data: { productId } });
  const quotation = Quotations.requestQuotation({
    userId,
    productId,
    currencyCode: countryContext,
  });
  return quotation;
}
