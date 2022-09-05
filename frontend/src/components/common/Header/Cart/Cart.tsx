import React from 'react';
import './Cart.scss';

const Cart: React.FC = () => {
  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__container-header">
          <h2>My Cart</h2>
        </div>

        <div className="cart__list">LIST</div>

        <div className="cart__checkout">
          <div className="cart__checkout-container">
            <div className="cart__checkout-item">
              <div className="cart__checkout-item-title">Subtotal</div>
              <div className="cart__checkout-item-detail">2000$</div>
            </div>
            <div className="cart__checkout-item">
              <div className="cart__checkout-item-title">Taxes</div>
              <div className="cart__checkout-item-detail">Calculated at checkout</div>
            </div>
            <div className="cart__checkout-item">
              <div className="cart__checkout-item-title">Shipping</div>
              <div className="cart__checkout-item-detail">FREE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
