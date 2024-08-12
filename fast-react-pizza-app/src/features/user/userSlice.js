import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

//redux is synchronus , it doensn't deal with async function or side effects
//so we need to use thunks middleware with redux tool kit
//thunk => sets between the dispatch and the reducer
//thunks modify and update the dispatch and do some sideeffect on it before it sent to the store via the reducer

function getPosition() {
  //this function is wrapped inside a promise to be later used with async/await to fetch data
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const initialState = {
  username: 'Alaa',
  //add the states if the thunk
  status: 'idle',
  error: '',
  position: {},
  address: '',
};

//create AsyncAsyncThunk action that take the [action name] and the [async function] that will create the payload of the reducer
//fetchAdress here is an action creator function that return the payload , so we need to call it later in the app
export const fetchAddress = createAsyncThunk(
  'user/fetchAdress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    //this is the action paload that will be returned
    return { position, address };
  },
);

// we need to connect the thunck with our reducer the createAsyncthunck will create 3 actioncreators we should handle
//1- action function fo pending promise state
//2- action functin for fullfilled state
//3- action function for rejected state
// the three of them will be chained together in the reducer

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your Address please fill this field!'; //action.error.message; //this error automatically placed in the action that's why we get it like that
      });
  },
});

export const { updateUserName } = userSlice.actions;
console.log(userSlice);

export default userSlice.reducer;

/*  
  //REDUX NOTE:

1) createSlice({})
create the initial state, the reducer and the reducers actions
then: export the action : from userSlice.actions to be used to update the dispatch
then: export the whole reducer to be subscribed to the redux store.  

*/

//Getter functions

export const getUserName = (state) => state.user.username;
