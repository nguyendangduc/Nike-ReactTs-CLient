export const getLocalStorage = (param: string) => {
  const local = localStorage.getItem(param);
  if (typeof local === "string") return JSON.parse(local);
  else return null;
};

export function checkItemsInCart() {
  let itemCard = localStorage.getItem("cartItem");
  //eslint-disable-next-line
  if (itemCard == null || itemCard == "") {
    localStorage.setItem("cartItem", "[]");
    itemCard = "[]";
  }
  return JSON.parse(itemCard);
}

export function addItemToCart(
  addedItem: CartItem,
  itemsInCart: Array<CartItem>
) {
  let itemsInCartLocal = localStorage.getItem("cartItem");

  if (typeof itemsInCartLocal == "string") {
    itemsInCartLocal = JSON.parse(itemsInCartLocal);
  }

  if (Array.isArray(itemsInCartLocal)) {
    itemsInCartLocal.push(addedItem);
    localStorage.setItem("cartItem", JSON.stringify(itemsInCartLocal));
    return itemsInCartLocal;
  }
}
