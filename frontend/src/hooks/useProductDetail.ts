import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import rootState from '../models/rootState';
import { ProductProps } from '../pages/Home/components/ProductList/Product/Product';

interface IProps {
  product: ProductProps | undefined;
  loading: boolean;
  error: string;
}
const DEFAULT_URL = 'http://localhost:8080/api/v1';
const useProductDetail = (productName: string): IProps => {
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${DEFAULT_URL}/products/search?name=${productName}`);
        setProduct(data[0]);
      } catch (e: any) {
        const errorProduct: ProductProps = {
          id: 0,
          name: '',
          price: 0,
          description: '',
          imageUrl: ['error'],
        };
        setError(e.message);
        setProduct(errorProduct);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productName]);

  return { product, loading, error };
};
export default useProductDetail;
