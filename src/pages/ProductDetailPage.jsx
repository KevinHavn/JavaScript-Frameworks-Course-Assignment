import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Card,
	Container,
	Row,
	Col,
	ListGroup,
	Button,
	Alert,
} from "react-bootstrap";
import { useCart } from "../components/CartContext";

function ProductDetailPage() {
	const { productId } = useParams();
	const { cartItems, updateCart } = useCart();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [cartError, setCartError] = useState("");

	useEffect(() => {
		fetch(`https://v2.api.noroff.dev/online-shop/${productId}`)
			.then((response) => response.json())
			.then((data) => {
				setProduct(data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Fetching error: ", error);
				setError(error.message);
				setLoading(false);
			});
	}, [productId]);

	const handleAddToCart = () => {
		const isProductInCart = cartItems.some((item) => item.id === product.id);

		if (isProductInCart) {
			setCartError(`The product "${product.title}" is already in your cart.`);
			setTimeout(() => setCartError(""), 3000);
		} else {
			const productToAdd = { ...product, quantity: 1 };
			const newCart = [...cartItems, productToAdd];
			updateCart(newCart);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<Container className="mt-3">
			<Row className="justify-content-center">
				<Col lg={6} md={8}>
					{product ? (
						<>
							{cartError && <Alert variant="danger">{cartError}</Alert>}
							<Card className="mb-4">
								<Card.Img
									variant="top"
									src={product.image?.url}
									alt={product.image?.alt || product.title}
								/>
								<Card.Body>
									<Card.Title>{product.title}</Card.Title>
									<Card.Text>{product.description}</Card.Text>
									<Card.Text>
										Price: $
										{product.discountedPrice
											? product.discountedPrice.toFixed(2)
											: product.price.toFixed(2)}
									</Card.Text>
									<Button variant="primary" onClick={handleAddToCart}>
										Add to Cart
									</Button>
								</Card.Body>
								<Card.Footer>
									{" "}
									<ListGroup variant="flush">
										<h2>Reviews</h2>
										{product.reviews.length > 0 ? (
											product.reviews.map((review) => (
												<ListGroup.Item key={review.id}>
													<strong>{review.username}</strong>:{" "}
													{review.description} - <em>{review.rating}/5</em>
												</ListGroup.Item>
											))
										) : (
											<ListGroup.Item>No reviews yet.</ListGroup.Item>
										)}
									</ListGroup>
								</Card.Footer>
							</Card>
						</>
					) : (
						<p>Product data is not available.</p>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default ProductDetailPage;
