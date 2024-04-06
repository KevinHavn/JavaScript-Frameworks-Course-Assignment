import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch("https://v2.api.noroff.dev/online-shop")
			.then((response) => response.json())
			.then((data) => {
				console.log("Fetched data:", data);
				setProducts(data.data);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="container mt-3">
			<div className="row">
				{Array.isArray(products) &&
					products.map((product) => (
						<div className="col-md-4" key={product.id}>
							<ProductCard product={product} />
						</div>
					))}
			</div>
		</div>
	);
}

export default Products;
