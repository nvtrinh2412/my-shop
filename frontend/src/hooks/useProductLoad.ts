import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosConfig from '@services/axiosConfig';
import rootState from '@models/rootState';
import { ProductProps } from '@pages/Home/ProductList/Product/Product';

interface useProductLoadProps {
  products: ProductProps[];
  loading: boolean;
  error: string;
}
const useProductLoad = (): useProductLoadProps => {
  const dataUrl = useSelector((state: rootState) => state.filter.url);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosConfig.get(dataUrl);
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataUrl]);

  return { products, loading, error };
};

export default useProductLoad;
