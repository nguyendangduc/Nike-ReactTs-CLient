import { Link, Route } from "react-router-dom";
import { memo, useContext, useState } from "react";
import { ContextElement } from "../App";
import Summary from "../components/cart/Summary";
<<<<<<< HEAD
=======
import ItemsInCart from "../components/cart/ItemsInCart/ItemsInCart";
>>>>>>> master
import AuthenticatedGuard from "../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
import { useAppSelector, userSettingsStatus } from "../services/store";
import { deleteCarts } from "../services/apis/functions/ordersApi";
import { useDispatch } from "react-redux";
import ItemsInCart from "../components/cart/ItemsInCart";
let rules = ["user"];

function Cart() {
  let { itemsInCart, setItemsInCart } = useContext(ContextElement);
  const { dataUser } = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  let shipping = 20;
  let getSubTotal = (itemsInCart: any) => {
    let price = itemsInCart.map((item: CartItem) => item.price);
    if (price.length > 0) {
      return price.reduce((a: number, b: number) => a + b);
    }
  };

  const [subTotal, setSubTotal] = useState(getSubTotal(itemsInCart));
  const [edit, setEdit] = useState(false);

  function subTotalCal(items: any) {
    let newSubTotal = getSubTotal(items);
    setSubTotal(newSubTotal);
  }

  function handleDeleteBtn(index: string) {
    if(dataUser){
      deleteCarts(dataUser.id, index)
        .then(res=>{
          console.log("hello");
        })
        .catch(err => console.log(err))
    }
    // let newItemsList = [...itemsInCart];
    // newItemsList.splice(index, 1);
    // setItemsInCart(newItemsList);
    subTotalCal(ItemsInCart);
    // localStorage.setItem("cartItem", JSON.stringify(newItemsList));
  }

  function handleEditBtn(index: number) {
    setEdit(true);
  }

  let total = subTotal + shipping;

  return (
    <>
      {/* <AuthenticatedGuard routeRules={rules}> */}
      {itemsInCart.length > 0 ? (
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-md-8">
              <h2 className="mb-3">Bag</h2>
              <div className="bag-items">
                <ItemsInCart
                  itemsInCart={itemsInCart}
                  handleDeleteBtn={handleDeleteBtn}
                  handleEditBtn={handleEditBtn}
                // edit={edit}
                // setEdit={setEdit}
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <Summary
                subTotal={subTotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        </div>

      ) : (
        <div className="container  mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-md-8">
              <h2 className="mb-3">Bag</h2>
              <div className="bag-items">
                <h2>Your bag is empty</h2>
                <Link to="/products">
                  <button type="button" className="btn btn-dark">
                    Back to shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* </AuthenticatedGuard> */}
    </>
  );
}
export default memo(Cart);
