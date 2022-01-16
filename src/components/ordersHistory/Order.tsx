import styles from "./Order.module.scss";

interface OrderProps {
  order: IOrder;
}

export const Order = (props: OrderProps) => {
  const { order } = props;
  return (
    <div className="card my-3">
      <div className="d-flex flex-row align-items-center">
        <img src={order.urlImg} className={styles.img} alt="thumbnail" />
        <div className="card-body mx-3">
          <div className="card-title h-3">{order.productName}</div>
          <p className="card-text">Size: {order.size}</p>
        </div>
        <div className="px-5">
          <p className="m-0"><b>Price:</b> ${order.price}</p>
        </div>
      </div>
      <hr className="my-0" />
      <div className="px-5">
        <p className="my-2">Customer Name: {order.name}</p>
        <p className="mb-2">Address: {order.address}</p>
        <p className="mb-2">Phone number: {order.phoneNumber}</p>
      </div>
    </div>
  );
};
