import shoppingCartImage from '../assets/shoppingcart.png';
import { useCart } from './CartContext'; 

function CartIcon() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="position-relative">
      <img src={shoppingCartImage} alt="Shopping Cart" className="cart-icon" width="30px" />
      {itemCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {itemCount}
          <span className="visually-hidden">items in cart</span>
        </span>
      )}
    </div>
  );
}

export default CartIcon;
