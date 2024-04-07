import { Navbar, Nav, Container } from "react-bootstrap";
import CartIcon from "./CartIcon";
import { Link } from "react-router-dom";

export function Header() {
	return (
		<header>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link className="nav-link" to="../Home">
								Home
							</Link>
							<Link className="nav-link" to="../Products">
								Products
							</Link>
							<Link className="nav-link" to="../Cart"><CartIcon /></Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
