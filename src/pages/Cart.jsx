import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useCart } from "../components/CartContext";

function CartPage() {
	const { cartItems, updateCart } = useCart(); // Use useCart hook
	const [show, setShow] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	const removeFromCart = (itemId) => {
		const newCart = cartItems.filter((item) => item.id !== itemId);
		updateCart(newCart); // Update cart using context
		setAlertMsg("Item removed from cart.");
		setShow(true);
	};

	useEffect(() => {}, [cartItems]);

	return (
		<div className="container mt-3">
			<h2>Your Cart</h2>
			{show && (
				<Alert variant="danger" onClose={() => setShow(false)} dismissible>
					{alertMsg}
				</Alert>
			)}
			{cartItems.length > 0 ? (
				<ul className="list-group">
					{cartItems.map((item) => (
						<li
							key={item.id}
							className="list-group-item d-flex justify-content-between align-items-center">
							<img
								src={item.image.url}
								alt={item.title}
								style={{ height: "80px", marginRight: "10px" }}
							/>
							{item.title} - {item.quantity} x ${item.price}
							<button
								className="btn btn-danger btn-sm"
								onClick={() => removeFromCart(item.id)}>
								Remove
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>Your cart is empty.</p>
			)}
		</div>
	);
}

export default CartPage;
