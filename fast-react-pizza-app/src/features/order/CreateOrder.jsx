import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartItems, getCart, getTotalItemsPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  // const username = useSelector((state) => state.user.username);
  // const address= useSelector((state)=> state.user.address)
  const {
    status: statusAddress,
    error: errorAddress,
    address,
    username,
    position,
  } = useSelector((state) => state.user);

  const isAddressLoading = statusAddress === 'loading';
  //3) recieving the data returned from the action by: useActionData()

  const errors = useActionData();
  console.log(errors);

  const cart = useSelector(getCart);
  console.log(cart);

  const totalItemsPrice = useSelector(getTotalItemsPrice);
  const totalPrice = withPriority
    ? totalItemsPrice + totalItemsPrice * 0.2
    : totalItemsPrice;

  //in case of EMPTY cart the order page should not be rendered

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            className="input grow"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {errors?.phone && (
              <p className="rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              disabled={isAddressLoading}
              required
              defaultValue={address}
              className="input w-full"
            />

            {statusAddress === 'error' && (
              <p className="rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}

            {!position.longitude && !position.latitude && (
              <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
                <Button
                  disabled={isAddressLoading}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* pass these values to the request the cart and the position */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />

          <Button type="primary" disabled={isSubmitting || isAddressLoading}>
            {isSubmitting
              ? 'Placing Order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  console.log(request);
  const formData = await request.formData(); //this is a function
  const data = Object.fromEntries(formData);
  console.log(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  // if there is an error in the type of the input fileds like the phone number we could manage that by :
  //1) creating error object thet well be returned from the action and accessed by its connected Componenet:

  const errors = {};
  if (!isValidPhone(order.phone))
    //on submitting not setting the phone number
    errors.phone =
      'Please enter your correct phone number, we might need it to contact you';
  //     //on submitting not while clicking on the Address
  // if (order.position)
  //   errors.position = 'Please provide us with your correct Address';

  console.log(order);
  console.log(errors);

  if (Object.keys(errors).length > 0) return errors; // 2)the errors object will be returned to the component connected to the action

  //If everthing is correct , then create the POST request and redirect to the new order page URL
  const newOrder = await createOrder(order);

  //THAT"S A HACK  beacause we can't use useDispatch inside a function and we need to get the cart cleared
  //Do NOT overuse it because this block performance optimization for this componenet

  store.dispatch(clearCartItems());

  // action should return something: return null
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
