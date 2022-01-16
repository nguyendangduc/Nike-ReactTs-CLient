import { memo } from "react";
import { Link } from "react-router-dom";

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface Props {
  subTotal: number;
  shipping: number;
  total: number;
}
const Summary: React.FC<Props> = ({ subTotal, shipping, total }) => {
  return (
    <>
      <h2 className="mb-3">Summary</h2>
      <div className="subtotal d-flex justify-content-between">
        <p>Subtotal</p>
        <p>{formatter.format(subTotal)}</p>
      </div>
      <div className="shipping d-flex justify-content-between">
        <p>Shipping</p>
        <p>{formatter.format(shipping)}</p>
      </div>
      <hr />
      <div className="total d-flex justify-content-between">
        <p>Total</p>
        <p>{formatter.format(total)}</p>
      </div>
      <Link to="/cart/checkout">
        <button type="button" className="btn btn-dark checkout-btn">
          Checkout
        </button>
      </Link>
    </>
  );
};
export default memo(Summary);
