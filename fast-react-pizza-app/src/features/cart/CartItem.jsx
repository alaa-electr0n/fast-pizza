import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { getItemQuantityById } from './cartSlice';

import DeleteItem from './DeleteItem';
import UpdateCartQuantity from './UpdateCartQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentItemQuantity = useSelector(getItemQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-5">
          <UpdateCartQuantity
            pizzaId={pizzaId}
            currentQuantity={currentItemQuantity}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
