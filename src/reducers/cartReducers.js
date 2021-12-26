import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_INFO_RESET,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  //----------------------------------cartItems: {...productInfo, product: objectID, quantity}[]
  switch (action.type) {
    case CART_ADD_ITEM:
      // item that we want add to cart
      const itemAdd = action.payload;
      // return item is existing in cart / or not
      const itemExist = state.cartItems.find(
        (cartItem) => cartItem.productId === itemAdd.productId
      );

      if (itemExist) {
        // itemAdd alredy existing cartItems
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            //-> we will update info cartItem at that index (ex: update quantity of cardItem)
            return cartItem.productId === itemAdd.productId
              ? itemAdd
              : cartItem;
          }),
        };
      } else {
        // if itemAdd not existing in cartItems -> just push it in cartItems
        return {
          ...state,
          cartItems: [...state.cartItems, itemAdd],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((el, i, arr) => {
          return el.productId !== action.payload.productId;
        }),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload.data,
      };

    case CART_INFO_RESET:
      return {
        cartItems: [],
        shippingAddress: {},
      };

    default:
      return {
        ...state,
      };
  }
};
