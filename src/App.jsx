import Layout from "./components/Layout";
import { CartProvider } from "./components/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Cart, Contact, ProductDetailPage, Checkout } from "./pages";
import "./styles/custom.scss";

function App() {
	return (
		<CartProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product/:productId" element={<ProductDetailPage />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/checkout" element={<Checkout />}></Route>
					</Routes>
				</Layout>
			</Router>
		</CartProvider>
	);
}

export default App;
