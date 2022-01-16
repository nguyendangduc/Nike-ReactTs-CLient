import { Link } from "react-router-dom";

interface UpdateMessageProps {
  updateMessage: boolean;
  setUpdateMessage: (value: boolean) => void;
}

export const UpdateMessage =  (props: UpdateMessageProps)=>{
    const {updateMessage, setUpdateMessage} = props;
    return (
        <div
      className={
        updateMessage === false
          ? "add-cart-messeage text-center"
          : "add-cart-messeage text-center active"
      }
    >
      <div className="add-cart-message-overlay"></div>
      <div className="add-cart-message-pop-up">
        <h4 className="mb-3">Checkout successfully!</h4>
        <div className="d-flex justify-content-center">
          <Link to="/profile">
            <button
              type="button"
              className="btn btn-dark me-5"
              onClick={() => {
                setUpdateMessage(false);
              }}
            >
              View Profile
            </button>
          </Link>

          <Link to="/products">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => {
                setUpdateMessage(false);
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