import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // 중복 방지를 위해 state의 item과 action으로 들어오는 item이 같은것인지 확인
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

    //state에 직접 데이터를 변경하는것은 좋지 않기에 복사본을 만들어 낸다.
    const updatedItems = [...state.items];

    // 중복되지 않을 경우 findIndex에서는 -1를 반환하게 된다.
    // -1보다 큰 경우 이므로 중복된 값이다.
    if (existingCartItemIndex > -1) {
      //state의 복사본을 만든다.
      const existingItem = state.items[existingCartItemIndex];
      // 스프레드 전개를 통해 quantity의 값을 1 추가 업데이트 하도록 한다.
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      // updatedItems[existingCartItemIndex] 의 업데이트된 값으로 덮어 씌운다.
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // 중복이 되지 않은 새로운 값일 때 push를 한다. quantity값은 1로
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    // state의 items 값을 udpatedItems로 덮어씌운다.
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // 중복된 값인지 확인
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

    const existingCartItem = state.items[existingCartItemIndex];

    // state를 직접 수정하면 안되기 떄문에 복사본을 생성
    const updatedItems = [...state.items];
    // 고른 아이템의 수량이 1일 경우
    if (existingCartItem.quantity === 1) {
      //splice를 통해 해당 아이템을 삭제한다. splice(index번호, 삭제할 수량)
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
