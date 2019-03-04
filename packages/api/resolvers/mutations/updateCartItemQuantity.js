import { log } from 'meteor/unchained:core-logger';
import { OrderPositions } from 'meteor/unchained:core-orders';
import { OrderQuantityTooLowError, OrderItemNotFoundError, OrderWrongStatusError } from '../../errors';

export default function (root, { itemId, quantity }, { userId }) {
  log(`mutation updateCartItemQuantity ${itemId} ${quantity}`, { userId });
  if (quantity === 0) throw new OrderQuantityTooLowError({ data: { quantity } });
  const item = OrderPositions.findOne({ _id: itemId });
  if (!item) throw new OrderItemNotFoundError({ data: { itemId } });
  const order = item.order();
  if (!order.isCart()) {
    throw new OrderWrongStatusError({ data: { status: order.status } });
  }
  return OrderPositions.updatePosition({
    orderId: item.orderId,
    positionId: itemId,
    quantity,
  });
}
