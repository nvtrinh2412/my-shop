import { useState, useEffect } from 'react';
import axiosConfig from '@services/axiosConfig';
import { AxiosError } from 'axios';
import { DEFAULT_PRODUCT, ProductProps } from '@pages/Home/ProductList/Product/Product';

interface useProductDetailResponseProps {
  product: ProductProps | undefined;
  loading: boolean;
  error: string;
}
const useProductDetail = (productName: string): useProductDetailResponseProps => {
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: ProductProps[] = await axiosConfig.get(`/products/search?name=${productName}`);
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
