import React from "react";

import CustomButton from "../custom-button/CustomButton";
import CartItem from "../cart-item/CartItem";

import "./CartDropdown.scss";
import { connect } from "react-redux";

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

const mapStateToProps = ({ cart: { cartItems } }) => {
  return { cartItems };
};
export default connect(mapStateToProps)(CartDropdown);
