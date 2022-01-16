import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../services/store";

interface Props {
  addItemToCartMessage: boolean;
  setAddItemToCartMessage: (value: boolean) => void;
}

const AddCartMessage: React.FC<Props> = ({
  addItemToCartMessage,
  setAddItemToCartMessage,
}) => {
  const { dataUser } = useAppSelector((state) => state.authReducer);

  return dataUser ? (
    <div
      className={
        addItemToCartMessage === false
          ? "add-cart-messeage text-center"
          : "add-cart-messeage text-center active"
      }
    >
      <div className="add-cart-message-overlay"></div>
      <div className="add-cart-message-pop-up">
        <h4 className="mb-3">Add item to cart successfully!</h4>
        <div className="d-flex justify-content-center">
          <Link to="/cart">
            <button
              type="button"
              className="btn btn-dark me-5"
              onClick={() => {
                document.body.classList.remove("stopScrolling");
                setAddItemToCartMessage(false);
              }}
            >
              View Cart
            </button>
          </Link>

          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              document.body.classList.remove("stopScrolling");
              setAddItemToCartMessage(false);
            }}
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={
        addItemToCartMessage === false
          ? "add-cart-messeage text-center"
          : "add-cart-messeage text-center active"
      }
    >
      <div className="add-cart-message-overlay"></div>
      <div className="add-cart-message-pop-up">
        <h4 className="mb-3">You have to login</h4>
        <div className="d-flex justify-content-center">
          <Link to="/login">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                document.body.classList.remove("stopScrolling");
                setAddItemToCartMessage(false);
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default memo(AddCartMessage);
