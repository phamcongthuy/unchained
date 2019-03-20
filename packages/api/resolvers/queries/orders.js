import { log } from 'meteor/unchained:core-logger';
import { Orders, OrderStatus } from 'meteor/unchained:core-orders';

export default function(
  root,
  { limit = 10, offset = 0, includeCarts = false },
  { userId }
) {
  log(`query orders: ${limit} ${offset} ${includeCarts}`, { userId });
  const selector = {};
  if (!includeCarts) {
    selector.status = { $ne: OrderStatus.OPEN };
  }
  const orders = Orders.find(selector, { skip: offset, limit }).fetch();
  return orders;
}
