import PropTypes from "prop-types";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useCart } from "./CartContext";

function ProductCard({ product }) {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const { cartItems, updateCart } = useCart();

	const handleAddToCart = () => {
		const isProductInCart = cartItems.some((item) => item.id === product.id);

		if (isProductInCart) {
			setAlertMessage(
				`The product "${product.title}" is already in your cart.`
			);
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
				setAlertMessage("");
			}, 3000);
		} else {
			const newCart = [...cartItems, { ...product, quantity: 1 }];
			updateCart(newCart);
			setAlertMessage(`${product.title} added to cart!`);
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
				setAlertMessage("");
			}, 3000);
		}
	};

	let discountPercentage = 0;
	if (product.price > product.discountedPrice) {
		discountPercentage = Math.round(
			((product.price - product.discountedPrice) / product.price) * 100
		);
	}

	return (
		<div className="card h-100">
			{showAlert && (
				<Alert
					variant="success"
					onClose={() => setShowAlert(false)}
					dismissible>
					{alertMessage}
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
				{discountPercentage > 0 ? (
					<>
						<p className="card-text text-danger">
							Sale! {discountPercentage}% off
						</p>
						<p className="card-text">
							<del>${product.price.toFixed(2)}</del> $
							{product.discountedPrice.toFixed(2)}
						</p>
					</>
				) : (
					<p className="card-text">Price: ${product.price.toFixed(2)}</p>
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
