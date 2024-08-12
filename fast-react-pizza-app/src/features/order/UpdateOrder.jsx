import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
function UpdateOrder({ order }) {
  // in getting data we use fetcher.load
  const fetcher = useFetcher();
  // in updating data we use fetcher.Form to submit/ write data to the api

  //fetcher.Form will revalidate the page not rerender the componenet VS. FORM in the other hand rerender the component to submit the request
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  // we don't have any inputs to read data from the request  we there's no need to use request.formData()
  // const formData = await request.formData(); //this is a function
  //   const data = Object.fromEntries(formData);
  //   console.log(formData);

  //set priority to true on the current order

  console.log('Update');
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}

// "PATCH" VS. "PUT"

/* 
PATCH : used to update certain properties of an existing object on the api, not rewriting all the object
PUT : used to update the entire object on the api


*/
