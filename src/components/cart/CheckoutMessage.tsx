import { Link } from "react-router-dom";

interface CheckoutMessageProps{
    checkoutMessage: boolean;
    setCheckoutMessage: (value: boolean) => void;
}

export const CheckoutMessage = (props: CheckoutMessageProps)=>{
    const {checkoutMessage, setCheckoutMessage} = props;
    return (
        <div
      className={
        checkoutMessage === false
          ? "add-cart-messeage text-center"
          : "add-cart-messeage text-center active"
      }
    >
      <div className="add-cart-message-overlay"></div>
      <div className="add-cart-message-pop-up">
        <h4 className="mb-3">Checkout successfully!</h4>
        <div className="d-flex justify-content-center">
          <Link to="/ordershistory">
            <button
              type="button"
              className="btn btn-dark me-5"
              onClick={() => {
                setCheckoutMessage(false);
              }}
            >
              View Orders History
            </button>
          </Link>

          <Link to="/products">
            <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                    setCheckoutMessage(false);
                }}
            >
                Continue shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
    )
}