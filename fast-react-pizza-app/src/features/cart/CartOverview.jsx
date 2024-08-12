import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalItemsPrice, getTotalItemsQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalPizzasQuantity = useSelector(getTotalItemsQuantity);

  const totalPizzaPrices = useSelector(getTotalItemsPrice);

  if (!totalPizzasQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 md:space-x-6">
        <span>{totalPizzasQuantity} pizzas</span>
        <span>{formatCurrency(totalPizzaPrices)}</span>
      </p>
      <Link to="/cart"> Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
