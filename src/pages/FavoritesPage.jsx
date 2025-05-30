import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/favorites/favoritesSlice';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const handleRemove = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Favorite Products</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">
          You haven’t added any favorites yet.{' '}
          <Link to="/" className="text-blue-600 underline">Browse products</Link>
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow relative">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="h-40 mx-auto" />
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                <p className="text-gray-700">${product.price}</p>
              </Link>
              <button
                onClick={() => handleRemove(product.id)}
                className="mt-2 px-4 py-2 bg-red-500 cursor-pointer text-white rounded w-full"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
