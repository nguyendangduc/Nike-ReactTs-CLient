import { checkItemsInCart } from "../../functions";

interface CartState {
  itemsInCart: Array<CartItem>;
  addItemToCartMessage: boolean;
}

const initState: CartState = {
  itemsInCart: checkItemsInCart(),
  addItemToCartMessage: false,
};

function authReducer(
  state: CartState = initState
  //   action:
) {
  //   switch (action.type) {
  //     default:
  //       return initState;
  //   }
}

export default authReducer;
