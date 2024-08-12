import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
} from './cartSlice';

function UpdateCartQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseCartItemQuantity(pizzaId))}
      >
        -
      </Button>

      <span className="text-sm font-medium">{currentQuantity}</span>

      <Button
        type="round"
        onClick={() => dispatch(increaseCartItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateCartQuantity;
