import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories } from './features/products/productsSlice';

import Header from './components/Header';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const dispatch = useDispatch();

  // Initial data fetch
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-10">
        <Header />
        <main className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
