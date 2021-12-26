import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import data from '../config/data';

export const addToCart = (product, qty) => async (dispatch, getState) => {
  const productId = product.id;
  delete product.id;

  const itemAdd = { productId, ...product, qty };

  // dispatch action (with payload info) to cartReducers => push itemAdd to state.cart.cartItems
  dispatch({
    type: CART_ADD_ITEM,
    payload: itemAdd,
  });

  // after save card info to redux state -> save card info down to localStorage
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  // 1. dispatch action (with payload info) to cartReducers => delete product from state.cart.cartItems
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      productId,
    },
  });

  // update localStorage after delete a product in cart
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: {
      data,
    },
  });

  localStorage.setItem('shippingAddress', data);
};

// export const savePaymentMethod = (paymentMethod) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_PAYMENT_METHOD,
//     payload: paymentMethod,
//   });

//   localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
// };
