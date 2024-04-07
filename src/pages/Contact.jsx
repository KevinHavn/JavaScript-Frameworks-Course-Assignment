import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Contact() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        
        const data = {
            fullName: formData.get('fullName'),
            subject: formData.get('subject'),
            email: formData.get('email'),
            message: formData.get('body')
        };

        console.log(data);
        alert("Form submitted!");
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Contact Us</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="fullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        name="fullName"
                                        type="text"
                                        placeholder="Enter your full name"
                                        required
                                        minLength="3"
                                    />
                                </Form.Group>

                                <Form.Group controlId="subject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        name="subject"
                                        type="text"
                                        placeholder="Enter a subject"
                                        required
                                        minLength="3"
                                    />
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="body">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        name="body"
                                        as="textarea"
                                        placeholder="Enter your message"
                                        required
                                        minLength="3"
                                        rows={3}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
