import React from 'react';
import './Product.scss';
import renderProductPrice from '../../../../../assets/helper/products';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const  Product = (props: ProductProps) =>  {
  const { name, price, imageUrl } = props;
  const formattedPrice = renderProductPrice(price);
  return (
      <section>
        <div className="product">
          <div className="product__container ">
            <img className="product__image" src={imageUrl} alt="product" />
            <div className="product__info">
              <div className="product__info-name">{name}</div>
              <p className="product__info-price">{formattedPrice}</p>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Product;
