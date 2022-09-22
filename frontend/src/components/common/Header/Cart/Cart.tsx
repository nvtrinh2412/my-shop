import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingBag } from 'react-icons/fi';
import rootState from '@models/rootState';
import renderProductPrice from '@helpers/products';
import { addToCart, removeFromCart } from './cartSlice';
import './Cart.scss';

const ADJUST_QUANTITY_OPTIONS = { INCREASE: 'increase', DECREASE: 'decrease' };

export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
}
const renderEmptyCart = () => {
  return (
    <div className="cart__empty-container">
      <div className="cart__empty-image">
        <FiShoppingBag className="cart__empty-image-icon" />
      </div>
      <h2 className="cart__empty-title">Your cart is empty </h2>
      <p className="cart__empty-message">Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.</p>
    </div>
  );
};

const Cart = () => {
  const { cartList, total } = useSelector((state: rootState) => state.cart);
  const formattedTotal = renderProductPrice(total);
  const dispatch = useDispatch();
  const handleAdjustQuantity = (item: CartItemProps, option: string): void => {
    if (option === ADJUST_QUANTITY_OPTIONS.INCREASE) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };
  const renderCartItem = (item: CartItemProps) => {
    const { name, price, quantity, size, color, imageUrl } = item;
    const formattedPrice = renderProductPrice(price);
    return (
      <div className="cart__item">
        <div className="cart__item-image">
          <img className="cart__item-image-img" src={imageUrl} alt="product" />
        </div>
        <div className="cart__item-info">
          <div className="cart__item-info-name">{name}</div>
          <div className="cart__item-info-color">
            <span>Color</span>
            <div className={` circle circle--${color}`}> </div>
          </div>
          <div className="cart__item-info-size">
            <span>Size</span>
            <div className="circle">{size}</div>
          </div>
          <div className="cart__item-info-quantity">
            <div
              className="cart__item-info-quantity-decrease"
              onClick={() => handleAdjustQuantity(item, ADJUST_QUANTITY_OPTIONS.DECREASE)}
              aria-hidden
            >
              -
            </div>
            <div className="cart__item-info-quantity-value">{quantity}</div>
            <div
              className="cart__item-info-quantity-increase"
              onClick={() => handleAdjustQuantity(item, ADJUST_QUANTITY_OPTIONS.INCREASE)}
              aria-hidden
            >
              +
            </div>
          </div>
        </div>
        <div className="cart__item-price">{formattedPrice}</div>
      </div>
    );
  };
  return (
    <div className="cart">
      <div className="cart__container">
        {cartList.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <div className="cart__header">
              <h2>My Cart</h2>
            </div>
            <div className="cart__list">{cartList.map((item) => renderCartItem(item))}</div>
            <div className="cart__checkout">
              <div className="cart__checkout-container">
                <div className="cart__checkout-item">
                  <div className="cart__checkout-item-title">Subtotal</div>
                  <div className="cart__checkout-item-detail">{formattedTotal}</div>
                </div>
                <div className="cart__checkout-item">
                  <div className="cart__checkout-item-title">Taxes</div>
                  <div className="cart__checkout-item-detail">Calculated at checkout</div>
                </div>
                <div className="cart__checkout-item">
                  <div className="cart__checkout-item-title">Shipping</div>
                  <div className="cart__checkout-item-detail">FREE</div>
                </div>

                <div className="cart__checkout-item cart__checkout-total">
                  <div className="cart__checkout-item-title">Total</div>
                  <div className="cart__checkout-item-detail">{formattedTotal}</div>
                </div>

                <div className="cart__checkout-button">
                  <a href="/">Proceed to Checkout</a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
