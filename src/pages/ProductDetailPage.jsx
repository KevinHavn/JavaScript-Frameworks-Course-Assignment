import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://v2.api.noroff.dev/online-shop/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched product data:', data);
                setProduct(data.data); // Adjusting to access nested data
            })
            .catch(error => {
                console.error("Fetching error: ", error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col lg={6} md={8}>
                    {product ? (
                        <Card className="my-5">
                            <Card.Img 
                                variant="top" 
                                src={product.image?.url} 
                                alt={product.image?.alt || product.title} 
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Price: ${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}</Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        <p>Product data is not available.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetailPage;
