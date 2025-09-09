import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContexst from "../store/UserProgressContext";

function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContexst);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
export default Header;
