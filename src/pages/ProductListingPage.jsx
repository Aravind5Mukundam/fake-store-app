import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const ProductListingPage = () => {
  const { items, status, error, categories } = useSelector((state) => state.products);
  const { search, category, sort } = useSelector((state) => state.filters);

  // Filter products
  const filteredProducts = items
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === 'all' ? true : product.category === category
    )
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div>
      <SearchBar categories={categories} />
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListingPage;
