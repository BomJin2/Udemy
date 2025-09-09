import { useContext } from "react";
import { currencyFomatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }
  return (
    <li key={meal.id} className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt="" />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFomatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div>
          <p className="meal-item-actions">
            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}
export default MealItem;
