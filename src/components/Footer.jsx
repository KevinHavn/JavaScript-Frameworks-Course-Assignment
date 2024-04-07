import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link className="nav-link" to="../contact">Contact Us</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</footer>
	);
}

export default Footer;