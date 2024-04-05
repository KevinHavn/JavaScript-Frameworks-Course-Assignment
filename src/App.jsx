import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Products, Cart, Contact } from "./pages";
import "./styles/custom.scss";
import About from "./pages/About";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
