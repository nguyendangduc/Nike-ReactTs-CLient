import { memo } from "react";

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
function ItemInCart({ itemsInCart, handleDeleteBtn, handleEditBtn }) {
  return <div>ItemInCart</div>
  
}
export default memo(ItemInCart);
