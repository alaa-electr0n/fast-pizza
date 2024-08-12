import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!searchId) return;
    navigate(`/order/${searchId}`);
    setSearchId('');
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="search-order"
        placeholder="Search order #"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-3 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
