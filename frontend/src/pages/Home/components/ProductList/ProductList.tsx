import React, { ReactElement, useState } from 'react';
import Product, { ProductProps } from './Product/Product';
import './ProductList.scss';

interface IProps {
  products: ProductProps[];
}
const ProductList: React.FC<IProps> = (props: IProps): ReactElement => {
  const { products } = props;
  return (
    <div className="product-list">
      <div className="product-list__container">
        {products.map((product: ProductProps): ReactElement => {
          const { id, name, price, imageUrl } = product;
          return (
            <section className="product-list__item" key={product.id}>
              <Product id={id} name={name} price={price} imageUrl={imageUrl} />
            </section>
          );
        })}
      </div>
    </div>
  );
};
export default ProductList;
