import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product/Product';
import './ProductList.scss';
import { setInterval } from 'timers/promises';
import Loading from './Loading/Loading';
function ProductList(): JSX.Element {
  interface Product {
    isLoading: boolean;
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  }
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const { data } = await axios.get('http://localhost:8080/api/v1/products');
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="product-list">
        <div className="product-list__container">
          {loading ? (
            <Loading />
          ) : (
            <>
              {products.map((product: Product) => {
                const { id, name, price, imageUrl } = product;
                return (
                                   <section className="product-list__item" key={product.id}>
                    <Product isLoading={loading} id={id} name={name} price={price} imageUrl={imageUrl} />
                  </section>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default ProductList;
