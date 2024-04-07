import { useEffect, useState } from "react";
import shoppingCartImage from '../assets/shoppingcart.png';

function CartIcon() {
	const [itemCount, setItemCount] = useState(0);

	const updateCartCount = () => {
		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		const count = cart.reduce((total, product) => total + product.quantity, 0);
		setItemCount(count);
	};

	useEffect(() => {
		updateCartCount();

		window.addEventListener("storage", updateCartCount);
		return () => window.removeEventListener("storage", updateCartCount);
	}, []);

	return (
		<div className="position-relative">
			<img src={shoppingCartImage} alt="Shopping Cart" className="cart-icon" width="30px" />
			{itemCount > 0 && (
				<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
					{itemCount}
					<span className="visually-hidden">items in cart</span>
				</span>
			)}
		</div>
	);
}

export default CartIcon;
