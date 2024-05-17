// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';

// import { composeWithDevTools } from 'redux-devtools-extension';
// import { rootReducer } from './rootReducer';

// const initialState = {
//   cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
// };

// const finalReducer = combineReducers({
//   rootReducer,
// });

// const middleware = [thunk];
// const store = createStore(finalReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// export default store;

import {createStore, combineReducers, applyMiddleware} from 'redux';

import { thunk } from 'redux-thunk'; // Correct, import thunk as a named export


import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './rootReducer';

const finalReducer = combineReducers({
    rootReducer
})
const initialState = {
    rootReducer :{
        cartItemms : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    }
}


const middleware = [thunk]

const store = createStore(finalReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;