import { useState, useEffect } from 'react';
import axios from 'axios';
import { DEFAULT_PRODUCT, ProductProps } from '@pages/Home/ProductList/Product/Product';

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
        setError(e.message);
        setProduct(DEFAULT_PRODUCT);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productName]);

  return { product, loading, error };
};
export default useProductDetail;
