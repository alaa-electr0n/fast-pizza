import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;

/*
// REDUX NOTE 

2) configureStore({}):

configure the store it's an object takes reducer object that are reducers in the APP subscribed to 
and named as they are could be get from the store as {user: userReducer},


*/
