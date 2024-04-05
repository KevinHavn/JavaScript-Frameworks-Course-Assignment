import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Footer() {
	return (
		<footer>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link className="nav-link" to="../about">About Us</Link>
							<Link className="nav-link" to="../contact">Contact Us</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</footer>
	);
}
