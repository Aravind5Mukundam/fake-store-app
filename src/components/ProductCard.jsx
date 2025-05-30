import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorited = favorites.some(item => item.id === product.id);

  const handleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };
  

  return (
    <div className="border p-4 rounded shadow">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="h-40 mx-auto" />
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-700">${product.price}</p>
      </Link>
      <button
        onClick={handleFavorite}
        className={`mt-2 px-4 cursor-pointer  py-2 rounded ${isFavorited ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isFavorited ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ProductCard;
