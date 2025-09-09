import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.cart.totalQuantity);

  const togglehandler = () => {
    dispatch(uiActions.toggleCart());
  };
  return (
    <button className={classes.button} onClick={togglehandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;
