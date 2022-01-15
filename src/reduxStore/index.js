import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from '../reducers/cartReducers';
import data from '../config/data';

import {
  getDataStr,
  getDataObj,
  storeDataString,
  storeDataObj
} from '../config/asyncStorage';

const rootReducer = combineReducers({
  cartReducer: cartReducer
});

const cartDataTest = [
  {
    productId: 0,
    name: 'Samantha',
    location: 'Russia',
    price: 1999000,
    image: require('../assets/image_1.png'),
    description:
      'Hoa giấy mọc thành một nhóm gồm 3 hoa và lá bắc, hình thành cụm ở phần cuối của nhánh. Lá bắc xếp hình tam giác, cách chăm sóc cây hoa giấy thuôn dài/trứng và nhọn đầu dài khoảng 3 – 5 cm. Bông hoa giấy thật sự nhỏ, mỗi cái gắn vào một lá bắc, hình ống phồng ở phần giữa.',
    rating: 4,
    thumnails: [
      require('../assets/image_1.png'),
      require('../assets/image_2.png'),
      require('../assets/image_3.png'),
      require('../assets/bottom_img_1.png')
    ],
    countInStock: '4',
    qty: 2
  },
  {
    productId: 4,
    name: 'Marinda',
    location: 'Russia',
    price: 6999000,
    image: require('../assets/bottom_img_2.png'),
    description:
      'Hoa giấy mọc thành một nhóm gồm 3 hoa và lá bắc, hình thành cụm ở phần cuối của nhánh. Lá bắc xếp hình tam giác, cách chăm sóc cây hoa giấy thuôn dài/trứng và nhọn đầu dài khoảng 3 – 5 cm. Bông hoa giấy thật sự nhỏ, mỗi cái gắn vào một lá bắc, hình ống phồng ở phần giữa.',
    thumnails: [
      require('../assets/bottom_img_2.png'),
      require('../assets/image_2.png'),
      require('../assets/image_3.png'),
      require('../assets/image_7.png')
    ],
    rating: 4,
    countInStock: '12',
    qty: 3
  }
];

//localStorage.setItem('cartItems', JSON.stringify(cartDataTest));
// const cartItemsLocalStorage = localStorage.getItem('cartItems')
// ? JSON.parse(localStorage.getItem('cartItems'))
// : [];

(async () => await storeDataObj('cartItems', cartDataTest))();

let cartItemsLocalStorage = [];
getDataObj('cartItems')
  .then((data) => {
    console.log('cartItemsLocalStorage 1: ', data);
    cartItemsLocalStorage = data;
  })
  .catch((e) => console.log(e));

console.log('cartItemsLocalStorage 2: ', cartItemsLocalStorage);

// const shippingAddressTest = '232 Hoà Hưng, P.13, Q.10, TP.HCM';
// localStorage.setItem('shippingAddress', shippingAddressTest);

let shippingAdressLocalStorage = '';
getDataStr('shippingAddress')
  .then((data) => (shippingAdressLocalStorage = data !== null ? data : ''))
  .catch((e) => console.log(e));

(async () => {
  await storeDataString('isAdmin', 'true');
})();

console.log('shippingAdressLocalStorage: ', shippingAdressLocalStorage);

let initialState = {};

initialState = {
  cartReducer: {
    cartItems: cartItemsLocalStorage,
    shippingAddress: shippingAdressLocalStorage
  }
};

const middleware = [thunk];

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
