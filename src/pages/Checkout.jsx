import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useCart } from "../components/CartContext";

function Checkout() {
  const { updateCart } = useCart();

  useEffect(() => {
    // Clears the cart when this component is mounted
    updateCart([]);
  }, [updateCart]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>Success!</Card.Title>
              <Card.Text>Your checkout process was successful.</Card.Text>
              <Card.Text>
                Interested in browsing more? <Link to="/">Click here!</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
