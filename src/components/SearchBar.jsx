/* eslint-disable react/prop-types */
function SearchBar({ onSearchChange }) {
    return (
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  