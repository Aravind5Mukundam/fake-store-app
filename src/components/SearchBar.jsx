import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCategory, setSort } from '../features/filters/filtersSlice'; // ✅ Correct imports
import { useEffect, useState } from 'react';

const SearchBar = ({ categories }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearch(searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-2 md:mb-0 md:mr-4 flex-1"
      />
      <select
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="border p-2 rounded mb-2 md:mb-0 md:mr-4"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        value={filters.sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
        className="border p-2 rounded"
      >
        <option value="none">Sort by</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SearchBar;
