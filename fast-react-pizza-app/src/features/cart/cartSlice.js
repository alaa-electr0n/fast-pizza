import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  //   cartItem: {
  //     pizzaId: 6,
  //     name: 'Vegetale',
  //     quantity: 1,
  //     unitPrice: 13,
  //     totalPrice: 13,
  //   },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOneItem(state, action) {
      //action.payload cartObject that pushed to the array
      //in useReducer there is no state mutation allowed thus {...state, state.cart :action.payload}
      //but here in redux the state is mutable so it is possible to use push
      state.cart.push(action.payload);
    },
    deleteOneItem(state, action) {
      //action.payload= pizzaId,
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    increaseCartItemQuantity(state, action) {
      //find the cartItemId in the cart array with its pizzaId "action.payload"
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      if (cartItem) cartItem.quantity++;
      cartItem.totalPrice = cartItem.unitPrice * cartItem.quantity;
    },
    decreaseCartItemQuantity(state, action) {
      //find the cartItemId in the cart array with its pizzaId "action.payload"
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      if (cartItem) cartItem.quantity--;
      cartItem.totalPrice = cartItem.unitPrice * cartItem.quantity;

      //delete the cart item if the quantity is lesser than 1 , using of "caseReducers" to coose from the cartSlice reducer
      if (cartItem.quantity === 0)
        cartSlice.caseReducers.deleteOneItem(state, action);
    },
    clearCartItems(state) {
      //clear all the cartitems  and return the cart to the empty array
      state.cart = [];
    },
  },
});

export const {
  addOneItem,
  deleteOneItem,

  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

//   IMPORTANT NOTE IN REDUX
//IN LARGE WEBSITES THESE GETTERS WILL CAUSE PERFORMANCE ISSUES SO: USE RESELCT LIBERARY FOR GETTERS

//Getter Functions
export const getCart = (state) => state.cart.cart;

export const getTotalItemsQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalItemsPrice = (state) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);

// how to now the indvidual item quantity in the cart ????
//function returns function
export const getItemQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// const getItemQuantityById = function (id) {
//   return (state) =>
//     state.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

/*
 if (item.pizzaId=== id){
return item.quantity ? item.quantity :0;


}


*/
// };
