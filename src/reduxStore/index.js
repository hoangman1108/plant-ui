import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from '../reducers/cartReducers';
import data from '../config/data';

const rootReducer = combineReducers({
  cartReducer: cartReducer,
});

// Todo: Change later
const cartItemsLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : data.slice(5);

const shippingAdressLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cartReducer: {
    cartItems: cartItemsLocalStorage,
    shippingAddress: shippingAdressLocalStorage,
  },

  // userLogin: { userInfo: userInfoLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
