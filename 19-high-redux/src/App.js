import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/Notification/Notification";
import { fetchCartData, sendCartData } from "./components/store/cart-action";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {toggle && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
