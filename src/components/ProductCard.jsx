import PropTypes from "prop-types";
import { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function ProductCard({ product }) {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const { cartItems, updateCart } = useCart();

    const handleAddToCart = (event) => {
        event.stopPropagation(); // Prevent event from bubbling up to the link
        const isProductInCart = cartItems.some(item => item.id === product.id);

        if (isProductInCart) {
            setAlertMessage(`The product "${product.title}" is already in your cart.`);
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
        discountPercentage = Math.round(((product.price - product.discountedPrice) / product.price) * 100);
    }

    return (
        <Card className="h-100">
            <Link to={`/product/${product.id}`}>
                <Card.Img variant="top" src={product.image.url} alt={product.image.alt || product.title} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <Card.Title>{product.title}</Card.Title>
                </Link>
                <Card.Text>{product.description}</Card.Text>
                {discountPercentage > 0 ? (
                    <>
                        <Card.Text className="text-danger">Sale! {discountPercentage}% off</Card.Text>
                        <Card.Text>
                            <del>${product.price.toFixed(2)}</del> ${product.discountedPrice.toFixed(2)}
                        </Card.Text>
                    </>
                ) : (
                    <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                )}
            </Card.Body>
            <Card.Footer>
                <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </Card.Footer>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
        </Card>
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
