import { useState, useEffect } from 'react';
import axiosConfig from '@services/axiosConfig';
import { DEFAULT_PRODUCT, ProductProps } from '@pages/Home/ProductList/Product/Product';

interface IProps {
  product: ProductProps | undefined;
  loading: boolean;
  error: string;
}
const useProductDetail = (productName: string): IProps => {
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: ProductProps[] = await axiosConfig.get(`/products/filter?name=${productName}`);
        setProduct(data[0]);
        console.log(data);
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
