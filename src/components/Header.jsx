import { Navbar, Nav, Container } from "react-bootstrap";
import CartIcon from "./CartIcon";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand>Javascript Frameworks Course Assignment</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link className="nav-link" to="../Home">
								Home
							</Link>
							<Link className="nav-link" to="../Cart">
								<CartIcon />
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
