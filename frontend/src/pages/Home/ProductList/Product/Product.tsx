import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import renderProductPrice from '@helpers/products';
import './Product.scss';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string[];
  size?: string[];
  color?: string[];
}
const DEFAULT_VALUE = 'default';
export const DEFAULT_PRODUCT: ProductProps = {
  id: 0,
  name: '',
  price: 0,
  imageUrl: [DEFAULT_VALUE],
  description: '',
  color: [DEFAULT_VALUE],
  size: [DEFAULT_VALUE],
};
const Product = (props: ProductProps): ReactElement => {
  const { name, price, imageUrl } = props;
  const defaultImageUrl = imageUrl[0];
  const formattedPrice = renderProductPrice(price);
  return (
    <NavLink end to={`/product/${name}`}>
      <section>
        <div className="product">
          <div className="product__container ">
            <img className="product__image" src={defaultImageUrl} alt="product" />
            <div className="product__info">
              <div className="product__info-name">{name}</div>
              <p className="product__info-price">{formattedPrice}</p>
            </div>
          </div>
        </div>
      </section>
    </NavLink>
  );
};

export default Product;
