import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import ProductDetailCard from "../components/ProductDetailCard";

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
                console.log("Fetched product data:", data);
                // Ensure you're accessing the product data correctly
                setProduct(data.data);
            })
            .catch((error) => {
                console.error("Fetching error: ", error);
                setError(error.message);
            })
            .finally(() => {
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
						<ProductDetailCard
							product={product}
							handleAddToCart={handleAddToCart}
							cartError={cartError}
						/>
					) : (
						<p>Product data is not available.</p>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default ProductDetailPage;
