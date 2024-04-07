/* eslint-disable react/prop-types */
function SearchBar({ onSearchChange }) {
	return (
		<div>
			<label htmlFor="searchProducts" className="visually-hidden">
				Search Products
			</label>
			<input
				id="searchProducts"
				className="form-control mb-3"
				type="text"
				placeholder="Search products..."
				onChange={(e) => onSearchChange(e.target.value)}
			/>
		</div>
	);
}

export default SearchBar;
