import PropTypes from "prop-types";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useCart } from "./CartContext";

function ProductCard({ product }) {
	const [showAlert, setShowAlert] = useState(false);
	const [error, setError] = useState("");
	const { updateCart, cartItems } = useCart();

	const handleAddToCart = () => {
		const isProductInCart = cartItems.some((item) => item.id === product.id);

		if (isProductInCart) {
			setError(`The product "${product.title}" is already in your cart.`);
			setTimeout(() => setError(""), 5000); 
		} else {
			const newCart = [...cartItems, { ...product, quantity: 1 }];
			updateCart(newCart);
			setShowAlert(true);
			setTimeout(() => setShowAlert(false), 3000);
		}
	};

	return (
		<div className="card h-100">
			{showAlert && (
				<Alert
					variant="success"
					onClose={() => setShowAlert(false)}
					dismissible>
					{product.title} added to cart!
				</Alert>
			)}

			{error && (
				<Alert variant="danger" onClose={() => setError("")} dismissible>
					{error}
				</Alert>
			)}

			<img
				src={product.image.url}
				alt={product.image.alt || product.title}
				className="card-img-top"
			/>
			<div className="card-body">
				<h5 className="card-title">{product.title}</h5>
				<p className="card-text">{product.description}</p>
				<p className="card-text">
					Price: $
					{product.discountedPrice < product.price
						? product.discountedPrice
						: product.price}
				</p>
				{product.discountedPrice < product.price && (
					<p className="text-danger">
						Discount: ${product.price - product.discountedPrice}
					</p>
				)}
				<button className="btn btn-primary" onClick={handleAddToCart}>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

ProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		discountedPrice: PropTypes.number,
		image: PropTypes.shape({
			url: PropTypes.string.isRequired,
			alt: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default ProductCard;
