/* eslint-disable react/prop-types */
import { Card, ListGroup, Button, Alert } from "react-bootstrap";

function ProductDetailCard({ product, handleAddToCart, cartError }) {
	let discountPercentage = 0;
	if (product.price > product.discountedPrice) {
		discountPercentage = Math.round(
			((product.price - product.discountedPrice) / product.price) * 100
		);
	}

	return (
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
					{discountPercentage > 0 ? (
						<>
							<Card.Text className="text-danger">
								Sale! {discountPercentage}% off
							</Card.Text>
							<Card.Text>
								<del>${product.price.toFixed(2)}</del> $
								{product.discountedPrice.toFixed(2)}
							</Card.Text>
						</>
					) : (
						<Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
					)}

					<Button variant="primary" onClick={handleAddToCart}>
						Add to Cart
					</Button>
				</Card.Body>
				<Card.Footer>
					<ListGroup variant="flush">
						<h2>Reviews</h2>
						{product.reviews.length > 0 ? (
							product.reviews.map((review) => (
								<ListGroup.Item key={review.id}>
									<strong>{review.username}</strong>: {review.description} -{" "}
									<em>{review.rating}/5</em>
								</ListGroup.Item>
							))
						) : (
							<ListGroup.Item>No reviews yet.</ListGroup.Item>
						)}
					</ListGroup>
				</Card.Footer>
			</Card>
		</>
	);
}

export default ProductDetailCard;
