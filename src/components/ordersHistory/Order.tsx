import styles from "./Order.module.css";

interface OrderProps {
  order: IOrder;
}

export const Order = (props: OrderProps) => {
  const { order } = props;
  return (
    <div className="card my-3">
      <div className="d-flex flex-row">
        <img src={order.urlImg} className={styles.img} alt="thumbnail" />
        <div className="card-body mx-3">
          <p className="card-title">{order.productName}</p>
          <p className="card-text">Size: {order.size}</p>
          <p className="card-text">Quantity: {order.quantity}</p>
        </div>
        <div className="px-5">
          <p className="m-0">Price: ${order.price}</p>
        </div>
      </div>
      <hr />
      <div className="px-5">
        <p className="mb-2">Customer Name: {order.name}</p>
        <p>Address: {order.address}</p>
        <p>Phone number: {order.phoneNumber}</p>
      </div>
    </div>
  );
};
