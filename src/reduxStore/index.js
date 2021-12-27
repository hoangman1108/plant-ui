import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from '../reducers/cartReducers';
import data from '../config/data';

const rootReducer = combineReducers({
  cartReducer: cartReducer,
});

const cartDataTest = [
  {
    productId: 5,
    name: 'Hoa Giấy Bonsai',
    category: 'Hoa',
    location: 'Việt Nam',
    price: 1999000,
    qty: 1,
    countInStock: '6',
    image: require('../assets/bonsai_1.jpg'),
    description:
      'Hoa giấy mọc thành một nhóm gồm 3 hoa và lá bắc, hình thành cụm ở phần cuối của nhánh. Lá bắc xếp hình tam giác, cách chăm sóc cây hoa giấy thuôn dài/trứng và nhọn đầu dài khoảng 3 – 5 cm. Bông hoa giấy thật sự nhỏ, mỗi cái gắn vào một lá bắc, hình ống phồng ở phần giữa.',
    rating: 5,
    thumnails: [
      require('../assets/bonsai_1.jpg'),
      require('../assets/image_2.png'),
      require('../assets/image_3.png'),
      require('../assets/image_7.png'),
    ],
  },
  {
    productId: 6,
    name: 'Tùng Lá Kim',
    category: 'Phong Thuỷ',
    location: 'Việt Nam',
    price: 1999000,
    qty: 3,
    countInStock: '5',
    image: require('../assets/bonsai_2.jpg'),
    description:
      'Cây tùng lá kim bonsai này được tạo dáng bay, tán hướng xuống qua miệng chậu đến 80 cm. Dáng này còn được gọi là dáng bán huyền, một dáng cơ bản và phổ biến trong nghệ thuật bonsai. Chậu cây tùng lá kim này có kích thược nhỏ, phù hợp trang trí nhiều nơi, dễ di chuyển, đặt để.',
    rating: 4,
    thumnails: [
      require('../assets/bonsai_2.jpg'),
      require('../assets/image_2.png'),
      require('../assets/image_3.png'),
      require('../assets/image_7.png'),
    ],
  },
];

localStorage.setItem('cartItems', JSON.stringify(cartDataTest));
const cartItemsLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressTest = '232 Hoà Hưng, P.13, Q.10, TP.HCM';
localStorage.setItem('shippingAddress', shippingAddressTest);

const shippingAdressLocalStorage = localStorage.getItem('shippingAddress')
  ? localStorage.getItem('shippingAddress')
  : '';

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
