import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const resposne = await fetch("https://u-react-ce844-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");

      if (!resposne.ok) {
        throw new Error("가져오는데 실패함");
      }
      const data = await resposne.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sendig cart data!",
      })
    );

    const sendRequest = async () => {
      const resposne = await fetch("https://u-react-ce844-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!resposne.ok) {
        throw new Error("에러임");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sendig cart data Successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sendig cart data failed",
        })
      );
    }
  };
};
