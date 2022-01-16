import { memo, useState } from "react";
import { Link } from "react-router-dom";

import style from "./ItemsInCart.module.scss"

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface Props {
  itemsInCart: any;
  handleDeleteBtn: (value: number) => void;
  handleEditBtn: (value: number) => void;
}


const ItemInCart: React.FC<Props> = ({
  itemsInCart,
  handleDeleteBtn,
  handleEditBtn,
}) => {

  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(itemsInCart)


  function remove(id: number|string) {
    setQuantity(quantity - 1)


  }


  function add(id: number|string) {
    // setQuantity(quantity + 1)

    let newArr = [...cartItems];
    let itemIndex = newArr.findIndex((item) => id == item.id);

    newArr[itemIndex].quantity = newArr[itemIndex].quantity + 1;
    setCartItems(newArr);
    // subTotalCal(newArr);
  }

  return cartItems.map((item: CartItem, index: number) => (
    <div className="bag-item mb-4 mt-4" key={index}>
      <div className="row">
        <div className="col-4 col-md-3 bag-item-img">
          <img src={item.color} alt="" />
        </div>
        <div className="col-8 col-md-5 d-flex flex-column justify-content-between">
          <div className="bag-item-info">
            <strong>{item.name}</strong>
            <p>Size: {item.size}</p>
          </div>

          <div className="bag-item-btn d-flex">
            {/* <p className="me-2" onClick={() => handleEditBtn(index)}>
              {edit === false ? "Edit" : "Save"}
            </p> */}
            <p onClick={() => handleDeleteBtn(index)} className="me-3">Delete</p>
          </div>
        </div>
        <div className="col-1 col-md-1"></div>
        <div className="col-12 col-md-3 bag-item-price d-flex flex-column justify-content-between">
          <p>{formatter.format(item.price * quantity)}</p>
          <div className="d-flex flex-row justify-content-end pb-3">
            <button
              className={`${style.remove}`}
              onClick={() => remove(item.idCart)}
            >-</button>

            <input type="text" className={`${style.quality}`} value={quantity} id={`${item.idCart}`} />

            <button
              className={`${style.add}`}
              onClick={() => add(item.idCart)}
            >+</button>
          </div>
        </div>

        {/* <div
          className={
            edit === false
              ? "edit-pop-up col-12 row"
              : "edit-pop-up active col-12"
          }
        >
          <div className="edit-pop-up-color col-4">
 
          </div>
          <div className="edit-pop-up-size col-8"></div>
        </div> */}
      </div>
      <hr />
    </div>
  ));
};
export default memo(ItemInCart);
