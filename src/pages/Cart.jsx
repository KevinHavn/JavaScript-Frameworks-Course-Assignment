import { useEffect, useState } from "react";
import {
	Alert,
	Container,
	Row,
	Col,
	Button,
	Card,
	ListGroup,
} from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
	const { cartItems, updateCart } = useCart();
	const [show, setShow] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [total, setTotal] = useState(0);

	const removeFromCart = (itemId) => {
		const newCart = cartItems.filter((item) => item.id !== itemId);
		updateCart(newCart);
		setAlertMsg("Item removed from cart.");
		setShow(true);
	};

	useEffect(() => {
		let total = 0;
		cartItems.forEach((item) => {
			total += item.price * item.quantity;
		});
		setTotal(total);
	}, [cartItems]);

	return (
		<Container className="mt-3">
			<Row>
				<Col md={8}>
					<Card className="mb-3">
						<Card.Body>
							<h2>Your Cart</h2>
							{show && (
								<Alert
									variant="danger"
									onClose={() => setShow(false)}
									dismissible>
									{alertMsg}
								</Alert>
							)}
							{cartItems.length > 0 ? (
								<ListGroup variant="flush">
									{cartItems.map((item) => (
										<ListGroup.Item
											key={item.id}
											className="d-flex justify-content-between align-items-center">
											<img
												src={item.image.url}
												alt={item.title}
												style={{ height: "80px", marginRight: "10px" }}
											/>
											{item.title} - {item.quantity} x ${item.price}
											<Button
												variant="danger"
												size="sm"
												onClick={() => removeFromCart(item.id)}>
												Remove
											</Button>
										</ListGroup.Item>
									))}
								</ListGroup>
							) : (
								<Card.Text>Your cart is empty.</Card.Text>
							)}
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className="mb-3">
						<Card.Body>
							<h3>Order Summary</h3>
							<Card.Text>Total: ${total.toFixed(2)}</Card.Text>
							<Button as={Link} to="../checkout" variant="success">
								Proceed to Checkout
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default CartPage;
