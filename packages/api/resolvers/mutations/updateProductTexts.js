import { log } from 'meteor/unchained:core-logger';
import { Products } from 'meteor/unchained:core-products';

export default function (root, { texts, productId }, { userId }) {
  log(`mutation updateProductTexts ${productId}`, { userId });
  const productObject = Products.findOne({ _id: productId });
  const changedLocalizations = texts.map(({
    locale,
    ...rest
  }) => productObject.upsertLocalizedText({ locale, ...rest }));
  return changedLocalizations;
}
