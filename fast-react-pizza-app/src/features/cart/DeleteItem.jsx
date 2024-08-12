import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteOneItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDeleteCartItem() {
    //dispatch the action
    dispatch(deleteOneItem(pizzaId));
  }

  return (
    <Button type="small" onClick={handleDeleteCartItem}>
      Delete
    </Button>
  );
}

export default DeleteItem;
