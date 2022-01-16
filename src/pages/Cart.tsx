import { Link } from "react-router-dom";
import { memo, useContext, useEffect, useState } from "react";
import { ContextElement } from "../App";
import Summary from "../components/cart/Summary";
import ItemsInCart from "../components/cart/ItemsInCart/ItemsInCart";
import { useAppSelector } from "../services/store";
import { deleteCarts } from "../services/apis";
import AuthenticatedGuard from "../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];

function Cart() {
  let { itemsInCart, setToDashBoard } = useContext(ContextElement);
  const { dataUser } = useAppSelector((state) => state.authReducer);
  let shipping = 20;
  let getSubTotal = (itemsInCart: CartItem[]) => {
    let price = itemsInCart.map((item: CartItem) => item.price);
    if (price.length > 0) {
      return price.reduce((a: number, b: number) => a + b);
    } else {
      return 0;
    }
  };

  const [subTotal, setSubTotal] = useState(getSubTotal(itemsInCart));

  function subTotalCal(items: CartItem[]) {
    let newSubTotal = getSubTotal(items);
    setSubTotal(newSubTotal);
  }

  function handleDeleteBtn(index: string) {
    if (dataUser) {
      deleteCarts(dataUser.id, index)
        .then((res) => {
          subTotalCal(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  let total = subTotal + shipping;

  useEffect(() => {
    setToDashBoard(false);
  }, []);

  return (
    <>
      <AuthenticatedGuard routeRules={rules}>
        {itemsInCart.length > 0 ? (
          <div className="container mt-5 mb-5">
            <div className="row">
              <div className="col-12 col-md-8">
                <h2 className="mb-3">Bag</h2>
                <div className="bag-items">
                  <ItemsInCart
                    itemsInCart={itemsInCart}
                    handleDeleteBtn={handleDeleteBtn}
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
      </AuthenticatedGuard>
    </>
  );
}

export default memo(Cart);
