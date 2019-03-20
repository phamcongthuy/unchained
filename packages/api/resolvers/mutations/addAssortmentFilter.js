import { log } from 'meteor/unchained:core-logger';
import { Assortments } from 'meteor/unchained:core-assortments';
import { AssortmentNotFoundError } from '../../errors';

export default function(root, { assortmentId, filterId }, { userId }) {
  log(`mutation addAssortmentFilter ${assortmentId} -> ${filterId}`, {
    userId
  });
  const assortment = Assortments.findOne({ _id: assortmentId });
  if (!assortment)
    throw new AssortmentNotFoundError({ data: { assortmentId } });
  return assortment.addFilter({ filterId });
}
