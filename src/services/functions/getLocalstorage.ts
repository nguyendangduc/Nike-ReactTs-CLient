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

export function addItemToCart(addedItem: any) {
  let itemsInCart = localStorage.getItem("cartItem");

  if (typeof itemsInCart == "string") {
    itemsInCart = JSON.parse(itemsInCart);
  }
  if (Array.isArray(itemsInCart)) {
    itemsInCart.push(addedItem);
    localStorage.setItem("cartItem", JSON.stringify(itemsInCart));
    return itemsInCart;
  }
}

