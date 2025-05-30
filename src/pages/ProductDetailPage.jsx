

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../features/favorites/favoritesSlice';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleFavorite = () => {
    if (product) {
      dispatch(addFavorite(product));
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain mx-auto"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <p className="text-xl text-green-600 mb-4">${product.price}</p>
          <p className="mb-6">{product.description}</p>
          <button
            onClick={handleFavorite}
            className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
          >
            Add to Favorites ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
