import { useState, useEffect } from 'react';
import axiosConfig from '@services/axiosConfig';
import { DEFAULT_PRODUCT, ProductProps } from '@pages/Home/ProductList/Product/Product';

interface useProductDetailResponseProps {
  product: ProductProps | undefined;
  loading: boolean;
  error: string;
}
const firstProductIndex = 0;
const useProductDetail = (productName: string): useProductDetailResponseProps => {
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/products/search?name=${productName}`);
        setProduct(data[firstProductIndex]);
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
