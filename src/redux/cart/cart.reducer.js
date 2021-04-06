import { CartActionTypes } from "./cart.types";
// import { addItemToCart } from "./cart.utils";

const INTTIAL_STATE = {
  hidden: true,
  cartItems: [],
};

export const cartReducer = (state = INTTIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state; 
  }
};