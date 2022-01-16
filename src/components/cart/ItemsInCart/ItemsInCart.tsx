import { memo } from "react";

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface Props {
  itemsInCart: any;
  handleDeleteBtn: (value: string) => void;
}

const ItemInCart: React.FC<Props> = ({ itemsInCart, handleDeleteBtn }) => {
  return itemsInCart.map((item: CartItem) => (
    <div className="bag-item mb-4 mt-4" key={item.id}>
      <div className="row">
        <div className="col-4 col-md-3 bag-item-img">
          <img src={item.urlImg} alt="" />
        </div>
        <div className="col-8 col-md-5 d-flex flex-column justify-content-between">
          <div className="bag-item-info">
            <strong>{item.productName}</strong>
            <p>Size: {item.size}</p>
          </div>

          <div className="bag-item-btn d-flex">
            <p onClick={() => handleDeleteBtn(item.id)}>Remove</p>
          </div>
        </div>
        <div className="col-1 col-md-1"></div>
        <div className="col-12 col-md-3 bag-item-price d-flex flex-column justify-content-between">
          <p>{formatter.format(item.price)}</p>
        </div>
      </div>
      <hr />
    </div>
  ));
};
export default memo(ItemInCart);
